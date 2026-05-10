from __future__ import annotations

import json

from src.common import decode_substack_json_payload, merge_post_record
from src.substack_sync import _extract_post_record_from_page, _parse_rss_feed, _parse_sitemap_urls


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
