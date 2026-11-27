"""Site cards."""

from __future__ import annotations
import html
import re
from typing import Any
from .common import format_display_date, link_for
from .site_images import ESSAY_COVERS, ESSAY_ILLUSTRATIONS, essay_cover_tag, render_exhibit_image

from .site_content import (
    canonical_meta,
    post_display_title,
    post_folio_meta,
    post_seo_description,
)


def render_card(
    title: str, href: str, kicker: str, summary: str, meta: list[str] | None = None
) -> str:
    badges = ""
    if meta:
        badges = (
            '<div class="meta-row">'
            + "".join(
                f'<span class="badge">{html.escape(item)}</span>' for item in meta
            )
            + "</div>"
        )
    return (
        '<article class="site-card">'
        f'<p class="kicker">{html.escape(kicker)}</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(title)}</a></h3>'
        f'<p class="muted-note">{html.escape(summary)}</p>'
        f"{badges}"
        "</article>"
    )


def css_token(value: str | None, default: str = "unknown") -> str:
    if not value:
        return default
    token = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return token or default


def render_atlas_card(entry: dict[str, Any], base_url: str) -> str:
    route = entry.get("public_route", "")
    href = link_for(base_url, route)
    coordinate_hint = (
        " / ".join(keyword.upper() for keyword in entry.get("keywords", [])[:2])
        or "CURATED ATLAS"
    )
    status = entry.get("status_label", "Atlas")
    feature_line = entry.get("evidence_model", "")
    atlas_token = css_token(entry.get("atlas_id"), "atlas")
    return (
        f'<article class="site-card atlas-card atlas-card-{html.escape(atlas_token)}">'
        f"{render_exhibit_image(atlas_token, base_url, href)}"
        '<div class="card-utility-row">'
        '<span class="card-utility-label">Atlas</span>'
        f'<span class="card-utility-meta">{html.escape(coordinate_hint)}</span>'
        "</div>"
        '<p class="kicker">Atlas family</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(entry.get("title", "Untitled atlas"))}</a></h3>'
        f'<p class="muted-note">{html.escape(entry.get("summary", ""))}</p>'
        f"{f'<p class="card-meta-text">{html.escape(feature_line)}</p>' if feature_line else ''}"
        f'<div class="meta-row meta-row-plain"><span class="story-status-pill atlas-status-pill">{html.escape(status)}</span></div>'
        "</article>"
    )


def render_tool_card(entry: dict[str, Any], base_url: str) -> str:
    route = entry.get("public_route", "")
    href = link_for(base_url, route)
    tool_token = css_token(entry.get("tool_id") or entry.get("atlas_id"), "tool")
    return (
        f'<article class="site-card atlas-card tool-card tool-card-{html.escape(tool_token)}">'
        f"{render_exhibit_image(tool_token, base_url, href)}"
        f'<h3><a href="{html.escape(href)}">{html.escape(entry.get("title", "Untitled tool"))}</a></h3>'
        f'<p class="muted-note">{html.escape(entry.get("summary", ""))}</p>'
        "</article>"
    )


def render_post_card(
    post: dict[str, Any], base_url: str, *, featured: bool = False, eager: bool = False
) -> str:
    slug = post.get("slug", "")
    href = link_for(base_url, f"essays/{slug}/")
    date_text, utility_meta = post_folio_meta(post)
    summary = post_seo_description(post)
    if len(summary) > 240:
        preview = summary[:240].rsplit(" ", 1)[0]
        sentence = re.search(r"^(.+[.!?])\s", preview)
        summary = sentence.group(1) if sentence else preview.rstrip(" ,;:") + "…"
    illustration = ESSAY_ILLUSTRATIONS.get(slug)
    feature_image = (
        link_for(base_url, illustration["asset"])
        if illustration
        else post.get("cover_image") or ""
    )
    cover = ESSAY_COVERS.get(slug) if not illustration else None
    has_media = cover or feature_image
    feature_class = " essay-card-featured" if featured and has_media else ""
    image_class = " essay-card-has-media" if has_media else ""
    image_dimensions = ' width="1632" height="544"' if illustration else ""
    loading = "eager" if eager and illustration else "lazy"
    cover_tag = (
        essay_cover_tag(
            cover, base_url,
            sizes="(max-width: 760px) calc(100vw - 44px), " + ("62vw" if featured else "30vw"),
            eager=eager,
        )
        if cover
        else f'<img src="{html.escape(feature_image)}" alt="" loading="{loading}" decoding="async"{image_dimensions} />'
    )
    media = (
        f'<a class="essay-card-media" href="{html.escape(href)}" aria-hidden="true" tabindex="-1">'
        f"{cover_tag}"
        "</a>"
        if has_media
        else ""
    )
    illustration_class = " essay-card-illustrated" if illustration else ""
    illustration_credit = (
        f'<a class="essay-art-credit" href="{html.escape(link_for(base_url, "image-credits/#" + slug))}" '
        f'aria-label="AI illustration credit for {html.escape(post_display_title(post))}">AI illustration</a>'
        if illustration else ""
    )
    return (
        f'<article class="site-card essay-card{feature_class}{image_class}{illustration_class}">'
        f"{media}{illustration_credit}"
        '<div class="essay-card-copy">'
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(date_text)}</span>'
        f'<span class="card-utility-meta">{html.escape(utility_meta)}</span>'
        "</div>"
        f'<h3><a href="{html.escape(href)}">{html.escape(post_display_title(post))}</a></h3>'
        f'<p class="muted-note">{html.escape(summary)}</p>'
        "</div>"
        "</article>"
    )


def render_story_card(story: dict[str, Any], base_url: str) -> str:
    href = link_for(base_url, story.get("story_web_path", ""))
    status = story.get("status", "monitoring")
    status_class = css_token(status)
    status_label = (
        str(story.get("current_status_summary") or status).replace("_", " ").title()
    )
    region_line = " / ".join(
        item
        for item in [story.get("primary_region", ""), story.get("country", "")]
        if item
    )
    updated_value = (
        story.get("latest_updated_at")
        or story.get("updated_at")
        or story.get("latest_timestamp")
    )
    utility_meta = (
        f"Updated {format_display_date(updated_value)}"
        if updated_value
        else "Current file"
    )
    lead_source = story.get("lead_source") or ""
    utility_label = lead_source or "Pathogen Dispatch"
    footer = (
        f'<p class="card-meta-text">{html.escape(region_line)}</p>'
        if region_line
        else ""
    )
    return (
        f'<article class="site-card story-card status-{status_class}">'
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(utility_label)}</span>'
        f'<span class="card-utility-meta">{html.escape(utility_meta)}</span>'
        "</div>"
        f'<div class="story-status-line"><span class="story-status-pill">{html.escape(status_label)}</span></div>'
        f'<h3><a href="{html.escape(href)}">{html.escape(story.get("display_title", "Untitled story"))}</a></h3>'
        f'<p class="muted-note">{html.escape(story.get("latest_update_summary") or story.get("why_it_matters") or "")}</p>'
        f"{footer}"
        "</article>"
    )


def render_reference_card(reference: dict[str, Any], base_url: str) -> str:
    href = link_for(base_url, reference.get("reference_web_path", ""))
    taxonomic_line = " · ".join(
        canonical_meta([reference.get("pathogen"), reference.get("evidence_type")])
    )
    category_line = " · ".join(canonical_meta(reference.get("categories", [])[:2]))
    return (
        '<article class="site-card reference-card">'
        '<div class="card-utility-row">'
        '<span class="card-utility-label">Reference</span>'
        f'<span class="card-utility-meta">{html.escape(taxonomic_line or "Disease briefing")}</span>'
        "</div>"
        '<p class="kicker">Reference</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(reference.get("name", "Untitled reference"))}</a></h3>'
        f'<p class="muted-note">{html.escape(reference.get("why_reporters_care") or reference.get("atlas_summary") or "")}</p>'
        f"{f'<p class="card-meta-text">{html.escape(category_line)}</p>' if category_line else ''}"
        "</article>"
    )
