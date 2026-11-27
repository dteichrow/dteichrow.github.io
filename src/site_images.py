"""Locally hosted exhibit and essay images and their attribution."""

import html
import json
from functools import lru_cache
from pathlib import Path

from .common import link_for
from .site_shell import base_html


# WebP copies of the matching Obsidian note banners. The cards frame the
# illustration at the right edge, leaving the note title outside the crop.
ESSAY_ILLUSTRATIONS = {
    "who-counted-plague-deaths-in-late": {
        "asset": "assets/essays/cairo-plague-counting.webp",
        "title": "Who Counted Plague Deaths in Late-Medieval Cairo?",
        "description": "An imagined city gate and a tally sheet.",
    },
    "the-ordinary-deaths-of-the-romans": {
        "asset": "assets/essays/ordinary-deaths-romans.webp",
        "title": "The Ordinary Deaths of the Romans",
        "description": "An imagined Roman street with a lamp, a sandal, and a clay pipe.",
    },
}


# Keep these variants outside the Substack-synced post manifest.
ESSAY_COVERS = {
    "disease-and-survival-in-early-plymouth": {
        "variants": [
            (width, f"assets/essays/plymouth-champlain-{width}.webp")
            for width in (480, 720, 960)
        ],
        "credit": "Samuel de Champlain, Port St Louis (Plymouth Harbor), in Les Voyages (1613), fol. K4v.",
        "record": "https://catalogue.bnf.fr/ark:/12148/cb38495058j",
    },
}


def essay_cover_tag(cover, base_url, *, sizes, eager=False):
    variants = cover["variants"]
    width, path = variants[-1]
    srcset = ", ".join(f"{link_for(base_url, asset)} {w}w" for w, asset in variants)
    priority = ' fetchpriority="high"' if eager else ""
    return (
        f'<img src="{html.escape(link_for(base_url, path))}" '
        f'srcset="{html.escape(srcset)}" sizes="{html.escape(sizes)}" '
        f'width="{width}" height="{width * 3 // 4}" alt="" '
        f'loading="{"eager" if eager else "lazy"}" decoding="async"{priority}>'
    )


@lru_cache(maxsize=1)
def image_records():
    path = Path(__file__).resolve().parents[1] / "assets/exhibits/image-credits.json"
    return {item["id"]: item for item in json.loads(path.read_text())["images"]}


def image_tag(record, base_url, *, eager=False, uncropped=False):
    variants = record["variants"]
    largest = variants[-1]
    srcset = ", ".join(
        f"{link_for(base_url, v['path'])} {v['width']}w" for v in variants
    )
    sizes = "(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 640px"
    return (
        f'<img src="{html.escape(link_for(base_url, largest["path"]))}" '
        f'srcset="{html.escape(srcset)}" sizes="{sizes}" '
        f'width="{largest["width"]}" height="{largest["height"]}" '
        f'alt="{html.escape(record["alt"])}" '
        f'loading="{"eager" if eager else "lazy"}" decoding="async" '
        + ("" if uncropped else f'style="object-position:{record["position"]}" ')
        + "/>"
    )


def render_exhibit_image(image_id, base_url, href, *, eager=False):
    record = image_records()[image_id]
    credit_href = link_for(base_url, "image-credits/#" + image_id)
    return (
        '<figure class="exhibit-image">'
        f'<a class="atlas-card-visual" href="{html.escape(href)}" tabindex="-1">'
        + image_tag(record, base_url, eager=eager)
        + "</a>"
        f"<figcaption>{html.escape(record['caption'])} "
        f'<a href="{html.escape(credit_href)}" aria-label="Image credit: {html.escape(record["title"])}">'
        + (
            "Carolina Bertilsson · CC BY 4.0"
            if image_id == "viking-health-atlas"
            else "Image source"
        )
        + " ↗</a></figcaption></figure>"
    )


def render_image_credits(base_url):
    records = []
    for record in image_records().values():
        records.append(
            f'<article class="image-credit-record" id="{record["id"]}">'
            f"<figure>{image_tag(record, base_url, uncropped=True)}</figure>"
            "<div>"
            f'<p class="kicker">{html.escape(record["collection"])}</p>'
            f"<h2>{html.escape(record['title'])}</h2>"
            f"<p>{html.escape(record['creator'])} · {html.escape(record['date'])}</p>"
            f"<p>{html.escape(record['context'])}</p>"
            f'<p><a href="{html.escape(record["license_url"])}">{html.escape(record["license"])}</a>. '
            f"{html.escape(record['rights_note'])}</p>"
            f'<p class="muted-note">{html.escape(record["changes"])}</p>'
            f'<a class="text-link" href="{html.escape(record["source"])}">Open the collection record ↗</a>'
            "</div></article>"
        )
    essay_credits = "".join(
        f'<li id="{html.escape(slug)}"><cite>{html.escape(art["title"])}</cite>. '
        f'{html.escape(art["description"])}</li>'
        for slug, art in ESSAY_ILLUSTRATIONS.items()
    )
    return base_html(
        title="Image credits | The Edge of Epidemiology",
        description="Sources and reuse rights for exhibit images, and credits for essay illustrations.",
        active="credits",
        base_url=base_url,
        body='<header class="hero"><p class="kicker">Behind the images</p>'
        '<h1 class="hero-title">Documents, objects, evidence.</h1>'
        '<p class="subtitle">The exhibit covers draw on public collections and openly licensed research photographs. '
        "Here are the complete images, their creators, and the records that establish how they can be reused.</p>"
        "<p>Rights records checked September 8, 2026. "
        f'<a href="{html.escape(link_for(base_url, "assets/exhibits/image-credits.json"))}">Download the image catalogue (JSON)</a>.</p></header>'
        + "".join(records)
        + '<section class="home-section prose" id="essay-illustrations">'
        '<h2>Essay illustrations</h2>'
        '<p>These AI-generated illustrations first appeared as covers for my research notes. '
        'The essay cards show a crop of the artwork.</p>'
        f'<ul>{essay_credits}</ul></section>',
    )
