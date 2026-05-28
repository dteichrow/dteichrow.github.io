from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
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
POST_BODIES_DIR = CONTENT_DIR / "post_bodies"
NOINDEX_POST_STRATEGIES = {"noindex", "noindex_stub_private", "private", "draft", "hidden"}
LEGACY_FLASHCARD_FIELDS = {
    "flashcards",
    "flashcards_generated_at",
    "flashcards_source",
    "flashcards_source_url",
}
ALLOWED_BODY_TAGS = {
    "a",
    "b",
    "blockquote",
    "br",
    "code",
    "em",
    "figcaption",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "sub",
    "sup",
    "ul",
}
VOID_BODY_TAGS = {"br", "hr", "img"}
DROP_BODY_CONTENT_TAGS = {
    "audio",
    "button",
    "canvas",
    "form",
    "iframe",
    "noscript",
    "object",
    "script",
    "style",
    "svg",
    "textarea",
    "video",
}
DROP_BODY_VOID_TAGS = {"embed", "input", "param"}
SAFE_URL_SCHEMES = {"http", "https", "mailto"}


class SubstackBodySanitizer(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.parts: list[str] = []
        self.open_tags: list[str] = []
        self.drop_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag in DROP_BODY_VOID_TAGS:
            return
        if tag in DROP_BODY_CONTENT_TAGS:
            self.drop_depth += 1
            return
        if self.drop_depth or tag not in ALLOWED_BODY_TAGS:
            return

        cleaned_attrs = self._clean_attrs(tag, attrs)
        attr_text = "".join(
            f' {name}="{html.escape(value, quote=True)}"'
            for name, value in cleaned_attrs
        )
        if tag in VOID_BODY_TAGS:
            self.parts.append(f"<{tag}{attr_text}>")
            return
        self.parts.append(f"<{tag}{attr_text}>")
        self.open_tags.append(tag)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in DROP_BODY_CONTENT_TAGS:
            if self.drop_depth:
                self.drop_depth -= 1
            return
        if self.drop_depth or tag not in ALLOWED_BODY_TAGS or tag in VOID_BODY_TAGS:
            return
        if tag in self.open_tags:
            while self.open_tags:
                open_tag = self.open_tags.pop()
                self.parts.append(f"</{open_tag}>")
                if open_tag == tag:
                    break

    def handle_data(self, data: str) -> None:
        if not self.drop_depth:
            self.parts.append(html.escape(data, quote=False))

    def handle_entityref(self, name: str) -> None:
        if not self.drop_depth:
            self.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if not self.drop_depth:
            self.parts.append(f"&#{name};")

    def close(self) -> None:
        super().close()
        while self.open_tags:
            self.parts.append(f"</{self.open_tags.pop()}>")

    def _clean_attrs(self, tag: str, attrs: list[tuple[str, str | None]]) -> list[tuple[str, str]]:
        indexed = {name.lower(): value for name, value in attrs if name and value}
        if tag == "a":
            href = indexed.get("href", "").strip()
            if not _is_safe_body_url(href):
                return []
            return [
                ("href", href),
                ("target", "_blank"),
                ("rel", "noopener noreferrer"),
            ]
        if tag == "img":
            src = indexed.get("src", "").strip()
            if not _is_safe_body_url(src):
                return []
            alt_text = clean_text(indexed.get("alt", ""))
            if alt_text.lower() == "undefined":
                alt_text = ""
            cleaned = [
                ("src", src),
                ("alt", alt_text),
                ("loading", "lazy"),
                ("decoding", "async"),
            ]
            for attr_name in ("width", "height"):
                attr_value = indexed.get(attr_name, "").strip()
                if re.fullmatch(r"\d{1,5}", attr_value):
                    cleaned.append((attr_name, attr_value))
            return cleaned
        return []


def _is_safe_body_url(value: str) -> bool:
    if not value:
        return False
    parsed = urlparse(value)
    if parsed.scheme and parsed.scheme.lower() not in SAFE_URL_SCHEMES:
        return False
    if not parsed.scheme and value.startswith("//"):
        return False
    return True


def sanitize_post_body_html(body_html: str) -> str:
    sanitizer = SubstackBodySanitizer()
    sanitizer.feed(body_html)
    sanitizer.close()
    sanitized = "".join(sanitizer.parts)
    sanitized = re.sub(r"\n{3,}", "\n\n", sanitized).strip()
    return sanitized


def _extract_post_body_html_from_page(html_text: str) -> str:
    payload = extract_preloads_payload(html_text)
    post = payload.get("post", {})
    body_html = post.get("body_html")
    if not isinstance(body_html, str) or not clean_text(body_html):
        raise ValueError("Could not find post.body_html in Substack preload payload")
    return body_html


def _extract_post_body_payload_from_page(html_text: str) -> tuple[str, int | None]:
    payload = extract_preloads_payload(html_text)
    post = payload.get("post", {})
    body_html = post.get("body_html")
    if not isinstance(body_html, str) or not clean_text(body_html):
        raise ValueError("Could not find post.body_html in Substack preload payload")
    expected_wordcount = post.get("wordcount")
    if isinstance(expected_wordcount, int):
        return body_html, expected_wordcount
    return body_html, None


def _body_wordcount(body_html: str) -> int:
    return len(re.findall(r"[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?", clean_text(body_html)))


def _strip_legacy_flashcard_fields(post: dict[str, Any]) -> dict[str, Any]:
    cleaned = dict(post)
    for field in LEGACY_FLASHCARD_FIELDS:
        cleaned.pop(field, None)
    return cleaned


def _post_is_public(post: dict[str, Any]) -> bool:
    visibility = str(post.get("site_visibility") or "").strip().lower()
    if visibility and visibility != "public":
        return False
    strategy = str(post.get("indexing_strategy") or "").strip().lower()
    if strategy == "noindex_stub":
        strategy = "summary_only"
    if strategy in NOINDEX_POST_STRATEGIES:
        return False
    return bool(post.get("canonical_url")) and _is_substack_post_url(str(post.get("canonical_url")))


def _body_dir_for_manifest(manifest_path: Path | None, body_dir: Path | None = None) -> Path:
    if body_dir is not None:
        return body_dir
    if manifest_path is None:
        return POST_BODIES_DIR
    resolved_manifest = manifest_path.resolve()
    try:
        resolved_manifest.relative_to(CONTENT_DIR)
    except ValueError:
        return manifest_path.parent / "post_bodies"
    return POST_BODIES_DIR


def _relative_body_path(path: Path) -> str:
    resolved_path = path.resolve()
    try:
        return resolved_path.relative_to(CONTENT_DIR.parent.resolve()).as_posix()
    except ValueError:
        return resolved_path.as_posix()


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


def _is_substack_post_url(url: str) -> bool:
    parsed = urlparse(url)
    base = urlparse(SUBSTACK_BASE)
    return parsed.netloc == base.netloc and parsed.path.startswith("/p/")


def _current_sitemap_post_urls() -> set[str]:
    sitemap_xml = fetch_text(
        SITEMAP_URL,
        headers={"Accept": "application/xml,text/xml;q=0.9,*/*;q=0.8"},
    )
    return set(_parse_sitemap_urls(sitemap_xml))


def _prune_missing_substack_posts(
    merged: dict[str, dict[str, Any]],
    current_urls: set[str],
) -> list[dict[str, Any]]:
    pruned: list[dict[str, Any]] = []
    for url in list(merged):
        if not _is_substack_post_url(url):
            continue
        if url in current_urls:
            continue
        pruned.append(merged.pop(url))
    return sort_posts(pruned)


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
    sitemap_urls = _current_sitemap_post_urls()

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

    pruned = _prune_missing_substack_posts(merged, sitemap_urls)
    final_posts = sort_posts([_strip_legacy_flashcard_fields(post) for post in merged.values()])
    save_posts_manifest(final_posts, manifest_path)
    report = {
        "mode": "backfill",
        "generated_at": now_iso(),
        "total_posts_discovered": discovered,
        "total_manifest_records": len(final_posts),
        "created_records": created,
        "updated_records": updated,
        "pruned_records": len(pruned),
        "pruned_slugs": [post.get("slug", "") for post in pruned],
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
    current_sitemap_urls: set[str] | None = None
    sitemap_prune_error = ""
    try:
        current_sitemap_urls = _current_sitemap_post_urls()
    except Exception as exc:  # noqa: BLE001
        sitemap_prune_error = str(exc)

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

    pruned: list[dict[str, Any]] = []
    if current_sitemap_urls is not None:
        pruned = _prune_missing_substack_posts(merged, current_sitemap_urls)

    final_posts = sort_posts([_strip_legacy_flashcard_fields(post) for post in merged.values()])
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
        "pruned_records": len(pruned),
        "pruned_slugs": [post.get("slug", "") for post in pruned],
        "enriched_from_post_pages": enriched,
        "degraded": source_mode in {"sitemap_fallback", "manifest_only"},
        "fallback_reason": fallback_reason or "",
        "sitemap_prune_degraded": current_sitemap_urls is None,
        "sitemap_prune_error": sitemap_prune_error,
        "enrichment_failures": failures,
    }
    _write_report("incremental", report, manifest_path)
    return report


def sync_post_bodies(manifest_path: Path | None = None, body_dir: Path | None = None) -> dict[str, Any]:
    posts = load_posts_manifest(manifest_path)
    current_sitemap_urls = _current_sitemap_post_urls()
    target_body_dir = _body_dir_for_manifest(manifest_path, body_dir)
    ensure_dir(target_body_dir)

    synced = 0
    skipped = 0
    kept_local = 0
    failures: list[dict[str, str]] = []
    synced_slugs: list[str] = []
    synced_at = now_iso()
    updated_posts: list[dict[str, Any]] = []

    for post in posts:
        record = _strip_legacy_flashcard_fields(post)
        url = str(record.get("canonical_url") or "")
        if not _post_is_public(record) or url not in current_sitemap_urls:
            skipped += 1
            updated_posts.append(record)
            continue

        slug = str(record.get("slug") or slug_from_canonical(url))
        try:
            html_text = fetch_text(url)
            raw_body_html, expected_wordcount = _extract_post_body_payload_from_page(html_text)
            sanitized_body_html = sanitize_post_body_html(raw_body_html)
            wordcount = _body_wordcount(sanitized_body_html)
            if wordcount < 100:
                raise ValueError(f"Sanitized body is unexpectedly short: {wordcount} words")
            existing_wordcount = int(record.get("body_wordcount") or 0)
            appears_truncated = expected_wordcount is not None and wordcount < int(expected_wordcount * 0.7)
            if record.get("body_source_mode") == "local_source_file" and appears_truncated and existing_wordcount > int(wordcount * 1.1):
                kept_local += 1
                updated_posts.append(record)
                continue
            body_path = target_body_dir / f"{slug}.html"
            body_path.write_text(sanitized_body_html)
            record["local_body_path"] = _relative_body_path(body_path)
            record["body_synced_at"] = synced_at
            record["body_source_url"] = url
            record["body_source_mode"] = "substack_body_html"
            record.pop("body_source_file", None)
            record["body_wordcount"] = wordcount
            record["status"] = "mirrored"
            if record.get("indexing_strategy") in {"", "noindex_stub", "summary_only", None}:
                record["indexing_strategy"] = "mirrored"
            synced += 1
            synced_slugs.append(slug)
        except Exception as exc:  # noqa: BLE001
            failures.append({"url": url, "slug": slug, "error": str(exc)})
        updated_posts.append(record)

    final_posts = sort_posts(updated_posts)
    save_posts_manifest(final_posts, manifest_path)
    report = {
        "mode": "bodies",
        "generated_at": synced_at,
        "total_manifest_records": len(final_posts),
        "current_sitemap_posts": len(current_sitemap_urls),
        "body_dir": str(target_body_dir),
        "synced_records": synced,
        "skipped_records": skipped,
        "kept_local_records": kept_local,
        "failed_records": len(failures),
        "synced_slugs": synced_slugs,
        "failed_posts": failures,
    }
    _write_report("bodies", report, manifest_path)
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync Substack posts into the umbrella-site manifest.")
    parser.add_argument("--mode", choices=["backfill", "incremental", "bodies"], default="incremental")
    parser.add_argument("--manifest", type=Path, default=CONTENT_DIR / "posts.yml")
    parser.add_argument("--body-dir", type=Path, default=None)
    args = parser.parse_args()

    if args.mode == "backfill":
        report = backfill_posts(args.manifest)
    elif args.mode == "bodies":
        report = sync_post_bodies(args.manifest, args.body_dir)
    else:
        report = incremental_sync(args.manifest)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
