from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

from .common import (
    CONTENT_DIR,
    NOTES_DIR,
    canonicalize_list,
    clean_text,
    ensure_dir,
    extract_preloads_payload,
    fetch_text,
    load_posts_manifest,
    merge_post_record,
    meta_content,
    now_iso,
    parse_iso_date,
    save_posts_manifest,
    slug_from_canonical,
    sort_posts,
    write_json,
)


SUBSTACK_BASE = "https://theedgeofepidemiology.substack.com"
SITEMAP_URL = f"{SUBSTACK_BASE}/sitemap.xml"
ARCHIVE_URL = f"{SUBSTACK_BASE}/archive"
RSS_URL = f"{SUBSTACK_BASE}/feed"


def _extract_recent_archive_posts(html_text: str) -> dict[str, dict[str, Any]]:
    payload = extract_preloads_payload(html_text)
    posts = payload.get("newPostsForArchive", {}).get("pub", [])
    indexed: dict[str, dict[str, Any]] = {}
    for post in posts:
        canonical_url = post.get("canonical_url")
        if not canonical_url:
            continue
        indexed[canonical_url] = {
            "substack_id": post.get("id"),
            "slug": post.get("slug"),
            "title": post.get("title"),
            "date": parse_iso_date(post.get("post_date")),
            "canonical_url": canonical_url,
            "excerpt": clean_text(post.get("description") or post.get("truncated_body_text")),
            "cover_image": post.get("cover_image") or "",
            "upstream_tags": [tag.get("name") for tag in post.get("postTags", []) if tag.get("name")],
            "source_mode": "substack_archive",
            "wordcount": post.get("wordcount"),
        }
    return indexed


def _extract_post_record_from_page(html_text: str, url: str) -> dict[str, Any]:
    payload = extract_preloads_payload(html_text)
    post = payload.get("post", {})
    title = (
        post.get("title")
        or meta_content(html_text, "property", "og:title")
        or meta_content(html_text, "name", "twitter:title")
    )
    excerpt = clean_text(
        post.get("description")
        or post.get("truncated_body_text")
        or meta_content(html_text, "name", "description")
        or meta_content(html_text, "property", "og:description")
    )
    tags = [tag.get("name") for tag in post.get("postTags", []) if tag.get("name")]
    canonical_url = (
        post.get("canonical_url")
        or meta_content(html_text, "property", "og:url")
        or url
    )
    return {
        "substack_id": post.get("id"),
        "slug": post.get("slug") or slug_from_canonical(canonical_url),
        "title": title,
        "date": parse_iso_date(post.get("post_date")),
        "canonical_url": canonical_url,
        "excerpt": excerpt,
        "cover_image": post.get("cover_image")
        or meta_content(html_text, "property", "og:image")
        or meta_content(html_text, "name", "twitter:image"),
        "upstream_tags": tags,
        "source_mode": "substack_page",
        "wordcount": post.get("wordcount"),
    }


def _parse_sitemap_urls(xml_text: str) -> list[str]:
    root = ET.fromstring(xml_text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls: list[str] = []
    for loc in root.findall("sm:url/sm:loc", ns):
        url = (loc.text or "").strip()
        if "/p/" in url:
            urls.append(url)
    return urls


def _parse_rss_feed(xml_text: str) -> list[dict[str, Any]]:
    root = ET.fromstring(xml_text)
    items = []
    for item in root.findall("./channel/item"):
        title = item.findtext("title") or ""
        link = item.findtext("link") or ""
        description = clean_text(item.findtext("description"))
        pub_date = item.findtext("pubDate")
        enclosure = item.find("enclosure")
        image_url = enclosure.attrib.get("url") if enclosure is not None else ""
        date = ""
        if pub_date:
            try:
                date = parsedate_to_datetime(pub_date).date().isoformat()
            except (TypeError, ValueError):
                date = ""
        items.append(
            {
                "substack_id": None,
                "slug": slug_from_canonical(link),
                "title": clean_text(title),
                "date": date,
                "canonical_url": link,
                "excerpt": description,
                "cover_image": image_url,
                "upstream_tags": [],
                "source_mode": "substack_rss",
                "wordcount": None,
            }
        )
    return items


def _write_report(mode: str, report: dict[str, Any]) -> None:
    ensure_dir(NOTES_DIR)
    write_json(NOTES_DIR / f"substack-sync-{mode}.json", report)


def _recent_posts_from_archive() -> list[dict[str, Any]]:
    archive_html = fetch_text(ARCHIVE_URL)
    recent_posts = _extract_recent_archive_posts(archive_html)
    return list(recent_posts.values())


def _load_incremental_candidates() -> tuple[list[dict[str, Any]], str, str | None]:
    try:
        rss_xml = fetch_text(
            RSS_URL,
            headers={"Accept": "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5"},
        )
        return _parse_rss_feed(rss_xml), "rss", None
    except Exception as rss_exc:  # noqa: BLE001
        try:
            return _recent_posts_from_archive(), "archive_fallback", str(rss_exc)
        except Exception as archive_exc:  # noqa: BLE001
            return [], "manifest_only", f"rss={rss_exc}; archive={archive_exc}"


def backfill_posts(manifest_path: Path | None = None) -> dict[str, Any]:
    posts = load_posts_manifest(manifest_path)
    existing_by_url = {post.get("canonical_url"): post for post in posts if post.get("canonical_url")}

    archive_html = fetch_text(ARCHIVE_URL)
    recent_posts = _extract_recent_archive_posts(archive_html)
    sitemap_xml = fetch_text(SITEMAP_URL)
    sitemap_urls = _parse_sitemap_urls(sitemap_xml)

    discovered = 0
    created = 0
    updated = 0
    failures: list[dict[str, str]] = []
    merged: dict[str, dict[str, Any]] = {
        post["canonical_url"]: post for post in posts if post.get("canonical_url")
    }

    for url in sitemap_urls:
        discovered += 1
        incoming = recent_posts.get(url)
        try:
            if incoming is None:
                incoming = _extract_post_record_from_page(fetch_text(url), url)
            existing = merged.get(url)
            merged_record = merge_post_record(existing, incoming)
            merged[url] = merged_record
            if existing is None:
                created += 1
            else:
                updated += 1
        except Exception as exc:  # noqa: BLE001
            failures.append({"url": url, "error": str(exc)})

    final_posts = sort_posts(list(merged.values()))
    save_posts_manifest(final_posts, manifest_path)
    report = {
        "mode": "backfill",
        "generated_at": now_iso(),
        "total_posts_discovered": discovered,
        "total_manifest_records": len(final_posts),
        "created_records": created,
        "updated_records": updated,
        "archive_seed_count": len(recent_posts),
        "failed_posts": failures,
    }
    _write_report("backfill", report)
    return report


def incremental_sync(manifest_path: Path | None = None) -> dict[str, Any]:
    posts = load_posts_manifest(manifest_path)
    merged: dict[str, dict[str, Any]] = {
        post["canonical_url"]: post for post in posts if post.get("canonical_url")
    }
    feed_posts, source_mode, fallback_reason = _load_incremental_candidates()

    created = 0
    updated = 0
    enriched = 0
    failures: list[dict[str, str]] = []
    for incoming in feed_posts:
        url = incoming["canonical_url"]
        existing = merged.get(url)
        if existing is None:
            try:
                incoming = _extract_post_record_from_page(fetch_text(url), url)
                enriched += 1
            except Exception as exc:  # noqa: BLE001
                failures.append({"url": url, "error": str(exc)})
        merged_record = merge_post_record(existing, incoming)
        merged[url] = merged_record
        if existing is None:
            created += 1
        else:
            updated += 1

    final_posts = sort_posts(list(merged.values()))
    save_posts_manifest(final_posts, manifest_path)
    report = {
        "mode": "incremental",
        "generated_at": now_iso(),
        "candidate_source": source_mode,
        "candidate_count": len(feed_posts),
        "rss_entry_count": len(feed_posts) if source_mode == "rss" else 0,
        "archive_fallback_count": len(feed_posts) if source_mode == "archive_fallback" else 0,
        "total_manifest_records": len(final_posts),
        "created_records": created,
        "updated_records": updated,
        "enriched_from_post_pages": enriched,
        "degraded": source_mode != "rss",
        "fallback_reason": fallback_reason or "",
        "enrichment_failures": failures,
    }
    _write_report("incremental", report)
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync Substack posts into the umbrella-site manifest.")
    parser.add_argument("--mode", choices=["backfill", "incremental"], default="incremental")
    parser.add_argument("--manifest", type=Path, default=CONTENT_DIR / "posts.yml")
    args = parser.parse_args()

    if args.mode == "backfill":
        report = backfill_posts(args.manifest)
    else:
        report = incremental_sync(args.manifest)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
