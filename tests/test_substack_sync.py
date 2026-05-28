from __future__ import annotations

import json
from urllib.error import HTTPError

from src.common import merge_post_record
from src import substack_sync
from src.substack_sync import (
    _extract_post_body_html_from_page,
    _extract_post_record_from_page,
    _extract_recent_archive_api_posts,
    _parse_rss_feed,
    _parse_sitemap_urls,
    _prune_missing_substack_posts,
    sanitize_post_body_html,
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


def test_extract_post_body_html_from_page_reads_preload_body() -> None:
    post_payload = {
        "post": {
            "body_html": "<h2>Argument</h2><p>The full essay body is here.</p>",
        }
    }
    encoded = json.dumps(post_payload).replace("\\", "\\\\").replace('"', '\\"')
    html_text = f'<script>window._preloads = JSON.parse("{encoded}")</script>'

    assert _extract_post_body_html_from_page(html_text) == "<h2>Argument</h2><p>The full essay body is here.</p>"


def test_sanitize_post_body_html_removes_active_content_and_unsafe_links() -> None:
    raw_html = """
    <article>
      <h2 onclick="bad()">Heading</h2>
      <p>Keep <strong>this</strong> paragraph and <a href="https://example.com/path?x=1" data-track="1">safe link</a>.</p>
      <p><a href="javascript:alert(1)">unsafe link text</a></p>
      <figure><img src="https://images.example/post.jpg" alt="Microscope" width="800" onload="bad()" /><figcaption>Figure caption.</figcaption></figure>
      <script>alert("x")</script>
      <iframe src="https://example.com/embed">embedded text</iframe>
      <form><p>form text</p></form>
    </article>
    """

    sanitized = sanitize_post_body_html(raw_html)

    assert "<h2>Heading</h2>" in sanitized
    assert "<p>Keep <strong>this</strong> paragraph" in sanitized
    assert 'href="https://example.com/path?x=1"' in sanitized
    assert 'target="_blank"' in sanitized
    assert 'rel="noopener noreferrer"' in sanitized
    assert 'src="https://images.example/post.jpg"' in sanitized
    assert 'alt="Microscope"' in sanitized
    assert 'loading="lazy"' in sanitized
    assert "<figcaption>Figure caption.</figcaption>" in sanitized
    assert "javascript:" not in sanitized
    assert "<script" not in sanitized
    assert "<iframe" not in sanitized
    assert "<form" not in sanitized
    assert "embedded text" not in sanitized
    assert "form text" not in sanitized


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
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: {archive_record["canonical_url"]})
    monkeypatch.setattr(substack_sync, "_extract_post_record_from_page", lambda html_text, url: archive_record)

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "archive_api"
    assert report["archive_api_count"] == 1
    assert report["created_records"] == 1
    assert report["pruned_records"] == 0
    assert report["sitemap_prune_degraded"] is False
    assert report["degraded"] is False
    assert report["fallback_reason"] == ""
    assert "api-post" in saved_manifest


def test_incremental_sync_writes_report_next_to_external_manifest(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text("posts: []\n")

    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: [])
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: set())

    substack_sync.incremental_sync(manifest_path)
    report_path = tmp_path / "substack-sync-incremental.json"

    assert report_path.exists()
    assert json.loads(report_path.read_text())["total_manifest_records"] == 0


def test_sync_post_bodies_writes_sanitized_body_and_manifest_metadata(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    url = "https://theedgeofepidemiology.substack.com/p/body-post"
    manifest_path.write_text(
        """
posts:
  - substack_id: 99
    slug: body-post
    title: Body Post
    date: 2026-05-10
    canonical_url: https://theedgeofepidemiology.substack.com/p/body-post
    excerpt: Body excerpt.
    cover_image: ""
    upstream_tags: [History]
    source_mode: substack_page
    site_visibility: public
    status: summary_only
    indexing_strategy: noindex_stub
    topics: [History]
    related_atlases: []
    related_reference_slugs: []
    related_story_ids: []
    search_excerpt: Body excerpt.
    local_body_path: ""
    flashcards:
      - question: Bad legacy card
    flashcards_source: substack_body_html
"""
    )
    repeated = " ".join(["evidence"] * 120)
    post_payload = {
        "post": {
            "body_html": f'<h2>Body heading</h2><p>{repeated}</p><script>bad()</script>',
        }
    }
    encoded = json.dumps(post_payload).replace("\\", "\\\\").replace('"', '\\"')

    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: {url})
    monkeypatch.setattr(substack_sync, "fetch_text", lambda fetched_url, *args, **kwargs: f'<script>window._preloads = JSON.parse("{encoded}")</script>')

    report = substack_sync.sync_post_bodies(manifest_path)
    saved = manifest_path.read_text()
    body_path = tmp_path / "post_bodies" / "body-post.html"
    body_text = body_path.read_text()

    assert report["synced_records"] == 1
    assert body_path.exists()
    assert "<h2>Body heading</h2>" in body_text
    assert "<script" not in body_text
    assert "local_body_path: " in saved
    assert "body_synced_at: " in saved
    assert "body_source_url: " in saved
    assert "body_source_mode: substack_body_html" in saved
    assert "body_wordcount: 122" in saved
    assert "status: mirrored" in saved
    assert "indexing_strategy: mirrored" in saved
    assert "flashcards:" not in saved
    assert "flashcards_source:" not in saved


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
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: {sitemap_candidate["canonical_url"]})
    monkeypatch.setattr(substack_sync, "_extract_post_record_from_page", lambda html_text, url: enriched)

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "sitemap_fallback"
    assert report["sitemap_fallback_count"] == 1
    assert report["created_records"] == 1
    assert report["pruned_records"] == 0
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
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: {same_record["canonical_url"]})

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "archive_api"
    assert report["updated_records"] == 0
    assert report["pruned_records"] == 0
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
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: (_ for _ in ()).throw(HTTPError(substack_sync.SITEMAP_URL, 403, "Forbidden", hdrs=None, fp=None)))

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["candidate_source"] == "manifest_only"
    assert report["candidate_count"] == 0
    assert report["created_records"] == 0
    assert report["updated_records"] == 0
    assert report["pruned_records"] == 0
    assert report["sitemap_prune_degraded"] is True
    assert report["degraded"] is True
    assert "existing-post" in saved_manifest


def test_prune_missing_substack_posts_removes_only_absent_substack_urls() -> None:
    active_url = "https://theedgeofepidemiology.substack.com/p/active-post"
    removed_url = "https://theedgeofepidemiology.substack.com/p/removed-post"
    external_url = "https://example.com/p/keep-external"
    merged = {
        active_url: {"canonical_url": active_url, "slug": "active-post", "date": "2026-05-10"},
        removed_url: {"canonical_url": removed_url, "slug": "removed-post", "date": "2026-05-09"},
        external_url: {"canonical_url": external_url, "slug": "keep-external", "date": "2026-05-08"},
    }

    pruned = _prune_missing_substack_posts(merged, {active_url})

    assert [post["slug"] for post in pruned] == ["removed-post"]
    assert set(merged) == {active_url, external_url}


def test_incremental_sync_prunes_deleted_substack_posts_when_sitemap_is_available(tmp_path, monkeypatch) -> None:
    manifest_path = tmp_path / "posts.yml"
    manifest_path.write_text(
        """
posts:
  - canonical_url: https://theedgeofepidemiology.substack.com/p/active-post
    slug: active-post
    title: Active post
    date: 2026-05-10
    status: summary_only
  - canonical_url: https://theedgeofepidemiology.substack.com/p/removed-post
    slug: removed-post
    title: Removed post
    date: 2026-05-09
    status: summary_only
"""
    )
    active_record = {
        "substack_id": None,
        "slug": "active-post",
        "title": "Active post",
        "date": "2026-05-10",
        "canonical_url": "https://theedgeofepidemiology.substack.com/p/active-post",
        "excerpt": "",
        "cover_image": "",
        "upstream_tags": [],
        "source_mode": "substack_archive_api",
        "wordcount": None,
    }

    monkeypatch.setattr(substack_sync, "_recent_posts_from_archive_api", lambda: [active_record])
    monkeypatch.setattr(substack_sync, "_current_sitemap_post_urls", lambda: {active_record["canonical_url"]})

    report = substack_sync.incremental_sync(manifest_path)
    saved_manifest = manifest_path.read_text()

    assert report["pruned_records"] == 1
    assert report["pruned_slugs"] == ["removed-post"]
    assert "active-post" in saved_manifest
    assert "removed-post" not in saved_manifest
