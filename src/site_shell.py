"""Accessible publication navigation and document shell."""

from __future__ import annotations
import html
import re
from .common import link_for


PRIMARY_NAV = [
    ("Essays", "essays/", "essays"),
    ("Exhibits", "tools/", "tools"),
    ("Newsdesk", "newsdesk/", "newsdesk"),
    ("About", "about/", "about"),
    ("Work with me", "opportunities/", "opportunities"),
    ("Search", "search/", "search"),
]


def site_nav(active: str, base_url: str) -> str:
    links = PRIMARY_NAV
    items = "".join(
        f'<a class="site-nav-link{" active" if key == active else ""}" href="{html.escape(link_for(base_url, path))}"'
        + (' aria-current="page"' if key == active else "")
        + f">{label}</a>"
        for label, path, key in links
    )
    return f'''<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header"><div class="site-header-inner">
      <a class="site-brand" href="{html.escape(link_for(base_url, ""))}" aria-label="The Edge of Epidemiology — home"><span class="brand-mark" aria-hidden="true">E<span>∕</span>E</span><span>The Edge of<br>Epidemiology<small>By Devin Teichrow</small></span></a>
      <nav class="site-nav" aria-label="Primary navigation">{items}</nav>
    </div></header>'''


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
    links = "".join(
        f'<a href="{html.escape(link_for(base_url, path))}">{label}</a>'
        for label, path in [
            ("Topics", "topics/"),
            ("Historical", "historical/"),
            ("Reference", "reference/"),
            ("Methods", "methods/"),
            ("Work with me", "opportunities/"),
        ]
    )
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(title)}</title><meta name="description" content="{html.escape(description)}">
    <link rel="stylesheet" href="{html.escape(link_for(base_url, "assets/site.css"))}">{extra_head}</head>
    <body class="site-page page-{html.escape(active)}">{site_nav(active, base_url)}
    <main class="page" id="main" tabindex="-1">{promote_first_hero_heading(body)}</main>
    <footer class="site-footer"><div><p class="footer-title">The Edge of Epidemiology</p><p>Essays, evidence, and the history disease leaves behind.</p><p>Written and built by Devin Teichrow.</p></div><nav aria-label="Further reading">{links}<a href="https://theedgeofepidemiology.substack.com/subscribe">Subscribe on Substack ↗</a></nav></footer>
    <script src="{html.escape(link_for(base_url, "assets/site.js"))}" defer></script>{extra_body_end}</body></html>'''


def promote_first_hero_heading(body: str) -> str:
    return re.sub(
        r'<h2 class="hero-title">(.*?)</h2>',
        r'<h1 class="hero-title">\1</h1>',
        body,
        count=1,
        flags=re.S,
    )
