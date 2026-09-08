"""Publication landing and reading pages; no build or filesystem side effects."""

import html
from .common import format_display_date, link_for
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
    recent = "".join(render_post_card(p, base_url) for p in posts[1:7])
    stories = "".join(
        render_story_card(p, base_url) for p in latest.get("stories", [])[:3]
    )
    exhibits = "".join(render_tool_card(t, base_url) for t in tools)
    return base_html(
        title="The Edge of Epidemiology | Devin Teichrow",
        description="Disease follows human arrangements. Essays, historical disease exhibits, and current reporting by epidemiologist Devin Teichrow.",
        active="home",
        base_url=base_url,
        body=f'''
    <section class="hero hero-home"><p class="kicker">History · Disease · Human arrangements</p>
    <h1 class="hero-title">Disease follows <br>human arrangements.</h1>
    <div class="hero-intro"><p>Ships and barracks. Markets and wells. The crowded room and the delayed decision. Disease moves through the worlds we build.</p><p>I’m Devin Teichrow, a UCLA-trained epidemiologist at UC Irvine. I write about the evidence disease leaves behind—and the institutions that shape its course.</p></div></section>
    <section class="opening-work" aria-label="Featured work"><div class="featured-essay"><p class="kicker">The latest essay</p>{feature}</div>
    <article class="flagship-preview">{render_exhibit_image("maritime-disease-atlas", base_url, link_for(base_url, "atlases/maritime/"), eager=True)}<div><p class="kicker">Enter the exhibit</p><h2><a href="{href("atlases/maritime/")}">A ship is a disease environment.</a></h2><p>Look inside the Maritime Disease Atlas. Follow a route, open a case, or inspect the spaces where infection and deprivation meet.</p><a class="text-link" href="{href("atlases/maritime/")}">Explore the ship and its history <span aria-hidden="true">→</span></a></div></article></section>
    <section class="home-section"><div class="section-head section-head-split"><div><p class="kicker">Published writing</p><h2>Recent essays</h2></div><a class="text-link" href="{href("essays/")}">All essays →</a></div><div class="card-grid three-up essays-grid">{recent}</div></section>
    <section class="home-section newsdesk-panel"><div class="section-head section-head-split"><div><p class="kicker">Current reporting</p><h2>The Pathogen Dispatch</h2><p>Follow outbreak reporting back to the underlying sources.</p></div><a class="text-link" href="{href("newsdesk/")}">Open the Newsdesk →</a></div><div class="card-grid three-up">{stories}</div></section>
    <section class="home-section"><div class="section-head"><p class="kicker">The exhibit collection</p><h2>History you can inspect.</h2><p>Explore a place, compare a record, and examine what the evidence supports.</p></div><div class="card-grid three-up">{exhibits}</div></section>
    <section class="commission-strip"><div><p class="kicker">Work with me</p><h2>Research into something people can use.</h2><p>Websites, evidence briefs, analysis, science writing, and interactive exhibits.</p></div><a class="button primary" href="{href("opportunities/")}">See projects and prices →</a></section>''',
    )


def render_post_page(post, atlases, posts, base_url, body_html):
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
