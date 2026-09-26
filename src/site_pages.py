"""Publication landing and reading pages; no build or filesystem side effects."""

import html
from .common import format_display_date, link_for, normalize_post_types
from .site_shell import base_html
from .site_images import render_exhibit_image
from .site_cards import render_post_card, render_tool_card, render_story_card
from .site_content import (
    post_display_title,
    post_seo_description,
    post_topic_cluster,
    topic_hub_title,
)


def render_home(posts, tools, latest, base_url):
    def href(route):
        return html.escape(link_for(base_url, route))

    featured = posts[0] if posts else None
    feature = render_post_card(featured, base_url, featured=True) if featured else ""
    recent = "".join(render_post_card(p, base_url) for p in posts[1:4])
    stories = "".join(
        render_story_card(p, base_url) for p in latest.get("stories", [])[:3]
    )
    featured_exhibit_ids = {
        "american-epidemic-timeline",
        "pathogen-atlas",
        "viking-health-atlas",
    }
    exhibits = "".join(
        render_tool_card(tool, base_url)
        for tool in tools
        if tool.get("tool_id") in featured_exhibit_ids
    )
    writing_cards = render_writing_cards(load_writing(), base_url, limit=3)
    return base_html(
        title="The Edge of Epidemiology | Devin Teichrow",
        description="Disease follows human arrangements. Essays, historical disease exhibits, and current reporting by epidemiologist Devin Teichrow.",
        active="home",
        base_url=base_url,
        body=f'''
    <section class="hero hero-home"><p class="kicker">History · Disease · Human arrangements</p>
    <h1 class="hero-title">Disease follows <br>human arrangements.</h1>
    <div class="hero-intro"><p>Ships and barracks. Markets and wells. The crowded room and the delayed decision. Disease moves through the worlds we build.</p><p>I’m Devin Teichrow, a UCLA-trained epidemiologist and science writer. I write about the evidence disease leaves behind—and the institutions that shape its course.</p></div></section>
    <section class="opening-work" aria-label="Featured work"><div class="featured-essay"><p class="kicker">The latest essay</p>{feature}</div>
    <article class="flagship-preview">{render_exhibit_image("maritime-disease-atlas", base_url, link_for(base_url, "atlases/maritime/"), eager=True)}<div><p class="kicker">Enter the exhibit</p><h2><a href="{href("atlases/maritime/")}">A ship is a disease environment.</a></h2><p>Look inside the Maritime Disease Atlas. Follow a route, open a case, or inspect the spaces where infection and deprivation meet.</p><a class="text-link" href="{href("atlases/maritime/")}">Explore the ship and its history <span aria-hidden="true">→</span></a></div></article></section>
    <section class="home-section"><div class="section-head section-head-split"><div><p class="kicker">Published writing</p><h2>Recent essays</h2></div><a class="text-link" href="{href("essays/")}">All essays →</a></div><div class="card-grid three-up essays-grid">{recent}</div></section>
    <section class="home-section"><div class="section-head section-head-split"><div><p class="kicker">Selected work</p><h2>Writing beyond this site</h2><p>Bylines on historical disease, public health evidence, and the lives shaped by both.</p></div><a class="text-link" href="{href("writing/")}">Full portfolio →</a></div><div class="card-grid three-up writing-grid">{writing_cards}</div></section>
    <section class="home-section newsdesk-panel"><div class="section-head section-head-split"><div><p class="kicker">Current reporting</p><h2>The Pathogen Dispatch</h2><p>Follow outbreak reporting back to the underlying sources.</p></div><a class="text-link" href="{href("newsdesk/")}">Open the Newsdesk →</a></div><div class="card-grid three-up">{stories}</div></section>
    <section class="home-section home-exhibits"><div class="section-head section-head-split"><div><p class="kicker">Selected exhibits</p><h2>History you can inspect.</h2><p>Explore a place, compare a record, and examine what the evidence supports.</p></div><a class="text-link" href="{href("tools/")}">All exhibits →</a></div><div class="card-grid three-up home-exhibit-grid">{exhibits}</div></section>
    <section class="commission-strip"><div><p class="kicker">Work with me</p><h2>Research into something people can use.</h2><p>Websites, evidence briefs, analysis, science writing, and interactive exhibits.</p></div><a class="button primary" href="{href("opportunities/")}">See projects and prices →</a></section>''',
    )


def load_writing():
    from .common import CONTENT_DIR, read_yaml

    records = read_yaml(CONTENT_DIR / "writing.yml", [])
    return records if isinstance(records, list) else []


def render_writing_cards(entries, base_url, limit=None):
    visible = entries[:limit] if limit is not None else entries
    cards = []
    for item in visible:
        title = html.escape(str(item.get("title", "")))
        publication = html.escape(str(item.get("publication", "")))
        description = html.escape(str(item.get("description", "")))
        status = html.escape(str(item.get("status", "Published")))
        url = item.get("url")
        link = (
            f'<a class="text-link" href="{html.escape(str(url), quote=True)}" '
            'target="_blank" rel="noopener noreferrer">Read at publisher ↗</a>'
            if url
            else '<span class="text-link writing-pending">Publication forthcoming</span>'
        )
        title_markup = (
            f'<a href="{html.escape(str(url), quote=True)}" target="_blank" '
            f'rel="noopener noreferrer">{title} ↗</a>'
            if url
            else title
        )
        cards.append(
            f'<article class="site-card writing-card"><div class="essay-card-copy">'
            f'<div class="card-utility-row"><span class="card-utility-label">{publication}</span>'
            f'<span class="card-utility-meta">{status}</span></div>'
            f'<h3>{title_markup}</h3><p>{description}</p>{link}</div></article>'
        )
    return "".join(cards)


def render_writing_page(base_url):
    from .site_services import inquiry_url, load_services

    entries = load_writing()
    services = load_services()
    return base_html(
        title="Selected Writing | Devin Teichrow",
        description="Selected essays and reporting by Devin Teichrow, published by The Viking Herald, The Age of Exploration, RealClearScience, and Knock LA.",
        active="writing",
        base_url=base_url,
        body=f'''<section class="hero"><p class="kicker">Writing portfolio</p><h1 class="hero-title">Selected work</h1><p class="subtitle">Reporting and essays on disease, evidence, history, and the structures that shape health.</p><p>For writing published on The Edge of Epidemiology, see the <a href="{html.escape(link_for(base_url, "essays/"))}">essay archive</a>. The links below take you to articles published by other outlets.</p></section><section class="home-section writing-portfolio"><div class="card-grid three-up writing-grid">{render_writing_cards(entries, base_url)}</div></section><section class="commission-strip role-contact"><div><p class="kicker">For hiring teams</p><h2>Looking for epidemiology, research, or science communication experience?</h2><p>My work spans epidemiologic research, evidence synthesis, data analysis, public writing, and digital health communication.</p></div><a class="button primary" href="{html.escape(inquiry_url("Staff or research position", services["contact"], subject_prefix="Role inquiry"))}">Discuss a role ↗</a></section>''',
    )


def render_post_page(post, atlases, posts, base_url, body_html):
    # Preview callers may provide raw records rather than a loaded manifest.
    post = normalize_post_types(post)
    posts = [normalize_post_types(p) for p in posts]
    title = post_display_title(post)
    description = post_seo_description(post)
    url = html.escape(post.get("canonical_url", ""))
    date = html.escape(format_display_date(post.get("date")))
    cluster = post_topic_cluster(post)
    curated = set(post.get("related_posts", []))
    related = [p for p in posts if p.get("slug") in curated]
    if not related:
        related = [
            p
            for p in posts
            if p.get("slug") != post.get("slug")
            and set(p.get("topics", [])) & set(post.get("topics", []))
        ][:3]
    links = "".join(
        f'<li><a href="{html.escape(link_for(base_url, a["public_route"]))}">{html.escape(a["title"])}</a></li>'
        for key in post.get("related_atlases", [])
        if (a := atlases.get(key))
    )
    cover = post.get("cover_image", "")
    media = (
        f'<figure class="reading-cover"><img src="{html.escape(cover)}" alt="" loading="lazy">'
        + (
            f"<figcaption>{html.escape(post['image_caption'])}</figcaption>"
            if post.get("image_caption")
            else ""
        )
        + "</figure>"
        if cover
        else ""
    )
    if body_html:
        read = f'<section id="read" class="essay-body-panel"><article class="prose essay-body">{body_html}</article><p class="substack-origin-note">Originally published on <a href="{url}">The Edge of Epidemiology on Substack</a>.</p></section>'
        action = '<a class="text-link" href="#read">Read the essay ↓</a>'
    else:
        read = f'<section id="read" class="external-reading"><p>The full essay is available on The Edge of Epidemiology on Substack.</p><a class="button primary" href="{url}">Read the full essay ↗</a></section>'
        action = ""
    related_cards = "".join(render_post_card(p, base_url) for p in related)
    related_html = (
        f'<section id="related-work" class="home-section"><h2>Follow the thread</h2><ul class="link-list">{links}</ul><div class="card-grid three-up">{related_cards}</div></section>'
        if links or related_cards
        else ""
    )
    return base_html(
        title=f"{title} | Edge of Epidemiology",
        description=description,
        active="essays",
        base_url=base_url,
        body=f'''<header class="hero reading-header"><p class="kicker"><a href="{html.escape(link_for(base_url, "topics/" + cluster + "/"))}">{html.escape(topic_hub_title(cluster))}</a></p><h1 class="hero-title">{html.escape(title)}</h1><p class="subtitle">{html.escape(description)}</p><p class="reading-byline">By Devin Teichrow <span>·</span> {date}</p>{action}</header>{media}{read}{related_html}''',
    )
