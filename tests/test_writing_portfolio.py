from __future__ import annotations

from src.build_site import live_newsdesk_redirect_html, render_archived_story_placeholder
from src.site_pages import render_home, render_writing_page
from src.site_seo import seo_profile_for_route


def test_writing_portfolio_links_published_work_and_labels_knock_la_as_scheduled():
    page = render_writing_page("/")

    assert "The Missing Evidence in the Case Against Food Stamps" in page
    assert "https://www.realclearscience.com/articles/2026/09/16/" in page
    assert "What did ordinary Norse people die from in the Viking Age?" in page
    assert "https://theageofexploration.com/slow-collapse-how-eurasian-diseases-devastated-the-americas/" in page
    assert "Knock LA" in page
    assert "Scheduled · September 29, 2026" in page
    assert "Forthcoming piece ↗" not in page


def test_homepage_has_a_direct_path_to_selected_writing():
    page = render_home([], [], {}, "/")

    assert 'href="/writing/"' in page
    assert "Writing beyond this site" in page
    assert "The Missing Evidence in the Case Against Food Stamps" in page


def test_linkedin_image_index_remains_noindex():
    profile = seo_profile_for_route(
        "assets/linkedin/recent-20/", "<title>LinkedIn Image Assets</title>", {}
    )

    assert profile["noindex"] is True


def test_archived_newsdesk_story_links_forward_to_the_archive():
    page = render_archived_story_placeholder("202605250134.html", "/")

    assert 'http-equiv="refresh" content="0; url=/newsdesk/archive/"' in page
    assert '<meta name="robots" content="noindex,follow" />' in page
    assert "Earlier Pathogen Dispatch coverage retained" not in page


def test_legacy_newsdesk_redirect_is_noindex_and_canonicalizes_to_its_target():
    page = live_newsdesk_redirect_html(
        title="Old Newsdesk route", target_url="/newsdesk/africa/"
    )
    profile = seo_profile_for_route("newsdesk/africa.html", page, {})

    assert profile["noindex"] is True
    assert profile["url"] == "https://devinteichrow.com/newsdesk/africa/"


def test_legacy_newsdesk_redirect_is_noindex_and_canonicalizes_to_its_target():
    page = live_newsdesk_redirect_html(
        title="Old Newsdesk route", target_url="/newsdesk/africa/"
    )
    profile = seo_profile_for_route("newsdesk/africa.html", page, {})

    assert profile["noindex"] is True
    assert profile["url"] == "https://devinteichrow.com/newsdesk/africa/"
