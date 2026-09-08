from __future__ import annotations
from .site_import_shell import (
    shell_wrapper_css,
    imported_shell_nav,
    imported_shell_footer,
)

import argparse
import datetime as dt
import html
import json
import os
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
    load_tool_registry,
    normalize_base_url,
    temporary_directory,
    write_json,
)

from .site_config import *
from .site_shell import site_nav, base_html, promote_first_hero_heading
from .site_content import (
    post_folio_meta,
    public_tool_status,
    public_tool_export,
    public_post_export,
    canonical_meta,
    post_display_title,
    post_seo_description,
    normalize_overview_paragraph,
    post_overview_paragraphs,
    post_indexing_strategy,
    post_should_index,
    post_site_visibility,
    is_public_essay_post,
    public_essay_posts,
    post_topic_cluster,
    topic_hub_title,
)
from .site_cards import (
    render_card,
    css_token,
    render_atlas_card,
    render_tool_card,
    render_post_card,
    render_story_card,
    render_reference_card,
)
from .site_seo import (
    route_for_html_path,
    public_url_for_route,
    extract_html_title,
    extract_meta_description_from_html,
    meta_tag_content,
    extract_primary_heading,
    clean_seo_description,
    title_case_slug,
    post_route,
    route_is_collection,
    seo_profile_for_route,
    ensure_head_element,
    upsert_title,
    remove_meta_name,
    remove_meta_property,
    render_json_ld,
    apply_seo_profile,
    finalize_seo,
    write_sitemap_and_robots,
)


def is_doi_url(value: str | None) -> bool:
    if not value:
        return False
    lowered = value.lower()
    return "doi.org/" in lowered or bool(DOI_URL_PATTERN.search(value))


def sanitize_public_copy(value: Any) -> Any:
    if isinstance(value, str):
        for old, new in PUBLIC_COPY_REPLACEMENTS.items():
            value = value.replace(old, new)
        return value
    if isinstance(value, list):
        return [sanitize_public_copy(item) for item in value]
    if isinstance(value, dict):
        return {key: sanitize_public_copy(item) for key, item in value.items()}
    return value


def sanitize_copied_app_exports(app_exports_dir: Path) -> None:
    for path in app_exports_dir.glob("*.json"):
        try:
            data = load_json(path)
        except json.JSONDecodeError:
            continue
        write_json(path, sanitize_public_copy(data))


def public_pathogen_citations(
    entry: dict[str, Any],
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    public_citations: list[dict[str, Any]] = []
    withheld_citations: list[dict[str, Any]] = []
    for citation in entry.get("citations", []):
        citation_copy = dict(citation)
        if is_doi_url(citation_copy.get("url")) and not citation_copy.get("verified"):
            withheld_citations.append(
                {
                    "id": citation_copy.get("id", ""),
                    "short_citation": citation_copy.get("short_citation", ""),
                    "reason": "DOI link withheld pending manual verification",
                }
            )
            continue
        public_citations.append(citation_copy)
    return public_citations, withheld_citations


def local_post_body_html(post: dict[str, Any]) -> str:
    body_path = str(post.get("local_body_path") or "").strip()
    if not body_path:
        return ""
    candidate = Path(body_path)
    if not candidate.is_absolute():
        candidate = PROJECT_ROOT / candidate
    try:
        candidate.resolve().relative_to(PROJECT_ROOT.resolve())
    except ValueError:
        return ""
    if not candidate.exists() or not candidate.is_file():
        return ""
    from .substack_sync import sanitize_post_body_html

    return sanitize_post_body_html(candidate.read_text())


def render_home(posts, tools, latest, base_url):
    from .site_pages import render_home as render

    return render(posts, tools, latest, base_url)


def render_essays_index(posts: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(
        render_post_card(post, base_url, featured=index % 6 == 0)
        for index, post in enumerate(posts)
    )
    return base_html(
        title="Essays | Edge of Epidemiology",
        description="Published work from The Edge of Epidemiology.",
        active="essays",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Writing archive</p>
        <h2 class="hero-title">Published work from The Edge of Epidemiology</h2>
        <p class="subtitle">Essays on outbreaks, evidence, disease history, ecology, neuroepidemiology, and the public arguments that gather around health.</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head">
          <p class="kicker">Archive</p>
          <h2>{len(posts)} essays</h2>
          <p class="muted-note">Each entry keeps the essay connected to topic hubs, disease maps, and related work across the site.</p>
        </div>
        <div class="card-grid three-up essays-grid">{cards}</div>
      </section>
    """,
    )


def render_topic_hub_index(posts: list[dict[str, Any]], base_url: str) -> str:
    cards = []
    for hub in TOPIC_HUBS:
        count = sum(1 for post in posts if post_topic_cluster(post) == hub["slug"])
        cards.append(
            render_card(
                title=str(hub["title"]),
                href=link_for(base_url, f"topics/{hub['slug']}/"),
                kicker=f"{count} essay(s)",
                summary=str(hub["description"]),
                meta=["Topic hub"],
            )
        )
    return base_html(
        title="Topics | Edge of Epidemiology",
        description="Topic hubs for historical epidemiology, disease and war, pathogen geography, epidemiologic methods, wellness claims, and neuroepidemiology.",
        active="topics",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Topic hubs</p>
        <h2 class="hero-title">The main reading paths through The Edge of Epidemiology</h2>
        <p class="subtitle">A topical map of disease history, war, ecology, geography, methods, wellness claims, and neuroepidemiology.</p>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid three-up">{"".join(cards)}</div>
      </section>
    """,
    )


def render_topic_hub_page(
    hub: dict[str, Any], posts: list[dict[str, Any]], base_url: str
) -> str:
    selected = [post for post in posts if post_topic_cluster(post) == hub["slug"]]
    cards = "".join(
        render_post_card(post, base_url, featured=index == 0)
        for index, post in enumerate(selected)
    )
    if not cards:
        cards = '<p class="muted-note">No essays are currently assigned to this topic hub.</p>'
    return base_html(
        title=f"{hub['title']} Topic Hub | Edge of Epidemiology",
        description=str(hub["description"]),
        active="topics",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Topic hub</p>
        <h2 class="hero-title">{html.escape(str(hub["title"]))}</h2>
        <p class="subtitle">{html.escape(str(hub["description"]))}</p>
      </section>
      <section class="panel panel-soft">
        <div class="section-head">
          <p class="kicker">Essays</p>
          <h2>{len(selected)} linked piece(s)</h2>
          <p class="muted-note">This hub groups related writing so readers can move from one argument to the surrounding disease history, ecology, and evidence.</p>
        </div>
        <div class="card-grid three-up essays-grid">{cards}</div>
      </section>
    """,
    )


def render_post_page(post, atlases, posts, base_url):
    from .site_pages import render_post_page as render

    return render(post, atlases, posts, base_url, local_post_body_html(post))


def render_atlas_hub(atlases: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_atlas_card(entry, base_url) for entry in atlases)
    return base_html(
        title="Atlases | Edge of Epidemiology",
        description="Legacy atlas route for Edge of Epidemiology map projects, including pathogen, maritime, Viking, and Revolutionary War disease mapping.",
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Atlases</p>
        <h2 class="hero-title">The atlas family now lives inside Interactive Exhibits</h2>
        <p class="subtitle">Disease maps, historical exhibits, and visual tools for following pathogens through geography, infrastructure, ecology, and time.</p>
        <div class="hero-actions"><a class="button secondary" href="{html.escape(link_for(base_url, "tools/"))}">Open Exhibits</a></div>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid two-up">{cards}</div>
      </section>
    """,
    )


def render_tools_hub(tools: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(render_tool_card(entry, base_url) for entry in tools)
    return base_html(
        title="Interactive Exhibits | Edge of Epidemiology",
        description="Interactive timelines, atlases, and evidence-led public-health exhibits from Edge of Epidemiology.",
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Interactive exhibits</p>
        <h2 class="hero-title">The exhibit collection.</h2>
        <p class="subtitle">Follow an epidemic through time, examine a ship’s spaces, or read the sources behind a historical claim.</p>
      </section>
      <section class="panel panel-soft">
        <div class="card-grid two-up">{cards}</div>
      </section>
    """,
    )


def render_reference_index(references: list[dict[str, Any]], base_url: str) -> str:
    cards = "".join(
        render_reference_card(reference, base_url) for reference in references
    )
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


def title_from_story_filename(filename: str) -> str:
    stem = Path(filename).stem
    slug = re.sub(r"^story_[0-9a-f]+-?", "", stem)
    if not slug:
        return "Archived story file"
    return slug.replace("-", " ").title()


def render_archived_story_placeholder(filename: str, base_url: str) -> str:
    story_title = title_from_story_filename(filename)
    return base_html(
        title=f"{story_title} | Archived story file",
        description="Archived Pathogen Dispatch story reference.",
        active="newsdesk",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">Archived story file</p>
        <h2 class="hero-title">{html.escape(story_title)}</h2>
        <p class="subtitle">Earlier Pathogen Dispatch coverage retained for archive continuity.</p>
        <div class="hero-actions">
          <a class="button secondary" href="{html.escape(link_for(base_url, "stories/"))}">Current story files</a>
          <a class="button secondary" href="{html.escape(link_for(base_url, "newsdesk/archive/"))}">Newsdesk archive</a>
        </div>
      </section>
    """,
    )


def ensure_archived_story_placeholders(docs_dir: Path, base_url: str) -> None:
    story_hrefs: set[str] = set()
    for page in (docs_dir / "newsdesk").rglob("*.html"):
        page_text = page.read_text()
        story_hrefs.update(
            re.findall(r'href="[^"]*/stories/([^"#?]+\.html)', page_text)
        )
    for filename in sorted(story_hrefs):
        dest = docs_dir / "stories" / filename
        if dest.exists():
            continue
        ensure_dir(dest.parent)
        dest.write_text(render_archived_story_placeholder(filename, base_url))


def render_historical_page(
    posts: list[dict[str, Any]], atlases: list[dict[str, Any]], base_url: str
) -> str:
    selected = [
        post
        for post in posts
        if "history" in [topic.lower() for topic in post.get("topics", [])]
        or any(
            atlas_id
            in {
                "revolutionary-war-atlas",
                "viking-health-atlas",
                "maritime-disease-atlas",
            }
            for atlas_id in post.get("related_atlases", [])
        )
    ][:12]
    cards = "".join(render_post_card(post, base_url) for post in selected)
    atlas_cards = "".join(
        render_atlas_card(entry, base_url)
        for entry in atlases
        if entry.get("atlas_id")
        in {"maritime-disease-atlas", "revolutionary-war-atlas", "viking-health-atlas"}
    )
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
        description="Methods and sourcing principles for The Edge of Epidemiology.",
        active="methods",
        base_url=base_url,
        body=f"""
      <section class="hero hero-open">
        <p class="kicker">Methods</p>
        <h2 class="hero-title">How I handle evidence, uncertainty, and disease stories</h2>
        <p class="subtitle">The work here keeps outbreak reporting, historical argument, and epidemiologic explanation separate enough that readers can see what kind of claim is being made.</p>
      </section>
      <section class="panel prose">
        <h3>Publication archive</h3>
        <p>The essay archive keeps longform writing connected to topic hubs, reference pages, and interactive maps, so a reader can move from an argument to the surrounding disease ecology.</p>
        <h3>Live desk</h3>
        <p>The Pathogen Dispatch follows current outbreak reporting with visible source links, caveats, and separate story files for major public-health signals.</p>
        <h3>Atlas evidence policy</h3>
        <p>Atlas geometry and route claims are treated as arguments that need evidence. Visuals help readers inspect the ecology, but they do not stand in for proof.</p>
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
        <p class="subtitle">An epidemiology project built around outbreak reporting, disease geography, historical epidemiology, and science communication.</p>
      </section>
      <section class="about-layout">
        <div class="about-block">
          <p class="kicker">Bio</p>
          <h3>Research and public work</h3>
          <p>I’m Devin Teichrow, an epidemiologist based at the University of California, Irvine, where I am an epidemiology specialist in the lab of Dr. Ali Ezzati. My public science work sits at the intersection of infectious disease, historical analysis, and evidence communication.</p>
          <p>I received my training in epidemiology at UCLA and currently work in neurology research, where my projects have focused on cognition, migraine, aging, ecological momentary assessment, and digital health methods. Alongside my academic work, I’ve developed a growing interest in how disease moves through populations beyond the clinic or dataset: through war, migration, infrastructure, ecology, trade, and geography.</p>
          <p>That broader perspective is what led to my <a href="https://theedgeofepidemiology.substack.com">Substack, The Edge of Epidemiology</a>. My writing can also currently be found in The Viking Herald and The Age of Exploration.</p>
        </div>
        <div class="about-block">
          <p class="kicker">Project</p>
          <h3>What the project became</h3>
          <p>The Edge of Epidemiology began as a place to write about historical epidemics and overlooked disease stories, but it has gradually expanded into something wider: a hybrid of outbreak reporting, historical epidemiology, disease atlases, methodological explainers, and longform essays about how pathogens shape societies over time.</p>
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
          <p>My goal is to make epidemiology feel legible, historically grounded, and intellectually honest for a broader audience without flattening uncertainty or complexity. Outside of research and writing, I build interactive disease atlases, epidemiology exhibits, and science communication projects focused on making complex public health topics more understandable and visually intuitive.</p>
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


def render_opportunities_page(base_url):
    from .site_services import render_opportunities_page as render

    return render(base_url)


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
        <h2 class="hero-title">Find something worth reading</h2>
        <p class="subtitle">Search essays, exhibits, reference pages, and current reporting.</p>
      </section>
      <section class="panel">
        <div class="search-shell" data-search-source="{html.escape(endpoint)}">
          <div class="search-controls">
            <label class="search-label">Search<input class="filter-input" type="search" data-search-input placeholder="Search titles, tags, places, pathogens, or phrases" /></label>
            <label class="search-label">Section<select class="filter-select" data-search-filter>
              <option value="all">All sections</option>
              <option value="Exhibit">Exhibits</option>
              <option value="Essay">Essays</option>
              <option value="Topic">Topics</option>
              <option value="Newsdesk">Newsdesk</option>
              <option value="Reference">Reference</option>
            </select></label>
          </div>
          <p data-search-count role="status"></p><div class="card-grid three-up" data-search-results></div>
        </div>
      </section>
    """,
    )


def render_curated_atlas_page(
    entry: dict[str, Any], posts: list[dict[str, Any]], base_url: str
) -> str:
    related = [
        post
        for post in posts
        if entry.get("atlas_id") in post.get("related_atlases", [])
    ][:8]
    related_cards = (
        "".join(render_post_card(post, base_url) for post in related)
        or '<p class="muted-note">No linked essays are curated here yet.</p>'
    )
    return base_html(
        title=f"{entry.get('title')} | Edge of Epidemiology",
        description=entry.get("summary", ""),
        active="tools",
        base_url=base_url,
        body=f"""
      <section class="hero">
        <p class="kicker">{html.escape(entry.get("status_label", "Atlas"))}</p>
        <h2 class="hero-title">{html.escape(entry.get("title", "Atlas"))}</h2>
        <p class="subtitle">{html.escape(entry.get("summary", ""))}</p>
      </section>
      <section class="panel prose">
        <h3>Current state</h3>
        <p>{html.escape(entry.get("long_note", "This atlas section is being prepared as a fuller public geography project."))}</p>
        <h3>Evidence model</h3>
        <p>{html.escape(entry.get("evidence_model", "Curated historical and epidemiologic sources."))}</p>
      </section>
      <section class="panel">
        <div class="section-head"><p class="kicker">Related writing</p><h2>Connected essays</h2></div>
        <div class="card-grid three-up">{related_cards}</div>
      </section>
    """,
    )


def prepare_epidossier_docs(source_docs: Path) -> Path:
    """Re-render upstream exports in isolation, retaining their collection dates."""
    renderer = source_docs.parent / "src" / "rebuild_public.py"
    if not renderer.exists():
        return source_docs
    import sys

    output = temporary_directory("epi-dossier-public-contracts-") / "docs"
    subprocess.run(
        [
            sys.executable,
            "-m",
            "src.rebuild_public",
            "--source-docs",
            str(source_docs.resolve()),
            "--output-dir",
            str(output.resolve()),
        ],
        cwd=source_docs.parent,
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    return output


def resolve_epidossier_docs() -> Path:
    configured_docs = os.environ.get("EOE_EPI_DOSSIER_DOCS")
    if configured_docs:
        docs_path = Path(configured_docs).expanduser()
        if not docs_path.exists():
            raise FileNotFoundError(
                f"Configured epi-dossier docs path does not exist: {docs_path}"
            )
        return prepare_epidossier_docs(docs_path)

    local_candidate = PROJECT_ROOT.parent / "epi-dossier" / "docs"
    if local_candidate.exists():
        return prepare_epidossier_docs(local_candidate)

    temp_root = temporary_directory("epi-dossier-import-")
    clone_dir = temp_root / "epi-dossier"
    subprocess.run(
        [
            "git",
            "clone",
            "--depth",
            "1",
            os.environ.get("EOE_EPI_DOSSIER_REPO", DEFAULT_EPI_DOSSIER_REPO),
            str(clone_dir),
        ],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    docs_path = clone_dir / "docs"
    if not docs_path.exists():
        raise FileNotFoundError("Cloned epi-dossier repo did not contain docs/")
    return prepare_epidossier_docs(docs_path)


def import_copy(src: Path, dest: Path) -> None:
    ensure_dir(dest.parent)
    shutil.copy2(src, dest)


def sync_legacy_newsdesk_app_exports(docs_dir: Path) -> None:
    """Keep the previous public JSON location available for existing clients."""
    source = docs_dir / "app_exports"
    destination = docs_dir / "newsdesk" / "app_exports"
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination)


def rewrite_imported_paths(html_text: str, base_url: str) -> str:
    replacements = {
        "./index.html": link_for(base_url, "newsdesk/"),
        "./notebook.html": link_for(base_url, "notebook/"),
        "../notebook.html": link_for(base_url, "notebook/"),
        "./atlas.html": link_for(base_url, "atlases/pathogen/"),
        "../atlas.html": link_for(base_url, "atlases/pathogen/"),
        "./outbreaks.html": link_for(base_url, "newsdesk/outbreaks/"),
        "../outbreaks.html": link_for(base_url, "newsdesk/outbreaks/"),
        "../../outbreaks.html": link_for(base_url, "newsdesk/outbreaks/"),
        "./watch.html": link_for(base_url, "newsdesk/watch/"),
        "../watch.html": link_for(base_url, "newsdesk/watch/"),
        "./africa.html": link_for(base_url, "newsdesk/africa/"),
        "../africa.html": link_for(base_url, "newsdesk/africa/"),
        "./asia.html": link_for(base_url, "newsdesk/asia/"),
        "../asia.html": link_for(base_url, "newsdesk/asia/"),
        "./research.html": link_for(base_url, "newsdesk/research/"),
        "../research.html": link_for(base_url, "newsdesk/research/"),
        "./official.html": link_for(base_url, "newsdesk/official/"),
        "../official.html": link_for(base_url, "newsdesk/official/"),
        "./historical.html": link_for(base_url, "newsdesk/historical/"),
        "../historical.html": link_for(base_url, "newsdesk/historical/"),
        "./archive/index.html": link_for(base_url, "newsdesk/archive/"),
        "../archive/index.html": link_for(base_url, "newsdesk/archive/"),
        "./stories/": link_for(base_url, "stories/"),
        "../stories/": link_for(base_url, "stories/"),
        "../../stories/": link_for(base_url, "stories/"),
        "./reference/": link_for(base_url, "reference/"),
        "../reference/": link_for(base_url, "reference/"),
        "../../reference/": link_for(base_url, "reference/"),
        "./app_exports/": link_for(base_url, "app_exports/"),
        "../app_exports/": link_for(base_url, "app_exports/"),
        "../../app_exports/": link_for(base_url, "app_exports/"),
        "./2026/": link_for(base_url, "newsdesk/2026/"),
        "../2026/": link_for(base_url, "newsdesk/2026/"),
        "../../2026/": link_for(base_url, "newsdesk/2026/"),
        "./latest.html": link_for(base_url, "newsdesk/latest.html"),
        "./latest.md": link_for(base_url, "newsdesk/latest.md"),
        "../latest.html": link_for(base_url, "newsdesk/latest.html"),
        "../../latest.html": link_for(base_url, "newsdesk/latest.html"),
    }
    for needle, replacement in replacements.items():
        html_text = html_text.replace(f'href="{needle}', f'href="{replacement}')
        html_text = html_text.replace(f"href='{needle}", f"href='{replacement}")
        html_text = html_text.replace(f'src="{needle}', f'src="{replacement}')
        html_text = html_text.replace(f"src='{needle}", f"src='{replacement}")
        html_text = html_text.replace(f'fetch("{needle}', f'fetch("{replacement}')
        html_text = html_text.replace(f"fetch('{needle}", f"fetch('{replacement}")
        if "app_exports/" in needle:
            html_text = html_text.replace(f'"{needle}', f'"{replacement}')
            html_text = html_text.replace(f"'{needle}", f"'{replacement}")
            html_text = html_text.replace(f"`{needle}", f"`{replacement}")
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
    return [
        strip_html_tags(match)
        for match in BADGE_TEXT_RE.findall(fragment)
        if strip_html_tags(match)
    ]


def looks_like_date(text: str) -> bool:
    return bool(re.search(r"\b\d{4}-\d{2}-\d{2}", text))


def is_count_text(text: str) -> bool:
    lowered = text.lower()
    return any(
        token in lowered
        for token in ("item(s)", "source(s)", "official", "route(s)", "citation(s)")
    )


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
        feature_text = joined_meta(
            [text for text in badge_texts if is_count_text(text)]
        )
        writing_state = next(
            (
                text
                for text in badge_texts
                if "writing" in text.lower() or "dedicated post" in text.lower()
            ),
            "",
        )
        if status or feature_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += f'<span class="story-status-pill atlas-status-pill">{html.escape(status)}</span>'
            if feature_text:
                summary_html += (
                    f'<span class="meta-inline">{html.escape(feature_text)}</span>'
                )
            summary_html += "</div>"
        if writing_state:
            summary_html += (
                f'<p class="card-meta-text">{html.escape(writing_state)}</p>'
            )
    elif "feature-card" in article_html:
        status = status_text_for(badge_texts)
        geography = joined_meta(
            [
                text
                for text in badge_texts
                if text
                and not is_count_text(text)
                and not looks_like_date(text)
                and text.lower() not in STATUS_TEXTS
            ]
        )
        if status or geography:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += (
                    f'<span class="story-status-pill">{html.escape(status)}</span>'
                )
            if geography:
                summary_html += (
                    f'<span class="meta-inline">{html.escape(geography)}</span>'
                )
            summary_html += "</div>"
    else:
        source = ""
        if "<strong>Source:</strong>" not in article_html:
            source = next(
                (
                    text
                    for text in badge_texts
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
                text
                for text in badge_texts
                if text.lower() not in NOISE_TEXTS
                and text.lower() in STATUS_TEXTS
                and text.lower() != "official agency"
            ),
            "",
        )
        doi_text = next(
            (text for text in badge_texts if text.lower().startswith("doi:")), ""
        )
        meta_text = joined_meta([source, date_text])
        if status or meta_text:
            summary_html += '<div class="meta-row meta-row-plain">'
            if status:
                summary_html += (
                    f'<span class="story-status-pill">{html.escape(status)}</span>'
                )
            if meta_text:
                summary_html += (
                    f'<span class="meta-inline">{html.escape(meta_text)}</span>'
                )
            summary_html += "</div>"
        if doi_text:
            summary_html += f'<p class="card-meta-text">{html.escape(doi_text)}</p>'

    if link_rows:
        summary_html += "".join(link_rows)

    return article_without_rows.replace("</article>", f"{summary_html}</article>")


def simplify_imported_cards(html_text: str) -> str:
    return ARTICLE_RE.sub(
        lambda match: simplify_imported_article(match.group(1)), html_text
    )


def remove_imported_build_meta(html_text: str) -> str:
    html_text = re.sub(
        r'\s*<span class="badge(?: [^"]+)?">First seen:.*?</span>',
        "",
        html_text,
        flags=re.S,
    )
    html_text = re.sub(
        r'\s*<div class="meta-row">(?=[\s\S]*?</div>)(?=[\s\S]{0,900}(?:Official confidence|Direct links|Refresh cache|Fallback cache|Retained:|Wire confidence|Wrapper only confidence)).*?</div>',
        "",
        html_text,
        flags=re.S,
    )
    return html_text


def remove_imported_section_nav(html_text: str) -> str:
    return re.sub(
        r'\s*<nav class="section-nav panel utility-panel".*?</nav>',
        "",
        html_text,
        flags=re.S,
    )


def ensure_meta_description(html_text: str, description: str) -> str:
    if '<meta name="description"' in html_text:
        return html_text
    return html_text.replace(
        "</head>",
        f'<meta name="description" content="{html.escape(description)}" /></head>',
        1,
    )


def transform_imported_html(html_text: str, *, active: str, base_url: str) -> str:
    html_text = rewrite_imported_paths(html_text, base_url)
    html_text = remove_imported_section_nav(html_text)
    html_text = re.sub(
        r'<header class="site-header".*?</header>', "", html_text, flags=re.S
    )
    html_text = re.sub(
        r"<main([^>]*)>",
        r'<main\1 id="eoe-import-main" tabindex="-1">',
        html_text,
        count=1,
    )
    html_text = html_text.replace(
        "</body>", imported_shell_footer(base_url) + "</body>", 1
    )
    html_text = simplify_imported_cards(html_text)
    html_text = remove_imported_build_meta(html_text)
    html_text = sanitize_public_copy(html_text)
    description = (
        "Source-first outbreak reporting from The Pathogen Dispatch."
        if active == "newsdesk"
        else "Edge of Epidemiology publication page."
    )
    html_text = ensure_meta_description(html_text, description)
    html_text = html_text.replace("</head>", f"{shell_wrapper_css(base_url)}</head>")
    html_text = html_text.replace(
        "<body>", f"<body>{imported_shell_nav(active, base_url)}", 1
    )
    return re.sub(r"[ \t]+\n", "\n", html_text)


def live_newsdesk_redirect_html(*, title: str, target_url: str) -> str:
    escaped_title = html.escape(title)
    escaped_target = html.escape(target_url, quote=True)
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url={escaped_target}" />
    <link rel="canonical" href="{escaped_target}" />
    <title>{escaped_title}</title>
    <script>
      window.location.replace("{escaped_target}");
    </script>
    <style>
      body {{
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: "Avenir Next", "Helvetica Neue", Arial, sans-serif;
        color: #173046;
        background: #fbf8f0;
      }}
      main {{
        max-width: 34rem;
        padding: 2rem;
        text-align: center;
      }}
      a {{
        color: #8d3f2f;
        font-weight: 700;
      }}
    </style>
</head>
<body>
    <main>
      <h1>{escaped_title}</h1>
      <p><a href="{escaped_target}">Open the current Pathogen Dispatch</a></p>
    </main>
  </body>
</html>
"""


def write_live_newsdesk_redirects(docs_dir: Path, base_url: str) -> None:
    redirects = [
        (
            docs_dir / "newsdesk" / "index.html",
            "Opening live Newsdesk",
            link_for(base_url, "epi-dossier/"),
        ),
        (
            docs_dir / "newsdesk" / "latest.html",
            "Opening latest Pathogen Dispatch",
            link_for(base_url, "epi-dossier/latest.html"),
        ),
    ]
    for dest, title, target_url in redirects:
        ensure_dir(dest.parent)
        dest.write_text(live_newsdesk_redirect_html(title=title, target_url=target_url))


def import_epidossier_public(docs_dir: Path, base_url: str) -> dict[str, Any]:
    source_docs = resolve_epidossier_docs()

    app_exports_src = source_docs / "app_exports"
    app_exports_dest = docs_dir / "app_exports"
    if app_exports_dest.exists():
        shutil.rmtree(app_exports_dest)
    shutil.copytree(app_exports_src, app_exports_dest)
    sanitize_copied_app_exports(app_exports_dest)

    latest_html_dest = docs_dir / "newsdesk" / "latest.html"
    latest_html = transform_imported_html(
        (source_docs / "latest.html").read_text(), active="newsdesk", base_url=base_url
    )
    ensure_dir(latest_html_dest.parent)
    latest_html_dest.write_text(latest_html)
    import_copy(source_docs / "latest.md", docs_dir / "newsdesk" / "latest.md")

    html_pages = [
        (source_docs / "index.html", docs_dir / "newsdesk" / "index.html", "newsdesk"),
        (
            source_docs / "outbreaks.html",
            docs_dir / "newsdesk" / "outbreaks" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "outbreaks.html",
            docs_dir / "newsdesk" / "outbreaks.html",
            "newsdesk",
        ),
        (source_docs / "outbreaks.html", docs_dir / "outbreaks.html", "newsdesk"),
        (
            source_docs / "watch.html",
            docs_dir / "newsdesk" / "watch" / "index.html",
            "newsdesk",
        ),
        (source_docs / "watch.html", docs_dir / "newsdesk" / "watch.html", "newsdesk"),
        (
            source_docs / "africa.html",
            docs_dir / "newsdesk" / "africa" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "africa.html",
            docs_dir / "newsdesk" / "africa.html",
            "newsdesk",
        ),
        (
            source_docs / "asia.html",
            docs_dir / "newsdesk" / "asia" / "index.html",
            "newsdesk",
        ),
        (source_docs / "asia.html", docs_dir / "newsdesk" / "asia.html", "newsdesk"),
        (
            source_docs / "research.html",
            docs_dir / "newsdesk" / "research" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "research.html",
            docs_dir / "newsdesk" / "research.html",
            "newsdesk",
        ),
        (
            source_docs / "official.html",
            docs_dir / "newsdesk" / "official" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "official.html",
            docs_dir / "newsdesk" / "official.html",
            "newsdesk",
        ),
        (
            source_docs / "historical.html",
            docs_dir / "newsdesk" / "historical" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "historical.html",
            docs_dir / "newsdesk" / "historical.html",
            "newsdesk",
        ),
        (
            source_docs / "archive" / "index.html",
            docs_dir / "newsdesk" / "archive" / "index.html",
            "newsdesk",
        ),
        (
            source_docs / "notebook.html",
            docs_dir / "notebook" / "index.html",
            "notebook",
        ),
        (
            source_docs / "notebook.html",
            docs_dir / "newsdesk" / "notebook.html",
            "notebook",
        ),
    ]
    for src, dest, active in html_pages:
        transformed = transform_imported_html(
            src.read_text(), active=active, base_url=base_url
        )
        ensure_dir(dest.parent)
        dest.write_text(transformed)

    for source_subdir, dest_subdir, active in [
        ("stories", "stories", "newsdesk"),
        ("reference", "reference", "reference"),
    ]:
        for src in sorted((source_docs / source_subdir).glob("*.html")):
            transformed = transform_imported_html(
                src.read_text(), active=active, base_url=base_url
            )
            dest = docs_dir / dest_subdir / src.name
            ensure_dir(dest.parent)
            dest.write_text(transformed)
            legacy_dest = docs_dir / "newsdesk" / source_subdir / src.name
            ensure_dir(legacy_dest.parent)
            legacy_dest.write_text(transformed)

    dated_source_root = source_docs / "2026"
    if dated_source_root.exists():
        for src in dated_source_root.rglob("*"):
            if not src.is_file():
                continue
            rel = src.relative_to(source_docs)
            dest = docs_dir / "newsdesk" / rel
            if src.suffix == ".html":
                transformed = transform_imported_html(
                    src.read_text(), active="newsdesk", base_url=base_url
                )
                ensure_dir(dest.parent)
                dest.write_text(transformed)
            else:
                import_copy(src, dest)

    ensure_archived_story_placeholders(docs_dir, base_url)
    sync_legacy_newsdesk_app_exports(docs_dir)
    latest = sanitize_public_copy(load_json(app_exports_dest / "latest.json"))
    return latest


ATLAS_OVERLAY_RE = re.compile(
    r'\s*<style id="eoe-atlas-overlay-style">.*?</style>|\s*<div id="eoe-atlas-overlay">.*?</div>',
    re.S,
)


def atlas_overlay_html(
    *,
    home_href,
    tools_href,
    newsdesk_href,
    essays_href,
    top="18px",
    links_top=None,
    extra_css="",
):
    from .site_exhibits import exhibit_nav

    return "", exhibit_nav(home_href, tools_href, newsdesk_href, essays_href)


def inject_atlas_overlay(
    index_path: Path,
    *,
    home_href: str,
    tools_href: str,
    newsdesk_href: str,
    essays_href: str,
    top: str = "18px",
    links_top: str | None = None,
    overlay_extra_css: str = "",
) -> None:
    from .site_exhibits import strip_exhibit_nav

    html_text = strip_exhibit_nav(ATLAS_OVERLAY_RE.sub("", index_path.read_text()))
    html_text = ensure_meta_description(
        html_text,
        "Interactive atlas from The Edge of Epidemiology.",
    )
    overlay, nav = atlas_overlay_html(
        home_href=home_href,
        tools_href=tools_href,
        newsdesk_href=newsdesk_href,
        essays_href=essays_href,
        top=top,
        links_top=links_top,
        extra_css=overlay_extra_css,
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
        tools_href="../../tools/index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="14px",
        links_top="14px",
        overlay_extra_css="""
  @media (min-width: 981px) {
    html:not(.recording-mode):not(.youtube-mode) {
      --atlas-public-chrome-top: 56px;
    }
  }
  @media (max-width: 980px) {
    html:not(.recording-mode):not(.youtube-mode) {
      --atlas-public-chrome-top: 126px;
    }
  }
  @media (min-width: 981px) and (max-width: 1320px) {
    #eoe-atlas-overlay-brand .byline {
      display: none;
    }
    #eoe-atlas-overlay-links a {
      padding: 7px 10px;
      font-size: 11px;
    }
  }
""",
    )


PATHOGEN_CONFIDENCE_ALIASES = {
    "strong": "high",
    "mixed": "moderate",
    "weak": "low",
}


def normalize_tool_confidence(value: Any) -> str:
    clean = str(value or "moderate").strip().lower()
    return PATHOGEN_CONFIDENCE_ALIASES.get(
        clean,
        clean
        if clean in {"high", "moderate", "low", "contested", "speculative"}
        else "moderate",
    )


def normalize_pathogen_claims(entry: dict[str, Any]) -> None:
    evidence_ids = [
        citation.get("id")
        for citation in entry.get("citations", [])
        if citation.get("id")
    ] + [
        citation.get("id")
        for citation in entry.get("withheld_citations", [])
        if citation.get("id")
    ]

    origin = entry.get("origin_claim")
    if isinstance(origin, dict):
        origin["confidence"] = normalize_tool_confidence(origin.get("confidence"))
        if not origin.get("citation_ids") and evidence_ids:
            origin["citation_ids"] = evidence_ids[:3]

    for route in entry.get("spread_routes", []):
        if isinstance(route, dict):
            route["confidence"] = normalize_tool_confidence(route.get("confidence"))

    for layer in entry.get("geography_layers", []):
        if isinstance(layer, dict):
            layer["confidence"] = normalize_tool_confidence(layer.get("confidence"))
            if layer["confidence"] in {"low", "contested", "speculative"} and not (
                layer.get("uncertainty_note")
                or layer.get("evidence_note")
                or layer.get("note")
            ):
                layer["evidence_note"] = (
                    "Low-confidence or schematic geography; keep the uncertainty visible and do not treat this layer as a precise range map."
                )


def prepared_pathogen_atlas_data(
    atlas_export: dict[str, Any], *, link_prefix: str
) -> dict[str, Any]:
    raw_entries = atlas_export.get("atlas", [])
    prepared_entries = []

    def rewrite_entry_links(entry: dict[str, Any], color: str) -> dict[str, Any]:
        prepared = dict(entry)
        prepared["color"] = color
        category, category_label = PATHOGEN_ATLAS_CATEGORIES.get(
            prepared.get("slug"),
            (
                prepared.get("category") or "other",
                prepared.get("category_label") or "Other",
            ),
        )
        category, category_label = PATHOGEN_ATLAS_CATEGORY_ALIASES.get(
            category, (category, category_label)
        )
        prepared["category"] = category
        prepared["category_label"] = category_label
        prepared["transmission_group"] = (
            prepared.get("transmission_group") or prepared["category_label"]
        )
        prepared["status_label"] = PATHOGEN_STATUS_LABELS.get(
            prepared.get("status"), "Curated"
        )
        prepared["writing_state_label"] = PATHOGEN_WRITING_LABELS.get(
            prepared.get("writing_state"), "Writing state pending"
        )
        public_citations, withheld_citations = public_pathogen_citations(prepared)
        prepared["citations"] = public_citations
        prepared["citation_count"] = len(public_citations)
        if withheld_citations:
            prepared["withheld_citations"] = withheld_citations
            prepared["citation_verification_note"] = (
                "Some DOI citations are withheld from the public atlas until manually verified."
            )
        normalize_pathogen_claims(prepared)
        reference_path = prepared.get("reference_web_path") or prepared.get(
            "reference_url"
        )
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
        prepared["variants"] = [
            rewrite_entry_links(variant, color)
            for variant in prepared.get("variants", [])
        ]
        return prepared

    for entry in raw_entries:
        color = PATHOGEN_ATLAS_COLORS.get(entry.get("slug"), "#c9a84c")
        prepared = rewrite_entry_links(entry, color)
        prepared_entries.append(prepared)

    payload = {
        "entries": prepared_entries,
        "generated_at": atlas_export.get("generated_at"),
        "atlas_count": len(prepared_entries),
    }
    for key in (
        "schema_version",
        "description",
        "confidence_legend",
        "evidence_types",
        "source_audit",
        "deferred_profiles",
    ):
        if key in atlas_export:
            payload[key] = atlas_export[key]
    return payload


def write_pathogen_atlas_payload(
    target_root: Path, atlas_export: dict[str, Any], *, base_url: str, link_prefix: str
) -> None:
    data_dir = target_root / "data"
    ensure_dir(data_dir)
    data_payload = prepared_pathogen_atlas_data(atlas_export, link_prefix=link_prefix)
    data_text = (
        f"window.PATHOGEN_ATLAS_BASE_URL = {json.dumps(base_url)};\n"
        f"window.PATHOGEN_ATLAS_DATA = {json.dumps(data_payload, indent=2)};\n"
    )
    (data_dir / "pathogen_atlas_data.js").write_text(data_text)


def merge_pathogen_atlas_overrides(
    atlas_export: dict[str, Any], overrides: dict[str, Any]
) -> None:
    """Apply local curation fields to imported atlas entries without editing generated exports."""
    scalar_fields = ("summary", "why_it_matters", "atlas_scope", "origin_claim")
    list_fields = ("modern_echoes", "framing_traps")
    by_slug = {entry.get("slug"): entry for entry in atlas_export.get("atlas", [])}
    for override in overrides.get("atlas", []):
        slug = override.get("slug")
        entry = by_slug.get(slug)
        if not entry:
            continue
        for field in scalar_fields:
            if field in override:
                entry[field] = override[field]
        for field in list_fields:
            if field in override:
                entry[field] = override[field]
        if override.get("geography_layers") and not entry.get("geography_layers"):
            entry["geography_layers"] = override["geography_layers"]
        if override.get("citations"):
            existing_ids = {
                citation.get("id") for citation in entry.get("citations", [])
            }
            entry.setdefault("citations", [])
            for citation in override["citations"]:
                if citation.get("id") not in existing_ids:
                    entry["citations"].append(citation)
                    existing_ids.add(citation.get("id"))


def import_external_pathogen(docs_dir: Path, base_url: str) -> None:
    src_root = PROJECT_ROOT / "external" / "pathogen_atlas"
    dest_root = docs_dir / "atlases" / "pathogen"
    source_backed_path = src_root / "source_backed_profiles.json"
    if source_backed_path.exists():
        atlas_export = load_json(source_backed_path)
    else:
        atlas_export_path = docs_dir / "app_exports" / "atlas.json"
        atlas_export = load_json(atlas_export_path)
        core_overrides_path = src_root / "core_geography_overrides.json"
        if core_overrides_path.exists():
            merge_pathogen_atlas_overrides(atlas_export, load_json(core_overrides_path))
        extra_pathogens_path = src_root / "extra_pathogens.json"
        if extra_pathogens_path.exists():
            extra_export = load_json(extra_pathogens_path)
            known_slugs = {entry.get("slug") for entry in atlas_export.get("atlas", [])}
            atlas_export["atlas"] = atlas_export.get("atlas", []) + [
                entry
                for entry in extra_export.get("atlas", [])
                if entry.get("slug") not in known_slugs
            ]

    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(
        src_root,
        dest_root,
        ignore=shutil.ignore_patterns(
            "catalog", "extra_pathogens.json", "core_geography_overrides.json"
        ),
    )
    write_pathogen_atlas_payload(
        dest_root, atlas_export, base_url=base_url, link_prefix="../../"
    )
    inject_atlas_overlay(
        dest_root / "index.html",
        home_href="../../index.html",
        tools_href="../../tools/index.html",
        newsdesk_href="../../newsdesk/index.html",
        essays_href="../../essays/index.html",
        top="8px",
        links_top="8px",
    )


def import_external_viking(docs_dir, base_url):
    from .curated_exhibits import write_record_exhibit

    write_record_exhibit("viking", docs_dir / "atlases" / "viking", PROJECT_ROOT)


def import_external_revolutionary_war_atlas(docs_dir, base_url):
    from .curated_exhibits import write_record_exhibit

    destination = docs_dir / "atlases" / "revolutionary-war"
    shutil.copytree(
        PROJECT_ROOT / "external" / "revolutionary_war_atlas",
        destination,
        dirs_exist_ok=True,
    )
    write_record_exhibit("revolutionary", destination, PROJECT_ROOT)


def import_external_american_epidemic_timeline(docs_dir: Path, base_url: str) -> None:
    _ = base_url
    src_root = PROJECT_ROOT / "external" / "american_epidemic_timeline"
    dest_root = docs_dir / "tools" / "american-epidemic-timeline"
    if dest_root.exists():
        shutil.rmtree(dest_root)
    shutil.copytree(src_root, dest_root)


def import_external_histsearch(docs_dir, base_url):
    from .curated_exhibits import write_histsearch

    write_histsearch(docs_dir / "tools" / "histsearch", PROJECT_ROOT)


def copy_static_assets(docs_dir: Path) -> None:
    from .referral import build_referral

    build_referral()
    target = docs_dir / "assets"
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(ASSETS_DIR, target)
    (docs_dir / ".nojekyll").write_text("")
    (docs_dir / "CNAME").write_text(f"{PUBLIC_SITE_DOMAIN}\n")


def build_site(
    *, docs_dir: Path = DOCS_DIR, base_url: str = DEFAULT_BASE_URL
) -> dict[str, Any]:
    base_url = normalize_base_url(base_url)
    if docs_dir.exists():
        shutil.rmtree(docs_dir)
    ensure_dir(docs_dir)

    copy_static_assets(docs_dir)
    latest = import_epidossier_public(docs_dir, base_url)
    import_external_pathogen(docs_dir, base_url)
    import_external_maritime(docs_dir, base_url)
    import_external_viking(docs_dir, base_url)
    import_external_revolutionary_war_atlas(docs_dir, base_url)
    import_external_american_epidemic_timeline(docs_dir, base_url)
    import_external_histsearch(docs_dir, base_url)

    posts = load_posts_manifest(CONTENT_DIR / "posts.yml")
    public_posts = public_essay_posts(posts)
    atlases = load_atlas_registry(CONTENT_DIR / "atlases.yml")
    tools = load_tool_registry(CONTENT_DIR / "tools.yml", CONTENT_DIR / "atlases.yml")
    atlas_by_id = {entry["atlas_id"]: entry for entry in atlases}
    references = latest.get("reference", [])
    stories = latest.get("stories", [])

    from .site_images import render_image_credits

    page_specs = {
        docs_dir / "image-credits" / "index.html": render_image_credits(base_url),
        docs_dir / "index.html": render_home(public_posts, tools, latest, base_url),
        docs_dir / "essays" / "index.html": render_essays_index(public_posts, base_url),
        docs_dir / "topics" / "index.html": render_topic_hub_index(
            public_posts, base_url
        ),
        docs_dir / "tools" / "index.html": render_tools_hub(tools, base_url),
        docs_dir / "atlases" / "index.html": render_atlas_hub(atlases, base_url),
        docs_dir / "historical" / "index.html": render_historical_page(
            public_posts, atlases, base_url
        ),
        docs_dir / "methods" / "index.html": render_methods_page(base_url),
        docs_dir / "about" / "index.html": render_about_page(base_url),
        docs_dir / "opportunities" / "index.html": render_opportunities_page(base_url),
        docs_dir / "search" / "index.html": render_search_page(base_url),
        docs_dir / "reference" / "index.html": render_reference_index(
            references, base_url
        ),
        docs_dir / "stories" / "index.html": render_stories_index(stories, base_url),
    }

    for path, page_html in page_specs.items():
        ensure_dir(path.parent)
        path.write_text(page_html)

    for post in public_posts:
        path = docs_dir / "essays" / post.get("slug", "untitled") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_post_page(post, atlas_by_id, public_posts, base_url))

    for hub in TOPIC_HUBS:
        path = docs_dir / "topics" / str(hub["slug"]) / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_topic_hub_page(hub, public_posts, base_url))

    for atlas_entry in atlases:
        if atlas_entry.get("atlas_id") == "pathogen-atlas":
            continue
        if atlas_entry.get("atlas_id") == "maritime-disease-atlas":
            continue
        if atlas_entry.get("atlas_id") == "viking-health-atlas":
            continue
        if atlas_entry.get("atlas_id") == "revolutionary-war-atlas":
            continue
        path = docs_dir / atlas_entry["public_route"].strip("/") / "index.html"
        ensure_dir(path.parent)
        path.write_text(render_curated_atlas_page(atlas_entry, public_posts, base_url))

    posts_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(public_posts),
        "posts": [public_post_export(post) for post in public_posts],
    }
    atlases_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(atlases),
        "atlases": [public_tool_export(atlas) for atlas in atlases],
    }
    tools_export = {
        "generated_at": latest.get("generated_at"),
        "count": len(tools),
        "tools": [public_tool_export(tool) for tool in tools],
    }
    search_index = []
    for post in public_posts:
        search_index.append(
            {
                "title": post.get("title"),
                "display_title": post_display_title(post),
                "section": "Essay",
                "summary": post_seo_description(post),
                "url": link_for(base_url, f"essays/{post.get('slug')}/"),
                "keywords": " ".join(
                    post.get("topics", [])
                    + post.get("upstream_tags", [])
                    + [post.get("primary_keyword", ""), post_topic_cluster(post)]
                ),
            }
        )
    for hub in TOPIC_HUBS:
        search_index.append(
            {
                "title": hub["title"],
                "section": "Topic",
                "summary": hub["description"],
                "url": link_for(base_url, f"topics/{hub['slug']}/"),
                "keywords": " ".join(hub["keywords"]),
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
    for tool in tools:
        search_index.append(
            {
                "title": tool.get("title"),
                "section": "Tool",
                "summary": tool.get("summary"),
                "url": link_for(base_url, tool.get("public_route", "")),
                "keywords": " ".join(
                    tool.get("keywords", []) + [tool.get("tool_type", "")]
                ),
            }
        )
    for story in stories:
        search_index.append(
            {
                "title": story.get("display_title"),
                "section": "Newsdesk",
                "summary": story.get("latest_update_summary")
                or story.get("why_it_matters"),
                "url": link_for(base_url, story.get("story_web_path", "")),
                "keywords": " ".join(
                    story.get("claim_types", [])
                    + [story.get("primary_region", ""), story.get("country", "")]
                ),
            }
        )
    for reference in references:
        search_index.append(
            {
                "title": reference.get("name"),
                "section": "Reference",
                "summary": reference.get("why_reporters_care")
                or reference.get("atlas_summary"),
                "url": link_for(base_url, reference.get("reference_web_path", "")),
                "keywords": " ".join(
                    reference.get("categories", []) + reference.get("aliases", [])
                ),
            }
        )
    search_index.append(
        {
            "title": "Work with me",
            "section": "About",
            "summary": "Work with Devin Teichrow on epidemiology, evidence, disease history, science communication, data projects, and public-health exhibits.",
            "url": link_for(base_url, "opportunities/"),
            "keywords": "consulting collaboration epidemiology data science communication atlases public health",
        }
    )

    write_json(docs_dir / "app_exports" / "posts.json", posts_export)
    write_json(docs_dir / "app_exports" / "atlases.json", atlases_export)
    write_json(docs_dir / "app_exports" / "tools.json", tools_export)
    from .site_content import deduplicate_search_records

    write_json(
        docs_dir / "app_exports" / "search-index.json",
        deduplicate_search_records(search_index),
    )
    sync_legacy_newsdesk_app_exports(docs_dir)
    from .site_exhibits import finalize_exhibit_shells

    finalize_exhibit_shells(docs_dir, base_url)
    seo_report = finalize_seo(docs_dir, public_posts)

    return {
        "generated_at": latest.get("generated_at"),
        "posts": len(public_posts),
        "all_posts": len(posts),
        "atlases": len(atlases),
        "tools": len(tools),
        "stories": len(stories),
        "references": len(references),
        "seo": seo_report,
        "docs_dir": str(docs_dir),
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build the Edge of Epidemiology umbrella site."
    )
    parser.add_argument("--docs-dir", type=Path, default=DOCS_DIR)
    parser.add_argument("--site-base-url", default=DEFAULT_BASE_URL)
    args = parser.parse_args()
    result = build_site(docs_dir=args.docs_dir, base_url=args.site_base_url)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
