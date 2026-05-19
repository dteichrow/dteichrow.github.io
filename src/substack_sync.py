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
    fetch_json,
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
ARCHIVE_API_URL = f"{SUBSTACK_BASE}/api/v1/archive?sort=new"
RSS_URL = f"{SUBSTACK_BASE}/feed"


def _archive_post_to_record(post: dict[str, Any], *, source_mode: str) -> dict[str, Any] | None:
    canonical_url = post.get("canonical_url")
    if not canonical_url:
        return None
    return {
        "substack_id": post.get("id"),
        "slug": post.get("slug"),
        "title": post.get("title"),
        "date": parse_iso_date(post.get("post_date")),
        "canonical_url": canonical_url,
        "excerpt": clean_text(post.get("description") or post.get("truncated_body_text") or post.get("search_engine_description")),
        "cover_image": post.get("cover_image") or "",
        "upstream_tags": [tag.get("name") for tag in post.get("postTags", []) if isinstance(tag, dict) and tag.get("name")],
        "source_mode": source_mode,
        "wordcount": post.get("wordcount"),
    }


def _extract_recent_archive_posts(html_text: str) -> dict[str, dict[str, Any]]:
    payload = extract_preloads_payload(html_text)
    posts = payload.get("newPostsForArchive", {}).get("pub", [])
    indexed: dict[str, dict[str, Any]] = {}
    for post in posts:
        record = _archive_post_to_record(post, source_mode="substack_archive")
        if record is None:
            continue
        indexed[record["canonical_url"]] = record
    return indexed


def _extract_recent_archive_api_posts(payload: Any) -> dict[str, dict[str, Any]]:
    posts = payload if isinstance(payload, list) else payload.get("posts", [])
    indexed: dict[str, dict[str, Any]] = {}
    for post in posts:
        if not isinstance(post, dict):
            continue
        record = _archive_post_to_record(post, source_mode="substack_archive_api")
        if record is None:
            continue
        indexed[record["canonical_url"]] = record
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
    return [entry["url"] for entry in _parse_sitemap_entries(xml_text)]


def _parse_sitemap_entries(xml_text: str) -> list[dict[str, str]]:
    root = ET.fromstring(xml_text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    entries: list[dict[str, str]] = []
    for url_node in root.findall("sm:url", ns):
        loc = url_node.find("sm:loc", ns)
        lastmod = url_node.find("sm:lastmod", ns)
        url = (loc.text or "").strip() if loc is not None else ""
        if "/p/" in url:
            entries.append(
                {
                    "url": url,
                    "lastmod": parse_iso_date((lastmod.text or "").strip()) if lastmod is not None else "",
                }
            )
    return entries


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


def _report_dir_for_manifest(manifest_path: Path | None) -> Path:
    if manifest_path is None:
        return NOTES_DIR
    resolved_manifest = manifest_path.resolve()
    try:
        resolved_manifest.relative_to(CONTENT_DIR)
    except ValueError:
        return manifest_path.parent
    return NOTES_DIR


def _write_report(mode: str, report: dict[str, Any], manifest_path: Path | None = None) -> None:
    report_dir = _report_dir_for_manifest(manifest_path)
    ensure_dir(report_dir)
    write_json(report_dir / f"substack-sync-{mode}.json", report)


def _recent_posts_from_archive_api() -> list[dict[str, Any]]:
    archive_payload = fetch_json(
        ARCHIVE_API_URL,
        headers={"Accept": "application/json,text/plain,*/*"},
    )
    recent_posts = _extract_recent_archive_api_posts(archive_payload)
    return list(recent_posts.values())


def _recent_posts_from_archive() -> list[dict[str, Any]]:
    archive_html = fetch_text(ARCHIVE_URL)
    recent_posts = _extract_recent_archive_posts(archive_html)
    return list(recent_posts.values())


def _recent_posts_from_sitemap(existing_posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    sitemap_xml = fetch_text(
        SITEMAP_URL,
        headers={"Accept": "application/xml,text/xml;q=0.9,*/*;q=0.8"},
    )
    sitemap_entries = _parse_sitemap_entries(sitemap_xml)
    existing_urls = {post.get("canonical_url") for post in existing_posts if post.get("canonical_url")}
    existing_slugs = {post.get("slug") for post in existing_posts if post.get("slug")}
    candidates: list[dict[str, Any]] = []
    for entry in sitemap_entries:
        url = entry["url"]
        slug = slug_from_canonical(url)
        if url in existing_urls or slug in existing_slugs:
            continue
        candidates.append(
            {
                "substack_id": None,
                "slug": slug,
                "title": "",
                "date": entry.get("lastmod", ""),
                "canonical_url": url,
                "excerpt": "",
                "cover_image": "",
                "upstream_tags": [],
                "source_mode": "substack_sitemap",
                "wordcount": None,
            }
        )
    return candidates


def _load_incremental_candidates(existing_posts: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], str, str | None]:
    errors: list[str] = []
    try:
        return _recent_posts_from_archive_api(), "archive_api", None
    except Exception as archive_api_exc:  # noqa: BLE001
        errors.append(f"archive_api={archive_api_exc}")
    try:
        rss_xml = fetch_text(
            RSS_URL,
            headers={"Accept": "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5"},
        )
        return _parse_rss_feed(rss_xml), "rss", None
    except Exception as rss_exc:  # noqa: BLE001
        errors.append(f"rss={rss_exc}")
        try:
            return _recent_posts_from_sitemap(existing_posts), "sitemap_fallback", "; ".join(errors)
        except Exception as sitemap_exc:  # noqa: BLE001
            errors.append(f"sitemap={sitemap_exc}")
            return [], "manifest_only", "; ".join(errors)


def _upstream_fields_changed(existing: dict[str, Any] | None, incoming: dict[str, Any]) -> bool:
    if existing is None:
        return True
    fields_to_compare = [
        "substack_id",
        "slug",
        "title",
        "date",
        "canonical_url",
        "excerpt",
        "cover_image",
        "source_mode",
        "wordcount",
    ]
    for field in fields_to_compare:
        if (existing.get(field) or "") != (incoming.get(field) or ""):
            return True
    return canonicalize_list(existing.get("upstream_tags")) != canonicalize_list(incoming.get("upstream_tags"))


def backfill_posts(manifest_path: Path | None = None) -> dict[str, Any]:
    posts = load_posts_manifest(manifest_path)
    recent_posts = {
        post["canonical_url"]: post
        for post in _recent_posts_from_archive_api()
        if post.get("canonical_url")
    }
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
    _write_report("backfill", report, manifest_path)
    return report


def incremental_sync(manifest_path: Path | None = None) -> dict[str, Any]:
    posts = load_posts_manifest(manifest_path)
    merged: dict[str, dict[str, Any]] = {
        post["canonical_url"]: post for post in posts if post.get("canonical_url")
    }
    feed_posts, source_mode, fallback_reason = _load_incremental_candidates(posts)

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
        elif not _upstream_fields_changed(existing, incoming):
            continue
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
        "archive_api_count": len(feed_posts) if source_mode == "archive_api" else 0,
        "rss_entry_count": len(feed_posts) if source_mode == "rss" else 0,
        "sitemap_fallback_count": len(feed_posts) if source_mode == "sitemap_fallback" else 0,
        "total_manifest_records": len(final_posts),
        "created_records": created,
        "updated_records": updated,
        "enriched_from_post_pages": enriched,
        "degraded": source_mode in {"sitemap_fallback", "manifest_only"},
        "fallback_reason": fallback_reason or "",
        "enrichment_failures": failures,
    }
    _write_report("incremental", report, manifest_path)
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
