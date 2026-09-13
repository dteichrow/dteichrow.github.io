"""Exercise the sync-to-reading-page boundary for optional curated links."""

import pytest
from bs4 import BeautifulSoup

from src import substack_sync
from src.common import load_posts_manifest, merge_post_record, save_posts_manifest
from src.site_pages import render_post_page


def incoming_post(slug="new-essay"):
    return {
        "slug": slug,
        "title": "New essay",
        "date": "2026-09-13",
        "canonical_url": f"https://theedgeofepidemiology.substack.com/p/{slug}",
        "excerpt": "An essay about historical evidence.",
        "source_mode": "substack_rss",
        "upstream_tags": ["History"],
    }


@pytest.mark.parametrize("existing", [None, {}, {"related_posts": None}])
def test_synced_post_without_curated_links_is_renderable(existing):
    post = merge_post_record(existing, incoming_post())
    page = render_post_page(post, {}, [post], "/", "")
    assert post["related_posts"] == []
    assert "Read the full essay" in page


@pytest.mark.parametrize("value", [None, [], "adjacent", ["adjacent"]])
def test_manifest_round_trip_normalizes_links_and_preserves_selection(tmp_path, value):
    post = incoming_post()
    post["related_posts"] = value
    path = tmp_path / "posts.yml"
    save_posts_manifest([post], path)
    loaded = load_posts_manifest(path)[0]
    expected = ["adjacent"] if value else []
    assert loaded["related_posts"] == expected
    merged = merge_post_record(loaded, {**incoming_post(), "title": "Updated title"})
    assert merged["related_posts"] == expected
    adjacent = {**incoming_post("adjacent"), "title": "Adjacent essay", "topics": []}
    page = BeautifulSoup(
        render_post_page(merged, {}, [merged, adjacent], "/", ""), "html.parser"
    )
    assert bool(page.select_one('a[href="/essays/adjacent/"]')) == bool(expected)


@pytest.mark.parametrize("value", [None, [], "adjacent", ["adjacent"]])
def test_renderer_accepts_optional_links_without_a_manifest(value):
    post = {
        **incoming_post(),
        "related_posts": value,
        "related_atlases": None,
        "topics": None,
    }
    adjacent = {**incoming_post("adjacent"), "title": "Adjacent essay", "topics": None}
    page = BeautifulSoup(
        render_post_page(post, {}, [post, adjacent], "/", ""), "html.parser"
    )
    assert bool(page.select_one('a[href="/essays/adjacent/"]')) == bool(value)


def test_incremental_discovery_produces_renderable_new_essay(tmp_path, monkeypatch):
    manifest = tmp_path / "posts.yml"
    manifest.write_text("posts: []\n")
    incoming = incoming_post()
    monkeypatch.setattr(
        substack_sync,
        "_load_incremental_candidates",
        lambda posts: ([incoming], "rss", None),
    )
    monkeypatch.setattr(
        substack_sync, "_current_sitemap_post_urls", lambda: {incoming["canonical_url"]}
    )
    monkeypatch.setattr(
        substack_sync, "fetch_text", lambda *args, **kwargs: "<html></html>"
    )
    monkeypatch.setattr(
        substack_sync, "_extract_post_record_from_page", lambda *args: incoming
    )

    report = substack_sync.incremental_sync(manifest)
    posts = load_posts_manifest(manifest)
    page = render_post_page(posts[0], {}, posts, "/", "")

    assert report["created_records"] == 1
    assert report["publish_blocked"] is False
    assert "New essay" in page
    assert posts[0]["related_posts"] == []
