from __future__ import annotations

import json
from urllib.error import HTTPError

from src.common import merge_post_record
from src import substack_sync
from src.substack_sync import (
    _extract_post_record_from_page,
    _extract_recent_archive_api_posts,
    _parse_rss_feed,
    _parse_sitemap_urls,
)


def test_parse_sitemap_urls_filters_to_post_urls() -> None:
    xml_text = """<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://theedgeofepidemiology.substack.com/archive</loc></url>
      <url><loc>https://theedgeofepidemiology.substack.com/p/a-real-post</loc></url>
      <url><loc>https://theedgeofepidemiology.substack.com/p/another-post</loc></url>
    </urlset>
    """
    assert _parse_sitemap_urls(xml_text) == [
        "https://theedgeofepidemiology.substack.com/p/a-real-post",
        "https://theedgeofepidemiology.substack.com/p/another-post",
    ]


def test_parse_rss_feed_extracts_recent_items() -> None:
    xml_text = """<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
      <channel>
        <item>
          <title><![CDATA[Test post]]></title>
          <description><![CDATA[A short excerpt.]]></description>
          <link>https://theedgeofepidemiology.substack.com/p/test-post</link>
          <pubDate>Mon, 04 May 2026 14:21:43 GMT</pubDate>
          <enclosure url="https://images.example/test.jpg" length="0" type="image/jpeg"/>
        </item>
      </channel>
    </rss>
    """
    records = _parse_rss_feed(xml_text)
    assert len(records) == 1
    assert records[0]["slug"] == "test-post"
    assert records[0]["date"] == "2026-05-04"
    assert records[0]["cover_image"] == "https://images.example/test.jpg"


def test_extract_recent_archive_api_posts_extracts_records() -> None:
    payload = [
        {
            "id": 456,
            "slug": "archive-post",
            "title": "Archive post",
            "post_date": "2026-05-10T08:00:00.000Z",
            "canonical_url": "https://theedgeofepidemiology.substack.com/p/archive-post",
            "description": "Archive excerpt",
            "cover_image": "https://images.example/archive.png",
            "postTags": [{"name": "History"}],
            "wordcount": 900,
        }
    ]
    records = _extract_recent_archive_api_posts(payload)
    assert list(records) == ["https://theedgeofepidemiology.substack.com/p/archive-post"]
    assert records["https://theedgeofepidemiology.substack.com/p/archive-post"]["source_mode"] == "substack_archive_api"
    assert records["https://theedgeofepidemiology.substack.com/p/archive-post"]["date"] == "2026-05-10"


def test_extract_post_record_from_page_reads_structured_payload() -> None:
    post_payload = {
        "post": {
            "id": 123,
            "slug": "test-post",
            "title": "Test post",
            "post_date": "2026-05-04T14:21:43.000Z",
            "canonical_url": "https://theedgeofepidemiology.substack.com/p/test-post",
            "cover_image": "https://images.example/cover.png",
            "description": "The deck text",
            "truncated_body_text": "Fallback excerpt",
            "wordcount": 1200,
            "postTags": [{"name": "History"}, {"name": "science"}],
        }
    }
    encoded = json.dumps(post_payload).replace("\\", "\\\\").replace('"', '\\"')
    html_text = f"""
    <html>
      <head>
        <meta property="og:title" content="Ignored" />
      </head>
      <body>
        <script>window._preloads = JSON.parse("{encoded}")</script>
      </body>
    </html>
    """
    record = _extract_post_record_from_page(
        html_text,
        "https://theedgeofepidemiology.substack.com/p/test-post",
    )
    assert record["substack_id"] == 123
    assert record["title"] == "Test post"
    assert record["date"] == "2026-05-04"
    assert record["upstream_tags"] == ["History", "science"]


def test_merge_post_record_preserves_curated_fields() -> None:
    existing = {
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/test-post",
        "slug": "test-post",
        "title": "Old title",
        "dek": "Custom deck",
        "topics": ["History"],
        "related_atlases": ["maritime-disease-atlas"],
        "status": "mirrored",
    }
    incoming = {
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/test-post",
        "slug": "test-post",
        "title": "New title",
        "excerpt": "Fresh excerpt",
        "source_mode": "substack_rss",
    }
    merged = merge_post_record(existing, incoming)
    assert merged["title"] == "New title"
    assert merged["dek"] == "Custom deck"
    assert merged["topics"] == ["History"]
    assert merged["related_atlases"] == ["maritime-disease-atlas"]
    assert merged["status"] == "mirrored"


def test_incremental_sync_uses_archive_api_without_degraded_mode(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text("posts: []\n")

    archive_record = {
        "substack_id": 101,
        "slug": "api-post",
        "title": "API post",
        "date": "2026-05-10",
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/api-post",
        "excerpt": "API excerpt",
        "cover_image": "",
        "upstream_tags": [],
        "source_mode": "substack_archive_api",
        "wordcount": 800,
    }

    def fake_fetch_text(url: str, *args, **kwargs) -> str:
        if url == archive_record["canonical_url"]:
            return "<html></html>"
        raise AssertionError(f"Unexpected fetch for {url}")

    monkeypatch.setattr(substack_sync, "fetch_text", fake_fetch_text)
    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: [archive_record])
    monkeypatch.setattr(substack_sync, "_extract_post_record_from_page", lambda html_text, url: archive_record)

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "archive_api"
    assert report["archive_api_count"] == 1
    assert report["created_records"] == 1
    assert report["degraded"] is False
    assert report["fallback_reason"] == ""
    assert "api-post" in saved_manifest


def test_incremental_sync_falls_back_to_sitemap_when_primary_sources_fail(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text("posts: []\n")

    sitemap_candidate = {
        "substack_id": None,
        "slug": "sitemap-post",
        "title": "",
        "date": "2026-05-10",
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/sitemap-post",
        "excerpt": "",
        "cover_image": "",
        "upstream_tags": [],
        "source_mode": "substack_sitemap",
        "wordcount": None,
    }
    enriched = dict(sitemap_candidate)
    enriched["title"] = "Sitemap post"

    def fake_fetch_text(url: str, *args, **kwargs) -> str:
        if url == substack_sync.RSS_URL:
            raise HTTPError(url, 403, "Forbidden", hdrs=None, fp=None)
        if url == sitemap_candidate["canonical_url"]:
            return "<html></html>"
        raise AssertionError(f"Unexpected fetch for {url}")

    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: (_ for _ in ()).throw(HTTPError(substack_sync.ARCHIVE_API_URL, 403, "Forbidden", hdrs=None, fp=None)))
    monkeypatch.setattr(substack_sync, "fetch_text", fake_fetch_text)
    monkeypatch.setattr(substack_sync, "_recent_posts_from_sitemap", lambda existing_posts: [sitemap_candidate])
    monkeypatch.setattr(substack_sync, "_extract_post_record_from_page", lambda html_text, url: enriched)

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "sitemap_fallback"
    assert report["sitemap_fallback_count"] == 1
    assert report["created_records"] == 1
    assert report["degraded"] is True
    assert "archive_api=" in report["fallback_reason"]
    assert "rss=" in report["fallback_reason"]
    assert "sitemap-post" in saved_manifest


def test_incremental_sync_skips_unchanged_records_without_manifest_churn(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text(
        """
posts:
  - canonical_url: https://theedgeofepidemiology.substack.com/p/existing-post
    slug: existing-post
    title: Existing post
    date: 2026-05-09
    excerpt: Existing excerpt
    source_mode: substack_archive_api
    last_synced_at: 2026-05-10T00:00:00+00:00
    status: summary_only
"""
    )

    same_record = {
        "substack_id": None,
        "slug": "existing-post",
        "title": "Existing post",
        "date": "2026-05-09",
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/existing-post",
        "excerpt": "Existing excerpt",
        "cover_image": "",
        "upstream_tags": [],
        "source_mode": "substack_archive_api",
        "wordcount": None,
    }

    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: [same_record])

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "archive_api"
    assert report["updated_records"] == 0
    assert "2026-05-10T00:00:00+00:00" in saved_manifest


def test_incremental_sync_preserves_manifest_when_all_upstreams_fail(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text(
        """
posts:
  - canonical_url: https://theedgeofepidemiology.substack.com/p/existing-post
    slug: existing-post
    title: Existing post
    date: 2026-05-09
    status: summary_only
"""
    )

    def fake_fetch_text(url: str, *args, **kwargs) -> str:
        raise HTTPError(url, 403, "Forbidden", hdrs=None, fp=None)

    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: (_ for _ in ()).throw(HTTPError(substack_sync.ARCHIVE_API_URL, 403, "Forbidden", hdrs=None, fp=None)))
    monkeypatch.setattr(substack_sync, "fetch_text", fake_fetch_text)
    monkeypatch.setattr(substack_sync, "_recent_posts_from_sitemap", lambda existing_posts: (_ for _ in ()).throw(HTTPError(substack_sync.SITEMAP_URL, 403, "Forbidden", hdrs=None, fp=None)))

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "manifest_only"
    assert report["candidate_count"] == 0
    assert report["created_records"] == 0
    assert report["updated_records"] == 0
    assert report["degraded"] is True
    assert "existing-post" in saved_manifest
