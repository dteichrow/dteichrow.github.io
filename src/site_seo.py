"""Site seo."""

from __future__ import annotations
import datetime as dt
import html
import json
import re
from pathlib import Path
from typing import Any
from .common import format_display_date
from .site_config import (
    AUTHOR_SAME_AS,
    DEFAULT_SOCIAL_IMAGE,
    GENERIC_DESCRIPTIONS,
    PUBLIC_SITE_DOMAIN,
    PUBLIC_SITE_ORIGIN,
    RSS_FEED_URL,
    TOPIC_HUBS,
)
from .site_content import post_display_title, post_seo_description, post_should_index
from .common import strip_html_tags


def route_for_html_path(path: Path, docs_dir: Path) -> str:
    rel = path.relative_to(docs_dir).as_posix()
    if rel == "index.html":
        return ""
    if rel.endswith("/index.html"):
        return f"{rel[: -len('/index.html')]}/"
    return rel


def public_url_for_route(route: str) -> str:
    return (
        f"{PUBLIC_SITE_ORIGIN}/{route.lstrip('/')}"
        if route
        else f"{PUBLIC_SITE_ORIGIN}/"
    )


def extract_html_title(html_text: str) -> str:
    match = re.search(r"<title>(.*?)</title>", html_text, flags=re.I | re.S)
    return strip_html_tags(match.group(1)) if match else ""


def extract_meta_description_from_html(html_text: str) -> str:
    return meta_tag_content(html_text, "name", "description")


def meta_tag_content(html_text: str, attr: str, value: str) -> str:
    pattern = rf'<meta[^>]+{attr}=["\']{re.escape(value)}["\'][^>]+content=["\']([^"\']*)["\']'
    match = re.search(pattern, html_text, flags=re.I | re.S)
    return html.unescape(match.group(1)).strip() if match else ""


def extract_primary_heading(html_text: str) -> str:
    for tag in ("h1", "h2"):
        match = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", html_text, flags=re.I | re.S)
        if match:
            heading = strip_html_tags(match.group(1))
            if heading and heading.lower() not in {
                "the edge of epidemiology",
                "by devin teichrow",
            }:
                return heading
    return ""


def clean_seo_description(value: str, fallback: str) -> str:
    cleaned = re.sub(r"\s+", " ", strip_html_tags(value)).strip()
    if cleaned in GENERIC_DESCRIPTIONS or len(cleaned) < 70:
        cleaned = fallback
    return cleaned[:280].rstrip()


def title_case_slug(value: str) -> str:
    return value.replace("-", " ").replace("_", " ").title()


def post_route(post: dict[str, Any]) -> str:
    return f"essays/{post.get('slug', 'untitled')}/"


def route_is_collection(route: str) -> bool:
    if not route or route in {"about/", "methods/", "opportunities/", "search/"}:
        return False
    if route.endswith("/") and not re.match(r"essays/[^/]+/$", route):
        return True
    return False


def seo_profile_for_route(
    route: str, html_text: str, post_by_route: dict[str, dict[str, Any]]
) -> dict[str, Any]:
    title = extract_html_title(html_text)
    heading = extract_primary_heading(html_text)
    description = extract_meta_description_from_html(html_text)
    image = public_url_for_route(DEFAULT_SOCIAL_IMAGE)
    noindex = route in {"search/", "newsdesk/", "newsdesk/latest.html"}
    schema_type = "CollectionPage" if route_is_collection(route) else "WebPage"
    date_published = ""
    date_modified = ""
    source_url = ""

    if route == "":
        title = "The Edge of Epidemiology | Devin Teichrow"
        description = "The canonical home for Devin Teichrow's Edge of Epidemiology essays, Pathogen Dispatch reporting, disease atlases, historical epidemiology, and public-health methods work."
        schema_type = "WebSite"
    elif route in post_by_route:
        post = post_by_route[route]
        title = f"{post_display_title(post)} | Edge of Epidemiology"
        description = post_seo_description(post)
        image = post.get("cover_image") or image
        noindex = not post_should_index(post)
        schema_type = "Article" if not noindex else "WebPage"
        date_published = str(post.get("date") or "")
        date_modified = str(post.get("last_synced_at") or post.get("date") or "")
        source_url = str(post.get("canonical_url") or "")
    elif route == "essays/":
        title = "Epidemiology Essays | Edge of Epidemiology"
        description = "The Edge of Epidemiology essay archive: historical epidemiology, infectious disease, outbreak reporting, epidemiologic methods, wellness claims, and neuroepidemiology."
    elif route == "topics/":
        title = "Topic Hubs | Edge of Epidemiology"
        description = "Topic hubs for historical epidemiology, disease and war, disease ecology, pathogen geography, epidemiologic methods, wellness claims, and neuroepidemiology."
    elif route.startswith("topics/"):
        slug = route.strip("/").split("/", 1)[1]
        hub = next((item for item in TOPIC_HUBS if item["slug"] == slug), None)
        if hub:
            title = f"{hub['title']} Topic Hub | Edge of Epidemiology"
            description = str(hub["description"])
    elif route == "tools/":
        title = "Interactive Exhibits | Edge of Epidemiology"
        description = "Interactive timelines, atlases, and source-first public-health exhibits for epidemic history, disease geography, and epidemiologic reasoning."
        schema_type = "CollectionPage"
    elif route.startswith("tools/american-epidemic-timeline"):
        title = "American Epidemic Timeline | Edge of Epidemiology"
        description = "A cinematic, source-first timeline of major U.S.-linked epidemics and disease outbreaks from colonial North America through modern public health."
        schema_type = "CollectionPage"
    elif route.startswith("reference/") and route != "reference/":
        page_name = heading or title_case_slug(Path(route).stem)
        title = f"{page_name} Reference Guide | Edge of Epidemiology"
        description = f"{page_name} reference guide from The Pathogen Dispatch, with transmission notes, current story links, reporting context, and source caveats."
    elif route.startswith("stories/") and route != "stories/":
        page_name = heading or title_case_slug(Path(route).stem)
        title = f"{page_name} Story File | Edge of Epidemiology"
        description = f"Pathogen Dispatch story file for {page_name}, with source-first outbreak tracking, update context, and related reporting notes."
    elif route.startswith("newsdesk/") and re.search(
        r"\d{4}-\d{2}-\d{2}\.html$", route
    ):
        match = re.search(r"(\d{4}-\d{2}-\d{2})\.html$", route)
        date_label = format_display_date(match.group(1)) if match else "Archive"
        title = f"Pathogen Dispatch for {date_label} | Edge of Epidemiology"
        description = f"The Pathogen Dispatch archive for {date_label}, with source-first infectious-disease reporting, outbreak tracking, and daily evidence notes."
        schema_type = "CollectionPage"
    elif route.startswith("newsdesk/"):
        page_name = heading or "The Pathogen Dispatch"
        if route == "newsdesk/":
            title = "The Pathogen Dispatch | Edge of Epidemiology"
            description = "Source-first outbreak reporting from The Pathogen Dispatch, with active story files, official-source tracking, research signals, and historical epidemiology context."
        elif route == "newsdesk/archive/":
            title = "Pathogen Dispatch Archive | Edge of Epidemiology"
            description = "Archive of Pathogen Dispatch daily outbreak briefings and source-first infectious-disease reporting files."
        elif route == "newsdesk/latest.html":
            title = "Latest Pathogen Dispatch | Edge of Epidemiology"
            description = "The current Pathogen Dispatch briefing, with active outbreak files, source notes, and archive links."
        else:
            title = f"{page_name} | The Pathogen Dispatch"
            description = f"{page_name} from The Pathogen Dispatch, the Edge of Epidemiology source-first infectious-disease reporting desk."
        schema_type = "CollectionPage"
    elif route.startswith("atlases/pathogen"):
        title = "Pathogen Atlas | Edge of Epidemiology"
        description = "Source-backed digital exhibit on pathogen origins, reservoirs, transmission ecology, historical spread, and evidentiary uncertainty."
    elif route.startswith("atlases/maritime"):
        title = "Maritime Disease Atlas | Edge of Epidemiology"
        description = "Map-first digital exhibit on shipboard infection, port quarantine, sea routes, naval medicine, archival sources, and maritime disease ecology."
    elif route.startswith("atlases/viking"):
        title = "Viking Health Atlas | Edge of Epidemiology"
        description = "Interactive Viking health and disease atlas connecting settlement geography, archaeology, historical demography, and epidemic uncertainty."
    elif route.startswith("atlases/revolutionary-war"):
        title = "Revolutionary War Disease Atlas | Edge of Epidemiology"
        description = "Interactive Revolutionary War disease atlas mapping battles, encampments, smallpox pressure, disease deaths, and the military geography of the American Revolution."
    elif route == "reference/":
        title = "Disease Reference Desk | Edge of Epidemiology"
        description = "Disease reference sheets connected to the live newsdesk, pathogen atlas, reporting caveats, transmission notes, and official background links."
    elif route == "historical/":
        title = "Historical Epidemiology | Edge of Epidemiology"
        description = "Historical epidemiology essays and atlas projects about disease, empire, war, routes, ecological change, and epidemic reconstruction."
    elif route == "methods/":
        title = "Methods And Sourcing | Edge of Epidemiology"
        description = "Methods, sourcing, update cadence, and editorial structure for The Edge of Epidemiology, The Pathogen Dispatch, and related atlas work."
    elif route == "about/":
        title = "About Devin Teichrow | Edge of Epidemiology"
        description = "About Devin Teichrow and The Edge of Epidemiology: epidemiology, neurology research, historical disease writing, outbreak reporting, and science communication."
    elif route == "opportunities/":
        title = "Work With Devin Teichrow | Edge of Epidemiology"
        description = "Collaborate with Devin Teichrow on epidemiology, public-health data, historical disease writing, science communication, outbreak tools, and disease atlas projects."

    if not title:
        fallback_name = heading or title_case_slug(
            Path(route.rstrip("/") or "home").name
        )
        title = f"{fallback_name} | Edge of Epidemiology"
    fallback_description = f"{heading or title.split('|')[0].strip()} from The Edge of Epidemiology by Devin Teichrow."
    description = clean_seo_description(description, fallback_description)
    return {
        "route": route,
        "url": public_url_for_route(route),
        "title": title,
        "description": description,
        "image": image,
        "noindex": noindex,
        "schema_type": schema_type,
        "date_published": date_published,
        "date_modified": date_modified,
        "source_url": source_url,
    }


def ensure_head_element(html_text: str) -> str:
    if re.search(r"<head(?:\s[^>]*)?>", html_text, flags=re.I):
        return html_text
    if re.search(r"<html[^>]*>", html_text, flags=re.I):
        return re.sub(
            r"(<html[^>]*>)", r"\1<head></head>", html_text, count=1, flags=re.I
        )
    return (
        f'<!DOCTYPE html><html lang="en"><head></head><body>{html_text}</body></html>'
    )


def upsert_title(html_text: str, title: str) -> str:
    escaped = html.escape(title)
    if re.search(r"<title>.*?</title>", html_text, flags=re.I | re.S):
        return re.sub(
            r"<title>.*?</title>",
            f"<title>{escaped}</title>",
            html_text,
            count=1,
            flags=re.I | re.S,
        )
    return html_text.replace("</head>", f"<title>{escaped}</title>\n</head>", 1)


def remove_meta_name(html_text: str, name: str) -> str:
    return re.sub(
        rf'\s*<meta[^>]+name=["\']{re.escape(name)}["\'][^>]*>\n?',
        "\n",
        html_text,
        flags=re.I,
    )


def remove_meta_property(html_text: str, prop: str) -> str:
    return re.sub(
        rf'\s*<meta[^>]+property=["\']{re.escape(prop)}["\'][^>]*>\n?',
        "\n",
        html_text,
        flags=re.I,
    )


def render_json_ld(profile: dict[str, Any]) -> str:
    author: dict[str, Any] = {
        "@type": "Person",
        "name": "Devin Teichrow",
        "url": f"{PUBLIC_SITE_ORIGIN}/about/",
        "sameAs": AUTHOR_SAME_AS,
    }
    payload: dict[str, Any] = {
        "@context": "https://schema.org",
        "@type": profile["schema_type"],
        "name": profile["title"],
        "url": profile["url"],
        "description": profile["description"],
        "image": profile["image"],
        "isPartOf": {
            "@type": "WebSite",
            "name": "The Edge of Epidemiology",
            "url": f"{PUBLIC_SITE_ORIGIN}/",
        },
        "author": author,
    }
    if profile["schema_type"] == "WebSite":
        payload["potentialAction"] = {
            "@type": "SearchAction",
            "target": f"{PUBLIC_SITE_ORIGIN}/search/?q={{search_term_string}}",
            "query-input": "required name=search_term_string",
        }
        payload["publisher"] = author
    if profile["schema_type"] == "Article":
        payload["headline"] = profile["title"].split("|")[0].strip()
        payload["mainEntityOfPage"] = {"@type": "WebPage", "@id": profile["url"]}
        payload["publisher"] = author
        if profile.get("date_published"):
            payload["datePublished"] = profile["date_published"]
        if profile.get("date_modified"):
            payload["dateModified"] = profile["date_modified"]
        if profile.get("source_url"):
            payload["isBasedOn"] = profile["source_url"]
            payload["sameAs"] = [profile["source_url"]]
    return (
        '<script type="application/ld+json" data-eoe-seo>'
        + json.dumps(payload, ensure_ascii=False)
        + "</script>"
    )


def apply_seo_profile(html_text: str, profile: dict[str, Any]) -> str:
    html_text = ensure_head_element(html_text)
    html_text = upsert_title(html_text, profile["title"])
    html_text = remove_meta_name(html_text, "description")
    html_text = remove_meta_name(html_text, "robots")
    for name in (
        "twitter:card",
        "twitter:title",
        "twitter:description",
        "twitter:image",
    ):
        html_text = remove_meta_name(html_text, name)
    for prop in (
        "og:type",
        "og:site_name",
        "og:title",
        "og:description",
        "og:url",
        "og:image",
    ):
        html_text = remove_meta_property(html_text, prop)
    html_text = re.sub(
        r'\s*<link[^>]+rel=["\']canonical["\'][^>]*>\n?', "\n", html_text, flags=re.I
    )
    html_text = re.sub(
        r'\s*<link[^>]+rel=["\']alternate["\'][^>]+application/rss\+xml[^>]*>\n?',
        "\n",
        html_text,
        flags=re.I,
    )
    html_text = re.sub(
        r'\s*<script[^>]+type=["\']application/ld\+json["\'][^>]*data-eoe-seo[^>]*>.*?</script>\n?',
        "\n",
        html_text,
        flags=re.I | re.S,
    )

    robots = (
        '<meta name="robots" content="noindex,follow" />\n'
        if profile["noindex"]
        else ""
    )
    meta_block = f"""
    <link rel="canonical" href="{html.escape(profile["url"])}" />
    <link rel="alternate" type="application/rss+xml" title="The Edge of Epidemiology RSS" href="{html.escape(RSS_FEED_URL)}" />
    {robots}<meta name="description" content="{html.escape(profile["description"])}" />
    <meta property="og:type" content="{"article" if profile["schema_type"] == "Article" else "website"}" />
    <meta property="og:site_name" content="The Edge of Epidemiology" />
    <meta property="og:title" content="{html.escape(profile["title"])}" />
    <meta property="og:description" content="{html.escape(profile["description"])}" />
    <meta property="og:url" content="{html.escape(profile["url"])}" />
    <meta property="og:image" content="{html.escape(profile["image"])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{html.escape(profile["title"])}" />
    <meta name="twitter:description" content="{html.escape(profile["description"])}" />
    <meta name="twitter:image" content="{html.escape(profile["image"])}" />
    {render_json_ld(profile)}
"""
    return html_text.replace("</head>", f"{meta_block}</head>", 1)


def finalize_seo(docs_dir: Path, posts: list[dict[str, Any]]) -> dict[str, Any]:
    post_by_route = {post_route(post): post for post in posts}
    profiles: dict[str, dict[str, Any]] = {}
    for path in sorted(docs_dir.rglob("*.html")):
        route = route_for_html_path(path, docs_dir)
        html_text = path.read_text()
        profile = seo_profile_for_route(route, html_text, post_by_route)
        path.write_text(apply_seo_profile(html_text, profile))
        profiles[route] = profile
    sitemap_count = write_sitemap_and_robots(docs_dir, profiles)
    return {
        "html_pages": len(profiles),
        "indexable_pages": sitemap_count,
        "noindex_pages": sum(1 for profile in profiles.values() if profile["noindex"]),
    }


def write_sitemap_and_robots(
    docs_dir: Path, profiles: dict[str, dict[str, Any]]
) -> int:
    lastmod = dt.datetime.now(dt.timezone.utc).date().isoformat()
    indexable = [
        profile for _, profile in sorted(profiles.items()) if not profile["noindex"]
    ]
    url_entries = "\n".join(
        "  <url>\n"
        f"    <loc>{html.escape(profile['url'])}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        "  </url>"
        for profile in indexable
    )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{url_entries}\n"
        "</urlset>\n"
    )
    (docs_dir / "sitemap.xml").write_text(sitemap)
    (docs_dir / "robots.txt").write_text(
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /app_exports/\n"
        "Disallow: /search/\n"
        f"Sitemap: {PUBLIC_SITE_ORIGIN}/sitemap.xml\n"
    )
    (docs_dir / "CNAME").write_text(f"{PUBLIC_SITE_DOMAIN}\n")
    return len(indexable)
