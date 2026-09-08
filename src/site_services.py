"""One package registry feeds both the services page and referral document."""

import html
import json
from urllib.parse import urlencode
from .common import CONTENT_DIR, link_for
from .site_shell import base_html


def load_services():
    return json.loads((CONTENT_DIR / "services.json").read_text())


def inquiry_url(name, contact):
    return (
        "mailto:"
        + contact
        + "?"
        + urlencode(
            {
                "subject": f"Project inquiry: {name}",
                "body": "Problem or deliverable:\n\nAudience:\n\nExisting materials:\n\nDeadline:\n\nBudget range:\n",
            }
        )
    )


def render_opportunities_page(base_url):
    registry = load_services()
    cards = []
    for number, p in enumerate(registry["packages"], 1):
        bullets = "".join(f"<li>{html.escape(t)}</li>" for t in p["deliverables"])
        cards.append(
            f'''<article class="service-package-card" id="{p["id"]}"><div class="package-card-head"><p class="kicker">{number:02} / Project package</p><h2>{html.escape(p["name"])}</h2><p class="package-price">{p["price"]}</p><p>{html.escape(p["problem"])}</p></div><div class="package-detail"><h3>What you receive</h3><ul>{bullets}</ul><details><summary>What to send, and how scope affects the quote</summary><p><strong>To begin:</strong> {html.escape(p["materials"])}</p><p>{html.escape(p["scope"])}</p></details><p class="work-example"><span>Example from my own work</span><a href="{html.escape(link_for(base_url, p["route"]))}">{html.escape(p["example"])} →</a></p><a class="button secondary" href="{html.escape(inquiry_url(p["name"], registry["contact"]))}">Ask about this package ↗</a></div></article>'''
        )
    return base_html(
        title="Work with me | Devin Teichrow",
        description="Hire Devin Teichrow for research websites, evidence translation, scientific writing, data cleanup, and interactive exhibits. Packages from $400.",
        active="opportunities",
        base_url=base_url,
        body=f'''<section class="hero opportunities-hero"><p class="kicker">Work with me</p><h1 class="hero-title">Make your research <br>easier to use.</h1><div class="hero-intro"><p>I help researchers, labs, health teams, and editors turn technical work into clear writing, useful analysis, and public websites.</p><p>I’m a UCLA-trained epidemiologist working in neurology at UC Irvine and the writer and builder behind The Edge of Epidemiology.</p></div><div class="hero-actions"><a class="button primary" href="{html.escape(inquiry_url("Research project", registry["contact"]))}">Tell me about your project ↗</a><a class="text-link" href="{html.escape(link_for(base_url, "assets/referral/devin-teichrow-referral-packet.pdf"))}">Download the referral guide ↓</a></div></section><p class="service-intro">Choose a starting point below. Each range covers a defined project; we agree on the deliverable and scope before work begins. The examples are my own projects, provided to show the approach.</p><section class="service-packages" aria-label="Project packages">{"".join(cards)}</section><section class="home-section"><p class="kicker">How we work</p><h2>A clear scope, a usable handoff.</h2><ol class="service-process"><li><h3>Define the deliverable</h3><p>We agree on the audience, source material, output, scope, and review points.</p></li><li><h3>Build and review</h3><p>I develop the work and incorporate the agreed review.</p></li><li><h3>Hand over the work</h3><p>You receive the finished artifact, relevant source files, and instructions for using or updating it.</p></li></ol><p class="maintenance-note"><strong>Ongoing maintenance: {registry["maintenance"]}.</strong> Separately scoped support for publication updates, page changes, broken links, and similar upkeep.</p></section><section class="commission-strip"><div><h2>Have a project in mind?</h2><p>Send the problem, audience, existing materials, deadline, and budget range.</p></div><a href="{html.escape(inquiry_url("Research project", registry["contact"]))}">{registry["contact"]} ↗</a></section>''',
    )
