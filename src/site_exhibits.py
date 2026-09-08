"""Shared public exhibit shell; build output is derived without mutating sources."""

import re
from .common import link_for


def strip_exhibit_nav(text):
    return re.sub(
        r'<a class="eoe-skip".*?</a>\s*<header class="eoe-exhibit-nav".*?</header>',
        "",
        text,
        flags=re.S,
    )


def exhibit_nav(home, tools, news, essays):
    return f'<a class="eoe-skip" href="#exhibit-main">Skip to exhibit</a><header class="eoe-exhibit-nav"><a href="{home}">The Edge of Epidemiology</a><nav aria-label="Exhibit navigation"><a href="{essays}">Essays</a><a href="{tools}">Exhibits</a><a href="{news}">Newsdesk</a><a href="../../opportunities/">Work with me</a></nav></header>'


def finalize_exhibit_shells(docs_dir, base_url):
    routes = [
        "atlases/pathogen",
        "atlases/maritime",
        "atlases/viking",
        "atlases/revolutionary-war",
        "tools/american-epidemic-timeline",
        "tools/histsearch",
    ]
    for route in routes:
        path = docs_dir / route / "index.html"
        if not path.exists():
            continue
        text = strip_exhibit_nav(path.read_text())
        text = re.sub(r'<header class="tool-topbar".*?</header>', "", text, flags=re.S)
        nav = exhibit_nav(
            *(link_for(base_url, p) for p in ["", "tools/", "newsdesk/", "essays/"])
        )
        text = re.sub(
            r"(<body[^>]*>)",
            lambda m: m[1] + nav + '<span id="exhibit-main" tabindex="-1"></span>',
            text,
            count=1,
        )
        path.write_text(text)
