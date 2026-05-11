from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any

from .common import (
    ASSETS_DIR,
    CONTENT_DIR,
    DEFAULT_BASE_URL,
    DOCS_DIR,
    PROJECT_ROOT,
    ensure_dir,
    format_display_date,
    link_for,
    load_atlas_registry,
    load_json,
    load_posts_manifest,
    normalize_base_url,
    temporary_directory,
    write_json,
)


DEFAULT_EPI_DOSSIER_REPO = "https://github.com/dteichrow/epi-dossier.git"
PATHOGEN_ATLAS_COLORS = {
    "yellow-fever": "#d86a4f",
    "cholera": "#5a9bd4",
    "measles": "#d6c06a",
    "mpox": "#dd6974",
    "avian-influenza-h5n1": "#9b7bd8",
    "hantavirus": "#7aa96b",
    "dengue": "#c9a84c",
    "malaria": "#5abf7c",
    "tuberculosis": "#d98e5f",
    "plague": "#b9754f",
}
PATHOGEN_STATUS_LABELS = {
    "consensus": "Consensus",
    "mixed": "Mixed / debated",
    "contested": "Contested",
    "weak": "Weakly supported",
}
PATHOGEN_WRITING_LABELS = {
    "direct": "Written here directly",
    "adjacent": "Adjacent writing",
    "not_yet_written": "No dedicated post yet",
}


def site_nav(active: str, base_url: str) -> str:
    links = [
        ("Home", ""),
        ("Newsdesk", "newsdesk/"),
        ("Atlases", "atlases/"),
        ("Essays", "essays/"),
        ("Historical", "historical/"),
        ("Reference", "reference/"),
        ("Methods", "methods/"),
        ("About", "about/"),
        ("Search", "search/"),
    ]
    nav_links = []
    for label, path in links:
        classes = ["site-nav-link"]
        attrs = ""
        if active == label.lower():
            classes.append("active")
            attrs = ' aria-current="page"'
        nav_links.append(
            f'<a class="{" ".join(classes)}" href="{html.escape(link_for(base_url, path))}"{attrs}>{html.escape(label)}</a>'
        )
    return (
        '<header class="site-header">'
        '<div class="site-header-inner">'
        '<div class="site-header-copy">'
        '<p class="kicker">The Edge of Epidemiology</p>'
        '<h1 class="site-brand"><a href="{home}"><span>The Edge of Epidemiology</span> <span class="site-brand-byline">by Devin Teichrow</span></a></h1>'
        '<p class="site-header-title">History-haunted epidemiology, live reporting, and atlas work in one place.</p>'
        "</div>"
        '<nav class="site-nav" aria-label="Primary navigation">{links}</nav>'
        "</div>"
        "</header>"
    ).format(home=html.escape(link_for(base_url, "")), links="".join(nav_links))


def base_html(
    *,
    title: str,
    description: str,
    active: str,
    body: str,
    base_url: str,
    extra_head: str = "",
    extra_body_end: str = "",
) -> str:
    css_href = html.escape(link_for(base_url, "assets/site.css"))
    js_href = html.escape(link_for(base_url, "assets/site.js"))
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)}</title>
    <meta name="description" content="{html.escape(description)}" />
    <link rel="stylesheet" href="{css_href}" />
    {extra_head}
  </head>
  <body>
      {site_nav(active, base_url)}
    <main class="page">
      {body}
    </main>
    <script src="{js_href}"></script>
    {extra_body_end}
  </body>
</html>
"""


def render_card(title: str, href: str, kicker: str, summary: str, meta: list[str] | None = None) -> str:
    badges = ""
    if meta:
        badges = '<div class="meta-row">' + "".join(f'<span class="badge">{html.escape(item)}</span>' for item in meta) + "</div>"
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
    coordinate_hint = " / ".join(keyword.upper() for keyword in entry.get("keywords", [])[:2]) or "CURATED ATLAS"
    status = entry.get("status_label", "Atlas")
    feature_line = entry.get("evidence_model", "")
    return (
        '<article class="site-card atlas-card">'
        '<div class="card-utility-row">'
        '<span class="card-utility-label">Atlas</span>'
        f'<span class="card-utility-meta">{html.escape(coordinate_hint)}</span>'
        "</div>"
        '<p class="kicker">Atlas family</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(entry.get("title", "Untitled atlas"))}</a></h3>'
        f'<p class="muted-note">{html.escape(entry.get("summary", ""))}</p>'
        f'{f"<p class=\"card-meta-text\">{html.escape(feature_line)}</p>" if feature_line else ""}'
        f'<div class="meta-row meta-row-plain"><span class="story-status-pill atlas-status-pill">{html.escape(status)}</span></div>'
        "</article>"
    )


def post_folio_meta(post: dict[str, Any]) -> tuple[str, str]:
    date_text = format_display_date(post.get("date"))
    category_text = ""
    if post.get("series"):
        category_text = str(post["series"][0])
    elif post.get("topics"):
        category_text = str(post["topics"][0])
    status_label = "Local stub" if post.get("status") != "mirrored" else "Mirrored"
    utility_meta = " · ".join(item for item in [category_text, status_label] if item)
    return date_text, utility_meta


def render_post_card(post: dict[str, Any], base_url: str, *, featured: bool = False) -> str:
    href = link_for(base_url, f"essays/{post.get('slug', '')}/")
    date_text, utility_meta = post_folio_meta(post)
    summary = post.get("dek") or post.get("excerpt") or "Published writing from The Edge of Epidemiology."
    feature_image = post.get("cover_image") or ""
    feature_class = " essay-card-featured" if featured and feature_image else ""
    image_class = " essay-card-has-media" if feature_image else ""
    media = (
        f'<a class="essay-card-media" href="{html.escape(href)}" aria-hidden="true" tabindex="-1">'
        f'<img src="{html.escape(feature_image)}" alt="" loading="lazy" decoding="async" />'
        "</a>"
        if feature_image
        else ""
    )
    return (
        f'<article class="site-card essay-card{feature_class}{image_class}">'
        f"{media}"
        '<div class="essay-card-copy">'
        '<div class="card-utility-row">'
        f'<span class="card-utility-label">{html.escape(date_text)}</span>'
        f'<span class="card-utility-meta">{html.escape(utility_meta)}</span>'
        "</div>"
        '<p class="kicker">Essay</p>'
        f'<h3><a href="{html.escape(href)}">{html.escape(post.get("title", "Untitled post"))}</a></h3>'
        f'<p class="muted-note">{html.escape(summary)}</p>'
        "</div>"
        "</article>"
    )


def render_story_card(story: dict[str, Any], base_url: str) -> str:
    href = link_for(base_url, story.get("story_web_path", ""))
    status = story.get("status", "monitoring")
    status_class = css_token(status)
    status_label = str(story.get("current_status_summary") or status).replace("_", " ").title()
    region_line = " / ".join(item for item in [story.get("primary_region", ""), story.get("country", "")] if item)
    updated_value = story.get("latest_updated_at") or story.get("updated_at") or story.get("latest_timestamp")
    utility_meta = f'Updated {format_display_date(updated_value)}' if updated_value else "Current file"
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
        f'{f"<p class=\"card-meta-text\">{html.escape(category_line)}</p>" if category_line else ""}'
        "</article>"
    )


def canonical_meta(values: list[str]) -> list[str]:
    return [value for value in values if value]


def render_home(posts: list[dict[str, Any]], atlases: list[dict[str, Any]], latest: dict[str, Any], base_url: str) -> str:
    stories = latest.get("stories", [])[:4]
    references = latest.get("reference", [])[:3]
    generated_at = format_display_date(latest.get("generated_at"))
    story_count = latest.get("story_count") or len(latest.get("stories", []))
    item_count = latest.get("item_count") or 0
    live_count = (latest.get("freshness_summary") or {}).get("live", 0)
    hero = f"""
      <section class="hero hero-home hero-open">
        <div class="hero-main">
          <p class="kicker">Devin Teichrow</p>
          <h2 class="hero-title">Disease travels with people and the things people build: ships, barracks, markets, wells, mosquitoes, rats, crowded rooms, and decisions made too late.</h2>
          <div class="hero-prose">
            <p class="subtitle">I&apos;m Devin Teichrow, a UCLA-trained epidemiologist and neuroscience researcher at UC Irvine working on migraine and Alzheimer&apos;s Disease and Related Dementias. My public-facing work focuses on how disease moves through populations, history, war, ecology, and infrastructure, including everything from modern outbreak reporting to historical epidemic reconstruction and interactive disease mapping.</p>
            <p class="subtitle">The Edge of Epidemiology is my home for longform essays, live outbreak coverage, disease atlases, methodological explainers, and projects exploring the intersection of epidemiology, geography, and history.</p>
          </div>
          <div class="hero-actions">
            <a class="button secondary" href="{html.escape(link_for(base_url, 'newsdesk/'))}">Open the newsdesk</a>
            <a class="button secondary" href="{html.escape(link_for(base_url, 'atlases/'))}">Browse the atlases</a>
            <a class="button secondary" href="{html.escape(link_for(base_url, 'essays/'))}">Read the essays</a>
          </div>
          <p class="hero-status-line"><span class="hero-status-label">Live desk</span> Updated {html.escape(generated_at)} · {html.escape(str(story_count))} active files · {html.escape(str(item_count))} tracked items · {html.escape(str(live_count))} live pulls</p>
        </div>
      </section>
    """
    newsdesk_cards = "".join(render_story_card(story, base_url) for story in stories)
    atlas_cards = "".join(render_atlas_card(atlas, base_url) for atlas in atlases[:4])
    post_cards = "".join(render_post_card(post, base_url, featured=index == 0) for index, post in enumerate(posts[:6]))
    ref_cards = "".join(render_reference_card(ref, base_url) for ref in references)
    return base_html(
        title="Edge of Epidemiology",
        description="The umbrella publication for The Pathogen Dispatch, pathogen atlases, historical epidemiology, and the Edge of Epidemiology writing archive.",
        active="home",
        base_url=base_url,
        body=hero
        + f'<section class="home-section newsdesk-panel"><div class="section-head section-head-split"><div><p class="kicker">Live desk</p><h2>The Pathogen Dispatch</h2><p class="muted-note">Current outbreak files, follow-up reporting, and source-first tracking for major infectious-disease stories.</p></div><aside class="section-sidecar"><p class="section-sidecar-label">Currently tracking</p><p>{html.escape(str(story_count))} active files · {html.escape(str(item_count))} source items · Updated {html.escape(generated_at)}</p></aside></div><div class="card-grid three-up">{newsdesk_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "newsdesk/"))}">Go to the full newsdesk</a></div></section>'
        + f'<section class="home-section atlas-panel"><div class="section-head"><p class="kicker">Atlas family</p><h2>Geography-first disease interactives</h2><p class="muted-note">Interactive atlas work on pathogen origins, spread routes, maritime disease ecology, and historical outbreak worlds.</p></div><div class="card-grid two-up">{atlas_cards}</div></section>'
        + f'<section class="home-section essay-panel"><div class="section-head"><p class="kicker">Published writing</p><h2>Recent essays</h2><p class="muted-note">Longer-form writing on outbreaks, evidence, history, ecology, and the politics of public health.</p></div><div class="card-grid three-up essays-grid">{post_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "essays/"))}">Browse all essays</a></div></section>'
        + f'<section class="home-section reference-panel"><div class="section-head"><p class="kicker">Field guides</p><h2>Reference layer</h2><p class="muted-note">Practical disease briefings on transmission, diagnostics, severity, and what matters when a pathogen reappears.</p></div><div class="card-grid three-up">{ref_cards}</div><div class="section-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "reference/"))}">Open the reference desk</a></div></section>',
    )


def render_essays_index(posts: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(
        render_post_card(post, base_url, featured=index % 6 == 0)
        for index, post in enumerate(posts)
    )
    return base_html(
        title="Essays | Edge of Epidemiology",
        description="Published work from The Edge of Epidemiology with automatic Substack ingestion and local stub pages.",
        active="essays",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Writing archive</p>
        <h2 class="hero-title">Published work from The Edge of Epidemiology</h2>
        <p class="subtitle">This library is seeded from the public Substack archive and refreshed from the live RSS feed. New posts show up here automatically as soon as they are detected.</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head">
          <p class="kicker">Archive</p>
          <h2>{len(posts)} essay page(s)</h2>
          <p class="muted-note">Entries default to local stub pages with canonical outbound links. Curated mirrors can replace the stub state later without breaking the public URL.</p>
        </div>
        <div class="card-grid three-up essays-grid">{cards}</div>
      </section>
    """,
    )


def render_post_page(post: dict[str, Any], atlases: dict[str, dict[str, Any]], base_url: str) -> str:
    related_atlas_links = []
    for atlas_id in post.get("related_atlases", []):
        entry = atlases.get(atlas_id)
        if not entry:
            continue
        related_atlas_links.append(
            f'<li><a href="{html.escape(link_for(base_url, entry.get("public_route", "")))}">{html.escape(entry.get("title", atlas_id))}</a></li>'
        )
    related_block = (
        '<div class="detail-block"><h3>Related atlases</h3><ul class="link-list">'
        + "".join(related_atlas_links)
        + "</ul></div>"
        if related_atlas_links
        else '<div class="detail-block"><h3>Related atlases</h3><p class="muted-note">No atlas links have been curated for this piece yet.</p></div>'
    )
    topics = "".join(f'<span class="badge">{html.escape(topic)}</span>' for topic in post.get("topics", []))
    read_url = post.get("canonical_url", "")
    status_label = "Mirrored locally" if post.get("status") == "mirrored" else "Local library stub"
    return base_html(
        title=f"{post.get('title', 'Essay')} | Edge of Epidemiology",
        description=post.get("excerpt") or post.get("dek") or "Published work from The Edge of Epidemiology.",
        active="essays",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Essay</p>
        <h2 class="hero-title">{html.escape(post.get('title', 'Untitled post'))}</h2>
        <p class="subtitle">{html.escape(post.get('dek') or post.get('excerpt') or 'Published writing from The Edge of Epidemiology.')}</p>
        <div class="meta-row">
          <span class="badge accent">{html.escape(status_label)}</span>
          <span class="badge">{html.escape(format_display_date(post.get('date')))}</span>
          {topics}
        </div>
        <div class="hero-actions">
          <a class="button primary" href="{html.escape(read_url)}">Read on Substack</a>
        </div>
      </section>
      <section class="panel detail-grid">
        <div class="detail-block">
          <h3>What this page is</h3>
          <p class="muted-note">This is the local public library entry for the essay. It exists immediately when a post is published so the site can surface it without waiting for a later mirroring pass.</p>
        </div>
        <div class="detail-block">
          <h3>Canonical source</h3>
          <p><a href="{html.escape(read_url)}">{html.escape(read_url)}</a></p>
        </div>
        <div class="detail-block">
          <h3>Excerpt</h3>
          <p>{html.escape(post.get('excerpt') or post.get('search_excerpt') or '')}</p>
        </div>
        {related_block}
      </section>
    """,
    )


def render_atlas_hub(atlases: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_atlas_card(entry, base_url) for entry in atlases)
    return base_html(
        title="Atlases | Edge of Epidemiology",
        description="Atlas projects from Edge of Epidemiology, including pathogen, maritime, Viking, and Revolutionary War disease mapping.",
        active="atlases",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Atlas family</p>
        <h2 class="hero-title">Pathogens, routes, and disease ecologies as public-facing map work</h2>
        <p class="subtitle">The atlas layer is distinct from the live desk. These are curated geography projects with explicit evidence framing and direct links back to your published writing.</p>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid two-up">{cards}</div>
      </section>
    """,
    )


def render_reference_index(references: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_reference_card(reference, base_url) for reference in references)
    return base_html(
        title="Reference | Edge of Epidemiology",
        description="Disease sheets and desk notes linked to the live newsdesk and atlas work.",
        active="reference",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Reference desk</p>
        <h2 class="hero-title">Disease sheets that stay close to reporting and atlas work</h2>
        <p class="subtitle">These guides are imported from the live desk and re-surfaced here so they are usable as part of one publication instead of an isolated utility layer.</p>
      </section>
      <section class="panel"><div class="card-grid three-up">{cards}</div></section>
    """,
    )


def render_stories_index(stories: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_story_card(story, base_url) for story in stories)
    return base_html(
        title="Stories | Edge of Epidemiology",
        description="Active outbreak files from The Pathogen Dispatch.",
        active="newsdesk",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Stories</p>
        <h2 class="hero-title">Tracked outbreak files</h2>
        <p class="subtitle">These are the current story files from the live newsdesk, linked into the umbrella site without losing their underlying reporting structure.</p>
      </section>
      <section class="panel"><div class="card-grid three-up">{cards}</div></section>
    """,
    )


def render_historical_page(posts: list[dict[str, Any]], atlases: list[dict[str, Any]], base_url: str) -> str:
    selected = [
        post for post in posts
        if "history" in [topic.lower() for topic in post.get("topics", [])]
        or any(atlas_id in {"revolutionary-war-atlas", "viking-health-atlas", "maritime-disease-atlas"} for atlas_id in post.get("related_atlases", []))
    ][:12]
    cards = "".join(render_post_card(post, base_url) for post in selected)
    atlas_cards = "".join(render_atlas_card(entry, base_url) for entry in atlases if entry.get("atlas_id") in {"maritime-disease-atlas", "revolutionary-war-atlas", "viking-health-atlas"})
    return base_html(
        title="Historical | Edge of Epidemiology",
        description="Historical epidemiology essays and atlas projects from Edge of Epidemiology.",
        active="historical",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Historical desk</p>
        <h2 class="hero-title">Disease, empire, war, routes, and historical epidemiology</h2>
        <p class="subtitle">This section pulls the history-facing writing and atlas work together so it can be browsed as a coherent body of work.</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head"><p class="kicker">Atlases</p><h2>Historical map projects</h2></div>
        <div class="card-grid three-up">{atlas_cards}</div>
      </section>
      <section class="panel panel-soft">
        <div class="section-head"><p class="kicker">Essays</p><h2>History-facing published work</h2></div>
        <div class="card-grid three-up">{cards}</div>
      </section>
    """,
    )


def render_methods_page(base_url: str) -> str:
    return base_html(
        title="Methods | Edge of Epidemiology",
        description="Methods and sourcing notes for the Edge of Epidemiology umbrella site.",
        active="methods",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Methods</p>
        <h2 class="hero-title">How this site updates and what each layer is for</h2>
        <p class="subtitle">The site is static, source-first, and split into separate product layers so live reporting, atlas argumentation, and essay publication do not collapse into one feed.</p>
      </section>
      <section class="panel prose">
        <h3>Publication sync</h3>
        <p>New essays are discovered from the public Substack RSS feed every 15 minutes. A full historical backfill is seeded from the public sitemap and archive surfaces, then each post gets a local stub page immediately.</p>
        <h3>Live desk import</h3>
        <p>The Pathogen Dispatch remains its own reporting engine, but its public outputs are imported into this umbrella site so the stories, reference sheets, and atlas layer live under one roof.</p>
        <h3>Atlas evidence policy</h3>
        <p>Atlas geometry and route claims are evidence-driven. Editorial visuals can be layered on later, but they are not treated as proof.</p>
      </section>
    """,
    )


def render_about_page(base_url: str) -> str:
    return base_html(
        title="About | Edge of Epidemiology",
        description="About Edge of Epidemiology.",
        active="about",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open about-hero">
        <p class="kicker">About</p>
        <h2 class="hero-title">About Devin Teichrow and The Edge of Epidemiology</h2>
        <p class="subtitle">A public-facing epidemiology project built around outbreak reporting, disease geography, historical epidemiology, and science communication.</p>
      </section>
      <section class="about-layout">
        <div class="about-block">
          <p class="kicker">Bio</p>
          <h3>Research and public work</h3>
          <p>I’m Devin Teichrow, an epidemiologist based at the University of California, Irvine, where I am an epidemiology specialist in the lab of Dr. Ali Ezzati. My public-facing work sits at the intersection of infectious disease, historical analysis, and public science communication.</p>
          <p>I received my training in epidemiology at UCLA and currently work in neurology research, where my projects have focused on cognition, migraine, aging, ecological momentary assessment, and digital health methods. Alongside my academic work, I’ve developed a growing interest in how disease moves through populations beyond the clinic or dataset: through war, migration, infrastructure, ecology, trade, and geography.</p>
          <p>That broader perspective is what led to my <a href="https://theedgeofepidemiology.substack.com">Substack, The Edge of Epidemiology</a>.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Project</p>
          <h3>What this site became</h3>
          <p>This site began as a place to write about historical epidemics and overlooked disease stories, but it has gradually expanded into something wider: a hybrid of outbreak reporting, historical epidemiology, disease atlases, methodological explainers, and longform essays about how pathogens shape societies over time.</p>
          <p>Much of modern disease reporting treats outbreaks as isolated events. I’m more interested in the long view of how epidemics recur, how institutions respond, how public fear evolves, and how the same epidemiologic patterns reappear across centuries under different names. I’m also interested in the biological, genetic, and societal changes that occur as a result of infectious disease epidemics.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Interests</p>
          <h3>Current areas of focus</h3>
          <ul class="link-list about-topic-list">
            <li>plague outbreaks during war</li>
            <li>vector-borne disease and climate</li>
            <li>misinformation and risk communication</li>
            <li>ancient infectious disease</li>
            <li>neuroscience and cognition</li>
            <li>outbreak surveillance and preparedness</li>
            <li>the hidden ecological consequences of conflict and migration</li>
          </ul>
        </div>
        <div class="about-block">
          <p class="kicker">Framing</p>
          <h3>Why geography matters here</h3>
          <p>The site’s atlas projects and interactive maps grew out of a belief that epidemiology is fundamentally geographic. Disease is biological, spatial, political, ecological, economic, cultural, and historical. Pathogens move along trade routes, through armies, across borders, inside housing systems, and within the infrastructure societies build for themselves.</p>
          <p>My goal is to make epidemiology feel legible, historically grounded, and intellectually honest for a broader audience without flattening uncertainty or complexity. Outside of research and writing, I build interactive disease atlases, public-facing epidemiology tools, and science communication projects focused on making complex public health topics more understandable and visually intuitive.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Links</p>
          <h3>Elsewhere</h3>
          <ul class="link-list about-links">
            <li><a href="https://theedgeofepidemiology.substack.com">The Edge of Epidemiology on Substack</a></li>
            <li><a href="{html.escape(link_for(base_url, "methods/"))}">Methods</a></li>
            <li><a href="{html.escape(link_for(base_url, "atlases/"))}">Atlas family</a></li>
            <li><a href="{html.escape(link_for(base_url, "newsdesk/"))}">The Pathogen Dispatch</a></li>
          </ul>
        </div>
      </section>
    """,
    )


def render_search_page(base_url: str) -> str:
    endpoint = link_for(base_url, "app_exports/search-index.json")
    return base_html(
        title="Search | Edge of Epidemiology",
        description="Search across essays, atlases, stories, and reference pages.",
        active="search",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Search</p>
        <h2 class="hero-title">Search the umbrella site</h2>
        <p class="subtitle">Essays, atlases, references, and live outbreak files share one static search index.</p>
      </section>
      <section class="panel">
        <div class="search-shell" data-search-source="{html.escape(endpoint)}">
          <div class="search-controls">
            <input class="filter-input" type="search" data-search-input placeholder="Search titles, tags, places, pathogens, or phrases" />
            <select class="filter-select" data-search-filter>
              <option value="all">All sections</option>
              <option value="Essay">Essays</option>
              <option value="Atlas">Atlases</option>
              <option value="Newsdesk">Newsdesk</option>
              <option value="Reference">Reference</option>
            </select>
          </div>
          <div class="card-grid three-up" data-search-results></div>
        </div>
      </section>
    """,
    )


def render_curated_atlas_page(entry: dict[str, Any], posts: list[dict[str, Any]], base_url: str) -> str:
    related = [
        post for post in posts
        if entry.get("atlas_id") in post.get("related_atlases", [])
    ][:8]
    related_cards = "".join(render_post_card(post, base_url) for post in related) or '<p class="muted-note">No linked essays are curated here yet.</p>'
    return base_html(
        title=f"{entry.get('title')} | Edge of Epidemiology",
        description=entry.get("summary", ""),
        active="atlases",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">{html.escape(entry.get('status_label', 'Atlas'))}</p>
        <h2 class="hero-title">{html.escape(entry.get('title', 'Atlas'))}</h2>
        <p class="subtitle">{html.escape(entry.get('summary', ''))}</p>
      </section>
      <section class="panel prose">
        <h3>Current state</h3>
        <p>{html.escape(entry.get('long_note', 'This section is being promoted into the umbrella site as a dedicated atlas surface.'))}</p>
        <h3>Evidence model</h3>
        <p>{html.escape(entry.get('evidence_model', 'Curated historical and epidemiologic sources.'))}</p>
      </section>
      <section class="panel">
        <div class="section-head"><p class="kicker">Related writing</p><h2>Connected essays</h2></div>
        <div class="card-grid three-up">{related_cards}</div>
      </section>
    """,
    )


def resolve_epidossier_docs() -> Path:
    env_path = Path(str(Path.cwd()))
    _ = env_path  # keep lint calm in static script environments
    local_candidate = PROJECT_ROOT.parent / "epi-dossier" / "docs"
    if local_candidate.exists():
        return local_candidate

    temp_root = temporary_directory("epi-dossier-import-")
    clone_dir = temp_root / "epi-dossier"
    subprocess.run(
        ["git", "clone", "--depth", "1", DEFAULT_EPI_DOSSIER_REPO, str(clone_dir)],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    docs_path = clone_dir / "docs"
    if not docs_path.exists():
        raise FileNotFoundError("Cloned epi-dossier repo did not contain docs/")
    return docs_path


def import_copy(src: Path, dest: Path) -> None:
    ensure_dir(dest.parent)
    shutil.copy2(src, dest)


def shell_wrapper_css(base_url: str) -> str:
    return f"""
<style id="eoe-shell-import-style">
  body {{ padding-top: 112px !important; }}
  .eoe-shell-nav {{
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 10000;
    background: linear-gradient(180deg, rgba(15, 20, 27, 0.98), rgba(21, 29, 39, 0.98));
    color: #efe6d6;
    border-bottom: 1px solid rgba(214, 202, 183, 0.2);
    box-shadow: 0 14px 34px rgba(4, 7, 10, 0.28);
  }}
  .eoe-shell-nav-inner {{
    max-width: 1160px;
    margin: 0 auto;
    padding: 18px 18px 16px;
    display: grid;
    gap: 12px;
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .eoe-shell-brand {{
    display: inline-flex;
    flex-wrap: wrap;
    column-gap: 0.32em;
    row-gap: 0.12em;
    align-items: baseline;
    color: #f5ecdd;
    font: 700 clamp(1.2rem, 2vw, 1.65rem)/1.05 "Iowan Old Style", Georgia, serif;
    text-decoration: none;
    letter-spacing: 0;
  }}
  .eoe-shell-byline {{
    color: #8fb8d8;
    font: 600 0.48em/1 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .eoe-shell-brand:hover {{ text-decoration: none; }}
  .eoe-shell-links {{
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    padding-top: 10px;
    border-top: 1px solid rgba(214, 202, 183, 0.18);
  }}
  .eoe-shell-links a {{
    flex: 0 0 auto;
    padding: 0 0 6px;
    border-bottom: 2px solid transparent;
    color: rgba(239, 230, 214, 0.76);
    text-decoration: none;
    background: transparent;
    font-size: 0.95rem;
    font-weight: 500;
    white-space: nowrap;
    transition: color 180ms ease, border-color 180ms ease;
  }}
  .eoe-shell-links a.active {{
    border-color: rgba(201, 168, 76, 0.88);
    color: #f8f1e6;
    font-weight: 700;
  }}
  .eoe-shell-links a:hover {{
    color: #f8f1e6;
    text-decoration: none;
    border-color: rgba(201, 168, 76, 0.52);
  }}
  /* Cleaner fix would live in the Pathogen Dispatch renderer, but this import-layer pass
     keeps the simplification isolated to the umbrella site. */
  .site-header,
  .hero,
  .panel,
  .section-nav {{
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }}
  .site-header {{
    padding: 0 0 12px !important;
    gap: 12px !important;
  }}
  .site-header-title {{
    font-size: 1rem !important;
    color: #42515e !important;
  }}
  .site-nav,
  .section-nav-links {{
    gap: 14px !important;
  }}
  .site-nav-link,
  .section-nav-link {{
    padding: 0 0 5px !important;
    border: 0 !important;
    border-radius: 0 !important;
    border-bottom: 2px solid transparent !important;
    background: transparent !important;
    box-shadow: none !important;
    color: #42515e !important;
    font-weight: 500 !important;
  }}
  .site-nav-link:hover,
  .section-nav-link:hover {{
    background: transparent !important;
    color: #173046 !important;
    text-decoration: underline !important;
  }}
  .site-nav-link.active {{
    color: #173046 !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    border-color: rgba(141, 63, 47, 0.48) !important;
  }}
  .hero {{
    padding: 0 0 6px !important;
    overflow: visible !important;
  }}
  .hero::before,
  .hero::after,
  .panel::before,
  .panel::after,
  .site-header::before,
  .site-header::after {{
    display: none !important;
  }}
  .panel,
  .panel-grid {{
    gap: 16px !important;
  }}
  .panel > h2:first-child,
  .panel > .muted-note:first-child {{
    margin-top: 0 !important;
  }}
  .section-nav {{
    display: none !important;
  }}
  .meta-row-plain {{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }}
  .meta-inline,
  .card-meta-text {{
    color: #42515e;
    font: 500 0.86rem/1.55 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  .card-meta-text {{
    margin: 0;
  }}
  .atlas-status-pill,
  .story-status-pill {{
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
  }}
  .site-card .meta-row .badge {{
    max-width: none;
  }}
  .link-pill {{
    background: rgba(255,252,245,0.92) !important;
  }}
  @media (max-width: 760px) {{
    body {{ padding-top: 148px !important; }}
    .eoe-shell-links {{
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      width: 100%;
      padding-bottom: 2px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      touch-action: pan-x;
      overscroll-behavior-x: contain;
    }}
    .eoe-shell-links::-webkit-scrollbar {{ display: none; }}
  }}
</style>
"""


def imported_shell_nav(active: str, base_url: str) -> str:
    links = [
        ("Home", ""),
        ("Newsdesk", "newsdesk/"),
        ("Notebook", "notebook/"),
        ("Pathogen Atlas", "atlases/pathogen/"),
        ("Maritime Atlas", "atlases/maritime/"),
        ("Essays", "essays/"),
        ("Historical", "historical/"),
        ("Reference", "reference/"),
        ("Search", "search/"),
    ]
    link_html = []
    for label, path in links:
        cls = "active" if label.lower() == active.lower() else ""
        link_html.append(f'<a class="{cls}" href="{html.escape(link_for(base_url, path))}">{html.escape(label)}</a>')
    return (
        '<div class="eoe-shell-nav">'
        '<div class="eoe-shell-nav-inner">'
        f'<a class="eoe-shell-brand" href="{html.escape(link_for(base_url, ""))}"><span>The Edge of Epidemiology</span> <span class="eoe-shell-byline">by Devin Teichrow</span></a>'
        f'<nav class="eoe-shell-links" aria-label="Umbrella navigation">{"".join(link_html)}</nav>'
        "</div>"
        "</div>"
    )


def rewrite_imported_paths(html_text: str, base_url: str) -> str:
    replacements = {
        './index.html': link_for(base_url, "newsdesk/"),
        './notebook.html': link_for(base_url, "notebook/"),
        './atlas.html': link_for(base_url, "atlases/pathogen/"),
        './watch.html': link_for(base_url, "newsdesk/watch/"),
        './africa.html': link_for(base_url, "newsdesk/africa/"),
        './asia.html': link_for(base_url, "newsdesk/asia/"),
        './research.html': link_for(base_url, "newsdesk/research/"),
        './official.html': link_for(base_url, "newsdesk/official/"),
        './historical.html': link_for(base_url, "newsdesk/historical/"),
        './archive/index.html': link_for(base_url, "newsdesk/archive/"),
        './stories/': link_for(base_url, "stories/"),
        '../stories/': link_for(base_url, "stories/"),
        './reference/': link_for(base_url, "reference/"),
        '../reference/': link_for(base_url, "reference/"),
        './app_exports/': link_for(base_url, "app_exports/"),
        '../app_exports/': link_for(base_url, "app_exports/"),
        './2026/': link_for(base_url, "newsdesk/2026/"),
        '../2026/': link_for(base_url, "newsdesk/2026/"),
        './latest.html': link_for(base_url, "newsdesk/latest.html"),
        './latest.md': link_for(base_url, "newsdesk/latest.md"),
        '../latest.html': link_for(base_url, "newsdesk/latest.html"),
    }
    for needle, replacement in replacements.items():
        html_text = html_text.replace(f'href="{needle}', f'href="{replacement}')
        html_text = html_text.replace(f"href='{needle}", f"href='{replacement}")
        html_text = html_text.replace(f'src="{needle}', f'src="{replacement}')
        html_text = html_text.replace(f"src='{needle}", f"src='{replacement}")
        html_text = html_text.replace(f'fetch("{needle}', f'fetch("{replacement}')
        html_text = html_text.replace(f"fetch('{needle}", f"fetch('{replacement}")
    return html_text


ARTICLE_RE = re.compile(r'(<article class="site-card[^"]*">.*?</article>)', re.S)
META_ROW_RE = re.compile(r'<div class="meta-row">.*?</div>', re.S)
BADGE_TEXT_RE = re.compile(r'<span class="badge(?: [^"]+)?">(.*?)</span>', re.S)
LINK_PILL_RE = re.compile(r'<a class="link-pill"[^>]*>.*?</a>', re.S)

STATUS_TEXTS = {
    "active investigation",
    "expanding coverage",
    "quiet retained",
    "official followup",
    "official follow-up",
    "archival watch",
    "consensus",
    "mixed / debated",
    "contested",
    "weakly supported",
    "written here directly",
    "adjacent writing exists",
    "adjacent writing",
    "no dedicated post yet",
    "live atlas",
    "prototype atlas",
    "curated section",
    "metadata-only signal",
}
NOISE_TEXTS = {
    "live fetch",
    "wrapper only",
    "resolved article",
    "official agency",
    "general outlet",
    "metadata only",
    "open access",
    "login likely",
    "direct article",
}


def strip_html_tags(value: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", value)).strip()


def extract_badge_texts(fragment: str) -> list[str]:
    return [strip_html_tags(match) for match in BADGE_TEXT_RE.findall(fragment) if strip_html_tags(match)]


def looks_like_date(text: str) -> bool:
    return bool(re.search(r"\b\d{4}-\d{2}-\d{2}", text))


def is_count_text(text: str) -> bool:
    lowered = text.lower()
    return any(token in lowered for token in ("item(s)", "source(s)", "official", "route(s)", "citation(s)"))


def is_noise_text(text: str) -> bool:
    return text.lower() in NOISE_TEXTS


def status_text_for(texts: list[str]) -> str:
    for text in texts:
        if text.lower() in STATUS_TEXTS:
            return text
    return ""


def joined_meta(values: list[str]) -> str:
    return " · ".join(value for value in values if value)


def simplify_imported_article(article_html: str) -> str:
    rows = META_ROW_RE.findall(article_html)
    if not rows:
        return article_html

    badge_texts: list[str] = []
    link_rows: list[str] = []
    for row in rows:
        if "badge" in row:
            badge_texts.extend(extract_badge_texts(row))
        if "link-pill" in row:
            links = "".join(LINK_PILL_RE.findall(row))
            if links:
                link_rows.append(f'<div class="meta-row">{links}</div>')

    article_without_rows = META_ROW_RE.sub("", article_html)
    summary_parts: list[str] = []
    summary_html = ""

    if "atlas-teaser-card" in article_html:
        status = status_text_for(badge_texts)
        feature_text = joined_meta([text for text in badge_texts if is_count_text(text)])
        writing_state = next((text for text in badge_texts if "writing" in text.lower() or "dedicated post" in text.lower()), "")
        if status or feature_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill atlas-status-pill">{html.escape(status)}</span>'
            if feature_text:
                summary_html += f'<span class="meta-inline">{html.escape(feature_text)}</span>'
            summary_html += "</div>"
        if writing_state:
            summary_html += f'<p class="card-meta-text">{html.escape(writing_state)}</p>'
    elif "feature-card" in article_html:
        status = status_text_for(badge_texts)
        geography = joined_meta(
            [
                text for text in badge_texts
                if text and not is_count_text(text) and not looks_like_date(text) and text.lower() not in STATUS_TEXTS
            ]
        )
        if status or geography:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill">{html.escape(status)}</span>'
            if geography:
                summary_html += f'<span class="meta-inline">{html.escape(geography)}</span>'
            summary_html += "</div>"
    else:
        source = ""
        if "<strong>Source:</strong>" not in article_html:
            source = next(
                (
                    text for text in badge_texts
                    if text
                    and not looks_like_date(text)
                    and not is_noise_text(text)
                    and not text.lower().startswith("doi:")
                    and text.lower() not in STATUS_TEXTS
                ),
                "",
            )
        date_text = next((text for text in badge_texts if looks_like_date(text)), "")
        status = next(
            (
                text for text in badge_texts
                if text.lower() not in NOISE_TEXTS and text.lower() in STATUS_TEXTS and text.lower() != "official agency"
            ),
            "",
        )
        doi_text = next((text for text in badge_texts if text.lower().startswith("doi:")), "")
        meta_text = joined_meta([source, date_text])
        if status or meta_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill">{html.escape(status)}</span>'
            if meta_text:
                summary_html += f'<span class="meta-inline">{html.escape(meta_text)}</span>'
            summary_html += "</div>"
        if doi_text:
            summary_html += f'<p class="card-meta-text">{html.escape(doi_text)}</p>'

    if link_rows:
        summary_html += "".join(link_rows)

    return article_without_rows.replace("</article>", f"{summary_html}</article>")


def simplify_imported_cards(html_text: str) -> str:
    return ARTICLE_RE.sub(lambda match: simplify_imported_article(match.group(1)), html_text)


def remove_imported_section_nav(html_text: str) -> str:
    return re.sub(r'\s*<nav class="section-nav panel utility-panel".*?</nav>', "", html_text, flags=re.S)


def transform_imported_html(html_text: str, *, active: str, base_url: str) -> str:
    html_text = rewrite_imported_paths(html_text, base_url)
    html_text = remove_imported_section_nav(html_text)
    html_text = simplify_imported_cards(html_text)
    html_text = html_text.replace("</head>", f"{shell_wrapper_css(base_url)}</head>")
    html_text = html_text.replace("<body>", f"<body>{imported_shell_nav(active, base_url)}", 1)
    return html_text


def import_epidossier_public(docs_dir: Path, base_url: str) -> dict[str, Any]:
    source_docs = resolve_epidossier_docs()

    app_exports_src = source_docs / "app_exports"
    app_exports_dest = docs_dir / "app_exports"
    if app_exports_dest.exists():
        shutil.rmtree(app_exports_dest)
    shutil.copytree(app_exports_src, app_exports_dest)

    direct_copy = {
        source_docs / "latest.html": docs_dir / "newsdesk" / "latest.html",
        source_docs / "latest.md": docs_dir / "newsdesk" / "latest.md",
    }
    for src, dest in direct_copy.items():
        import_copy(src, dest)

    html_pages = [
        (source_docs / "index.html", docs_dir / "newsdesk" / "index.html", "newsdesk"),
        (source_docs / "watch.html", docs_dir / "newsdesk" / "watch" / "index.html", "newsdesk"),
        (source_docs / "africa.html", docs_dir / "newsdesk" / "africa" / "index.html", "newsdesk"),
        (source_docs / "asia.html", docs_dir / "newsdesk" / "asia" / "index.html", "newsdesk"),
        (source_docs / "research.html", docs_dir / "newsdesk" / "research" / "index.html", "newsdesk"),
        (source_docs / "official.html", docs_dir / "newsdesk" / "official" / "index.html", "newsdesk"),
        (source_docs / "historical.html", docs_dir / "newsdesk" / "historical" / "index.html", "newsdesk"),
        (source_docs / "archive" / "index.html", docs_dir / "newsdesk" / "archive" / "index.html", "newsdesk"),
        (source_docs / "notebook.html", docs_dir / "notebook" / "index.html", "notebook"),
    ]
    for src, dest, active in html_pages:
        transformed = transform_imported_html(src.read_text(), active=active, base_url=base_url)
        ensure_dir(dest.parent)
        dest.write_text(transformed)

    for source_subdir, dest_subdir, active in [
        ("stories", "stories", "newsdesk"),
        ("reference", "reference", "reference"),
    ]:
        for src in sorted((source_docs / source_subdir).glob("*.html")):
            transformed = transform_imported_html(src.read_text(), active=active, base_url=base_url)
            dest = docs_dir / dest_subdir / src.name
            ensure_dir(dest.parent)
            dest.write_text(transformed)

    dated_source_root = source_docs / "2026"
    if dated_source_root.exists():
        for src in dated_source_root.rglob("*.html"):
            rel = src.relative_to(source_docs)
            dest = docs_dir / "newsdesk" / rel
            transformed = transform_imported_html(src.read_text(), active="newsdesk", base_url=base_url)
            ensure_dir(dest.parent)
            dest.write_text(transformed)

    latest = load_json(source_docs / "app_exports" / "latest.json")
    return latest


ATLAS_OVERLAY_RE = re.compile(
    r'\s*<style id="eoe-atlas-overlay-style">.*?</style>|\s*<div id="eoe-atlas-overlay">.*?</div>',
    re.S,
)


def atlas_overlay_html(
    *,
    home_href: str,
    atlases_href: str,
    newsdesk_href: str,
    essays_href: str,
    top: str = "18px",
    links_top: str | None = None,
) -> tuple[str, str]:
    links_top = links_top or top
    overlay = f"""
<style id="eoe-atlas-overlay-style">
  #eoe-atlas-overlay {{
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
  }}
  #eoe-atlas-overlay a {{
    pointer-events: auto;
  }}
  #eoe-atlas-overlay-brand {{
    position: fixed;
    top: {top};
    left: 18px;
    display: inline-flex;
    flex-wrap: wrap;
    column-gap: 0.32em;
    row-gap: 0.12em;
    align-items: baseline;
    padding: 7px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(12, 12, 10, 0.86);
    color: #f5ecdd;
    text-decoration: none;
    font: 700 clamp(15px, 1.45vw, 20px)/1 "Iowan Old Style", Georgia, serif;
    backdrop-filter: blur(12px);
  }}
  #eoe-atlas-overlay-brand .byline {{
    color: #8fb8d8;
    font: 600 0.52em/1 "Avenir Next", "Helvetica Neue", sans-serif;
  }}
  #eoe-atlas-overlay-links {{
    position: fixed;
    top: {links_top};
    right: 18px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }}
  #eoe-atlas-overlay-links a {{
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(12, 12, 10, 0.85);
    color: #efe4d2;
    text-decoration: none;
    font: 700 12px/1 "Avenir Next", "Helvetica Neue", sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
  }}
  #eoe-atlas-overlay-links a.active {{ color: #c9a84c; border-color: rgba(201,168,76,0.38); }}
  @media (max-width: 980px) {{
    #eoe-atlas-overlay {{
      position: absolute;
      top: 14px;
      left: 18px;
      right: 18px;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: start;
      gap: 8px;
    }}
    #eoe-atlas-overlay-brand,
    #eoe-atlas-overlay-links {{
      position: static;
    }}
    #eoe-atlas-overlay-links {{
      justify-content: flex-start;
    }}
  }}
</style>
"""
    nav = (
        '<div id="eoe-atlas-overlay">'
        f'<a id="eoe-atlas-overlay-brand" href="{html.escape(home_href)}"><span>The Edge of Epidemiology</span> <span class="byline">by Devin Teichrow</span></a>'
        '<nav id="eoe-atlas-overlay-links" aria-label="Atlas navigation">'
        f'<a href="{html.escape(home_href)}">Home</a>'
        f'<a href="{html.escape(atlases_href)}" class="active">Atlases</a>'
        f'<a href="{html.escape(newsdesk_href)}">Newsdesk</a>'
        f'<a href="{html.escape(essays_href)}">Essays</a>'
        "</nav>"
        "</div>"
    )
    return overlay, nav


def inject_atlas_overlay(
    index_path: Path,
    *,
    home_href: str,
    atlases_href: str,
    newsdesk_href: str,
    essays_href: str,
    top: str = "18px",
    links_top: str | None = None,
) -> None:
    html_text = ATLAS_OVERLAY_RE.sub("", index_path.read_text())
    overlay, nav = atlas_overlay_html(
        home_href=home_href,
        atlases_href=atlases_href,
        newsdesk_href=newsdesk_href,
        essays_href=essays_href,
        top=top,
        links_top=links_top,
    )
    html_text = html_text.replace("</head>", f"{overlay}</head>")
    html_text = html_text.replace("<body>", f"<body>{nav}", 1)
    index_path.write_text(html_text)


def import_external_maritime(docs_dir: Path, base_url: str) -> None:
    src_root = PROJECT_ROOT / "external" / "maritime_disease_atlas"
    dest_root = docs_dir / "atlases" / "maritime"
    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)
    inject_atlas_overlay(
        dest_root / "index.html",
        home_href="../../index.html",
        atlases_href="../index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="84px",
    )


def prepared_pathogen_atlas_data(atlas_export: dict[str, Any], *, link_prefix: str) -> dict[str, Any]:
    raw_entries = atlas_export.get("atlas", [])
    prepared_entries = []

    def rewrite_entry_links(entry: dict[str, Any], color: str) -> dict[str, Any]:
        prepared = dict(entry)
        prepared["color"] = color
        prepared["status_label"] = PATHOGEN_STATUS_LABELS.get(prepared.get("status"), "Curated")
        prepared["writing_state_label"] = PATHOGEN_WRITING_LABELS.get(prepared.get("writing_state"), "Writing state pending")
        reference_path = prepared.get("reference_web_path") or prepared.get("reference_url")
        if reference_path:
            prepared["reference_href"] = f"{link_prefix}{reference_path.lstrip('/')}"
        related_stories = []
        for story in prepared.get("related_stories", []):
            story_copy = dict(story)
            story_path = story_copy.get("story_web_path")
            if story_path:
                story_copy["story_href"] = f"{link_prefix}{story_path.lstrip('/')}"
            related_stories.append(story_copy)
        prepared["related_stories"] = related_stories
        prepared["variants"] = [rewrite_entry_links(variant, color) for variant in prepared.get("variants", [])]
        return prepared

    for entry in raw_entries:
        color = PATHOGEN_ATLAS_COLORS.get(entry.get("slug"), "#c9a84c")
        prepared = rewrite_entry_links(entry, color)
        prepared_entries.append(prepared)

    return {
        "entries": prepared_entries,
        "generated_at": atlas_export.get("generated_at"),
        "atlas_count": len(prepared_entries),
    }


def write_pathogen_atlas_payload(target_root: Path, atlas_export: dict[str, Any], *, base_url: str, link_prefix: str) -> None:
    data_dir = target_root / "data"
    ensure_dir(data_dir)
    data_payload = prepared_pathogen_atlas_data(atlas_export, link_prefix=link_prefix)
    data_text = (
        f"window.PATHOGEN_ATLAS_BASE_URL = {json.dumps(base_url)};\n"
        f"window.PATHOGEN_ATLAS_DATA = {json.dumps(data_payload, indent=2)};\n"
    )
    (data_dir / "pathogen_atlas_data.js").write_text(data_text)


def import_external_pathogen(docs_dir: Path, base_url: str) -> None:
    src_root = PROJECT_ROOT / "external" / "pathogen_atlas"
    dest_root = docs_dir / "atlases" / "pathogen"
    atlas_export_path = docs_dir / "app_exports" / "atlas.json"
    atlas_export = load_json(atlas_export_path)

    write_pathogen_atlas_payload(src_root, atlas_export, base_url="/", link_prefix="../../docs/")
    inject_atlas_overlay(
        src_root / "index.html",
        home_href="../../docs/index.html",
        atlases_href="../../docs/atlases/index.html",
        newsdesk_href="../../docs/newsdesk/index.html",
        essays_href="../../docs/essays/index.html",
        top="52px",
        links_top="88px",
    )

    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)
    write_pathogen_atlas_payload(dest_root, atlas_export, base_url=base_url, link_prefix="../../")
    inject_atlas_overlay(
        dest_root / "index.html",
        home_href="../../index.html",
        atlases_href="../index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="52px",
        links_top="88px",
    )


def import_external_viking(docs_dir: Path, base_url: str) -> None:
    src = PROJECT_ROOT / "external" / "viking-health-map.html"
    dest = docs_dir / "atlases" / "viking" / "index.html"
    ensure_dir(dest.parent)
    dest.write_text(src.read_text())
    inject_atlas_overlay(
        dest,
        home_href="../../index.html",
        atlases_href="../index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="14px",
    )


def copy_static_assets(docs_dir: Path) -> None:
    target = docs_dir / "assets"
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(ASSETS_DIR, target)
    (docs_dir / ".nojekyll").write_text("")


def build_site(*, docs_dir: Path = DOCS_DIR, base_url: str = DEFAULT_BASE_URL) -> dict[str, Any]:
    base_url = normalize_base_url(base_url)
    if docs_dir.exists():
        shutil.rmtree(docs_dir)
    ensure_dir(docs_dir)

    copy_static_assets(docs_dir)
    latest = import_epidossier_public(docs_dir, base_url)
    import_external_pathogen(docs_dir, base_url)
    import_external_maritime(docs_dir, base_url)
    import_external_viking(docs_dir, base_url)

    posts = load_posts_manifest(CONTENT_DIR / "posts.yml")
    atlases = load_atlas_registry(CONTENT_DIR / "atlases.yml")
    atlas_by_id = {entry["atlas_id"]: entry for entry in atlases}
    references = latest.get("reference", [])
    stories = latest.get("stories", [])

    page_specs = {
        docs_dir / "index.html": render_home(posts, atlases, latest, base_url),
        docs_dir / "essays" / "index.html": render_essays_index(posts, base_url),
        docs_dir / "atlases" / "index.html": render_atlas_hub(atlases, base_url),
        docs_dir / "historical" / "index.html": render_historical_page(posts, atlases, base_url),
        docs_dir / "methods" / "index.html": render_methods_page(base_url),
        docs_dir / "about" / "index.html": render_about_page(base_url),
        docs_dir / "search" / "index.html": render_search_page(base_url),
        docs_dir / "reference" / "index.html": render_reference_index(references, base_url),
        docs_dir / "stories" / "index.html": render_stories_index(stories, base_url),
    }

    for path, page_html in page_specs.items():
        ensure_dir(path.parent)
        path.write_text(page_html)

    for post in posts:
        path = docs_dir / "essays" / post.get("slug", "untitled") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_post_page(post, atlas_by_id, base_url))

    for atlas_entry in atlases:
        if atlas_entry.get("atlas_id") == "pathogen-atlas":
            continue
        if atlas_entry.get("atlas_id") == "maritime-disease-atlas":
            continue
        if atlas_entry.get("atlas_id") == "viking-health-atlas":
            continue
        path = docs_dir / atlas_entry["public_route"].strip("/") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_curated_atlas_page(atlas_entry, posts, base_url))

    posts_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(posts),
        "posts": posts,
    }
    atlases_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(atlases),
        "atlases": atlases,
    }
    search_index = []
    for post in posts:
        search_index.append(
            {
                "title": post.get("title"),
                "section": "Essay",
                "summary": post.get("dek") or post.get("excerpt") or post.get("search_excerpt"),
                "url": link_for(base_url, f"essays/{post.get('slug')}/"),
                "keywords": " ".join(post.get("topics", []) + post.get("upstream_tags", [])),
            }
        )
    for atlas in atlases:
        search_index.append(
            {
                "title": atlas.get("title"),
                "section": "Atlas",
                "summary": atlas.get("summary"),
                "url": link_for(base_url, atlas.get("public_route", "")),
                "keywords": " ".join(atlas.get("keywords", [])),
            }
        )
    for story in stories:
        search_index.append(
            {
                "title": story.get("display_title"),
                "section": "Newsdesk",
                "summary": story.get("latest_update_summary") or story.get("why_it_matters"),
                "url": link_for(base_url, story.get("story_web_path", "")),
                "keywords": " ".join(story.get("claim_types", []) + [story.get("primary_region", ""), story.get("country", "")]),
            }
        )
    for reference in references:
        search_index.append(
            {
                "title": reference.get("name"),
                "section": "Reference",
                "summary": reference.get("why_reporters_care") or reference.get("atlas_summary"),
                "url": link_for(base_url, reference.get("reference_web_path", "")),
                "keywords": " ".join(reference.get("categories", []) + reference.get("aliases", [])),
            }
        )

    write_json(docs_dir / "app_exports" / "posts.json", posts_export)
    write_json(docs_dir / "app_exports" / "atlases.json", atlases_export)
    write_json(docs_dir / "app_exports" / "search-index.json", search_index)

    return {
        "generated_at": latest.get("generated_at"),
        "posts": len(posts),
        "atlases": len(atlases),
        "stories": len(stories),
        "references": len(references),
        "docs_dir": str(docs_dir),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the Edge of Epidemiology umbrella site.")
    parser.add_argument("--docs-dir", type=Path, default=DOCS_DIR)
    parser.add_argument("--site-base-url", default=DEFAULT_BASE_URL)
    args = parser.parse_args()
    result = build_site(docs_dir=args.docs_dir, base_url=args.site_base_url)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
