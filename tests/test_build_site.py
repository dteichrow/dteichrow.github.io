from __future__ import annotations

from collections import Counter
import json
import re
from pathlib import Path

from src import build_site


def test_transform_imported_html_rewrites_known_paths() -> None:
    html_text = """
    <html>
      <head></head>
      <body>
        <a href="./index.html">Home</a>
        <a href="./outbreaks.html">Outbreak terminal</a>
        <a href="../../outbreaks.html">Deep outbreak terminal</a>
        <a href="./watch.html">Watch</a>
        <a href="../reference/thing.html">Ref</a>
        <a href="../../reference/deep.html">Deep Ref</a>
        <a href="../../stories/deep-story.html">Deep Story</a>
        <a href="../atlas.html?pathogen=cholera">Atlas Query</a>
        <a href="../archive/index.html">Archive</a>
        <nav class="section-nav panel utility-panel"><div class="section-nav-links"><a href="#one">One</a></div></nav>
        <article class="site-card feature-card">
          <h3>Story</h3>
          <div class="meta-row"><span class="badge accent">56 item(s)</span><span class="badge">26 source(s)</span><span class="badge">Expanding coverage</span><span class="badge">Global / Maritime</span></div>
        </article>
        <script>fetch("../app_exports/manifest.json")</script>
      </body>
    </html>
    """
    transformed = build_site.transform_imported_html(html_text, active="newsdesk", base_url="/")
    assert 'href="/newsdesk/"' in transformed
    assert transformed.count('href="/newsdesk/outbreaks/"') == 2
    assert 'href="/newsdesk/watch/"' in transformed
    assert 'href="/reference/thing.html"' in transformed
    assert 'href="/reference/deep.html"' in transformed
    assert 'href="/stories/deep-story.html"' in transformed
    assert 'href="/atlases/pathogen/?pathogen=cholera"' in transformed
    assert 'href="/newsdesk/archive/"' in transformed
    assert 'fetch("/app_exports/manifest.json")' in transformed
    assert '<meta name="description"' in transformed
    assert "Edge of Epidemiology" in transformed
    assert "touch-action: pan-x" in transformed
    assert "The Edge of Epidemiology" in transformed
    assert "by Devin Teichrow" in transformed
    assert 'href="/opportunities/"' in transformed
    assert "On this page" not in transformed
    assert "56 item(s)" not in transformed
    assert "26 source(s)" not in transformed
    assert "Expanding coverage" in transformed


def test_import_epidossier_public_imports_outbreak_terminal_routes(tmp_path, monkeypatch) -> None:
    source_docs = tmp_path / "source_docs"
    docs_dir = tmp_path / "docs"
    (source_docs / "app_exports").mkdir(parents=True)
    (source_docs / "archive").mkdir(parents=True)
    (source_docs / "stories").mkdir(parents=True)
    (source_docs / "reference").mkdir(parents=True)
    (source_docs / "app_exports" / "latest.json").write_text(json.dumps({"generated_at": "2026-05-19T00:00:00", "stories": [], "reference": []}))
    (source_docs / "latest.md").write_text("# Latest")
    (source_docs / "archive" / "index.html").write_text("<html><head></head><body>Archive</body></html>")
    for name in ["latest", "index", "outbreaks", "watch", "africa", "asia", "research", "official", "historical", "notebook"]:
        filename = f"{name}.html"
        if name == "latest":
            body = '<a href="./outbreaks.html">Outbreak terminal</a>'
        elif name == "outbreaks":
            body = '<h1>Outbreak Terminal</h1><a href="./index.html">Newsdesk home</a>'
        else:
            body = f"<h1>{name}</h1>"
        (source_docs / filename).write_text(f"<html><head></head><body>{body}</body></html>")
    (source_docs / "stories" / "demo-story.html").write_text('<html><head></head><body><a href="../outbreaks.html">Outbreak terminal</a></body></html>')
    (source_docs / "reference" / "ebola-virus-disease.html").write_text('<html><head></head><body><a href="../outbreaks.html">Outbreak terminal</a></body></html>')

    monkeypatch.setattr(build_site, "resolve_epidossier_docs", lambda: source_docs)

    build_site.import_epidossier_public(docs_dir, "/")

    terminal_page = docs_dir / "newsdesk" / "outbreaks" / "index.html"
    root_alias = docs_dir / "outbreaks.html"
    reference_page = docs_dir / "reference" / "ebola-virus-disease.html"
    story_page = docs_dir / "stories" / "demo-story.html"
    assert terminal_page.exists()
    assert root_alias.exists()
    assert "Outbreak Terminal" in terminal_page.read_text()
    assert 'href="/newsdesk/outbreaks/"' in reference_page.read_text()
    assert 'href="/newsdesk/outbreaks/"' in story_page.read_text()
    assert 'href="/newsdesk/"' in root_alias.read_text()


def test_build_site_writes_core_routes(tmp_path, monkeypatch) -> None:
    content_dir = tmp_path / "content"
    assets_dir = tmp_path / "assets"
    docs_dir = tmp_path / "docs"
    content_dir.mkdir()
    assets_dir.mkdir()
    (assets_dir / "site.css").write_text("body{}")
    (assets_dir / "site.js").write_text("console.log('ok');")
    (content_dir / "posts.yml").write_text(
        """
posts:
  - substack_id: 1
    slug: first-post
    title: First post
    date: 2026-05-10
    canonical_url: https://theedgeofepidemiology.substack.com/p/first-post
    excerpt: First excerpt
    cover_image: https://images.example/cover.jpg
    upstream_tags: [History]
    source_mode: substack_page
    first_seen_at: 2026-05-10T00:00:00+00:00
    last_synced_at: 2026-05-10T00:00:00+00:00
    status: summary_only
    dek: ""
    topics: [History]
    series: []
    seo_title: First Local SEO Title
    seo_description: A local SEO description for the first test post that is specific enough to avoid generic metadata regressions.
    primary_keyword: first test epidemiology post
    topic_cluster: historical-epidemiology
    indexing_strategy: noindex_stub
    related_atlases: [revolutionary-war-atlas]
    related_reference_slugs: []
    related_story_ids: []
    search_excerpt: First excerpt
    local_body_path: ""
    hero_mode: cover
    notes: ""
"""
    )
    (content_dir / "atlases.yml").write_text(
        """
atlases:
  - atlas_id: revolutionary-war-atlas
    title: Revolutionary War Disease Atlas
    status_label: Curated section
    summary: Colonial and Revolutionary-era disease ecology.
    evidence_model: Historical synthesis
    public_route: atlases/revolutionary-war/
    launch_priority: next up
    keywords: [revolution]
    long_note: Built from related essays first.
  - atlas_id: maritime-disease-atlas
    title: Maritime Disease Atlas
    status_label: Live atlas
    summary: Sea routes and disease ecology.
    evidence_model: Curated scenarios
    public_route: atlases/maritime/
    launch_priority: flagship
    keywords: [maritime]
"""
    )

    monkeypatch.setattr(build_site, "CONTENT_DIR", content_dir)
    monkeypatch.setattr(build_site, "ASSETS_DIR", assets_dir)

    def fake_copy_static_assets(target_docs: Path) -> None:
        (target_docs / "assets").mkdir(parents=True, exist_ok=True)
        (target_docs / "assets" / "site.css").write_text("body{}")
        (target_docs / "assets" / "site.js").write_text("console.log('ok');")
        (target_docs / ".nojekyll").write_text("")

    def fake_import_epidossier_public(target_docs: Path, base_url: str) -> dict:
        app_exports = target_docs / "app_exports"
        app_exports.mkdir(parents=True, exist_ok=True)
        latest = {
            "generated_at": "2026-05-10T00:00:00",
            "stories": [
                {
                    "display_title": "Demo story",
                    "latest_update_summary": "A major live file.",
                    "story_web_path": "stories/demo-story.html",
                    "status": "active_investigation",
                    "primary_region": "North America",
                    "country": "United States",
                }
            ],
            "reference": [
                {
                    "name": "Yellow fever",
                    "reference_web_path": "reference/yellow-fever.html",
                    "why_reporters_care": "A classic port-city disease.",
                    "categories": ["Vector-borne"],
                    "evidence_type": "reference",
                }
            ],
        }
        (app_exports / "latest.json").write_text(json.dumps(latest))
        (app_exports / "atlas.json").write_text(json.dumps({"atlas": []}))
        (app_exports / "manifest.json").write_text(json.dumps({"latest_run_id": "demo"}))
        (target_docs / "newsdesk").mkdir(parents=True, exist_ok=True)
        (target_docs / "newsdesk" / "index.html").write_text("<html><body>Newsdesk</body></html>")
        (target_docs / "notebook").mkdir(parents=True, exist_ok=True)
        (target_docs / "notebook" / "index.html").write_text("<html><body>Notebook</body></html>")
        (target_docs / "stories").mkdir(parents=True, exist_ok=True)
        (target_docs / "stories" / "demo-story.html").write_text("<html><body>Story</body></html>")
        (target_docs / "reference").mkdir(parents=True, exist_ok=True)
        (target_docs / "reference" / "yellow-fever.html").write_text("<html><body>Ref</body></html>")
        return latest

    def fake_import_external_pathogen(target_docs: Path, base_url: str) -> None:
        path = target_docs / "atlases" / "pathogen" / "index.html"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("<html><body>Pathogen atlas</body></html>")

    def fake_import_external_maritime(target_docs: Path, base_url: str) -> None:
        path = target_docs / "atlases" / "maritime" / "index.html"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("<html><body>Maritime</body></html>")

    def fake_import_external_viking(target_docs: Path, base_url: str) -> None:
        path = target_docs / "atlases" / "viking" / "index.html"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("<html><body>Viking</body></html>")

    def fake_import_external_revolutionary_war_atlas(target_docs: Path, base_url: str) -> None:
        path = target_docs / "atlases" / "revolutionary-war" / "index.html"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("<html><body>Revolutionary War atlas</body></html>")

    monkeypatch.setattr(build_site, "copy_static_assets", fake_copy_static_assets)
    monkeypatch.setattr(build_site, "import_epidossier_public", fake_import_epidossier_public)
    monkeypatch.setattr(build_site, "import_external_pathogen", fake_import_external_pathogen)
    monkeypatch.setattr(build_site, "import_external_maritime", fake_import_external_maritime)
    monkeypatch.setattr(build_site, "import_external_viking", fake_import_external_viking)
    monkeypatch.setattr(build_site, "import_external_revolutionary_war_atlas", fake_import_external_revolutionary_war_atlas)

    result = build_site.build_site(docs_dir=docs_dir, base_url="/")
    assert result["posts"] == 1
    assert result["seo"]["html_pages"] >= 20
    assert result["seo"]["indexable_pages"] >= 10
    assert result["seo"]["noindex_pages"] >= 2
    assert (docs_dir / "index.html").exists()
    assert (docs_dir / "essays" / "first-post" / "index.html").exists()
    assert (docs_dir / "topics" / "index.html").exists()
    assert (docs_dir / "topics" / "historical-epidemiology" / "index.html").exists()
    assert (docs_dir / "atlases" / "index.html").exists()
    revolutionary_text = (docs_dir / "atlases" / "revolutionary-war" / "index.html").read_text()
    assert "Revolutionary War atlas" in revolutionary_text
    assert "Revolutionary War Disease Atlas | Edge of Epidemiology" in revolutionary_text
    assert (docs_dir / "historical" / "index.html").exists()
    assert (docs_dir / "opportunities" / "index.html").exists()
    assert (docs_dir / "app_exports" / "posts.json").exists()
    assert (docs_dir / "CNAME").read_text() == "devinteichrow.com\n"
    assert (docs_dir / "robots.txt").exists()
    assert (docs_dir / "sitemap.xml").exists()
    home_text = (docs_dir / "index.html").read_text()
    assert "Devin Teichrow" in home_text
    assert "Disease travels with people and the things people build" in home_text
    assert '<h1 class="hero-title">' in home_text
    assert '<h1 class="site-brand">' not in home_text
    assert '<link rel="canonical" href="https://devinteichrow.com/" />' in home_text
    assert '<meta property="og:title" content="The Edge of Epidemiology | Devin Teichrow" />' in home_text
    assert '<meta name="twitter:card" content="summary_large_image" />' in home_text
    assert '<script type="application/ld+json" data-eoe-seo>' in home_text
    assert "UCLA-trained epidemiologist and neuroscience researcher at UC Irvine" in home_text
    assert "hero-notebook" not in home_text
    assert "hero-status-line" in home_text
    assert "hero-status-label" in home_text
    assert "newsdesk-panel" in home_text
    assert "atlas-panel" in home_text
    assert "story-card" in home_text
    assert "atlas-card" in home_text
    assert "essay-card" in home_text
    assert "essay-card-featured" in home_text
    assert "https://images.example/cover.jpg" in home_text
    assert "reference-card" in home_text
    assert "Read the essays" in home_text
    assert 'href="/opportunities/"' in home_text
    assert "Selected projects, collaborations, and commissions" in home_text
    assert "devinteichrow@gmail.com" in home_text
    assert "site-brand-byline" in home_text
    assert "by Devin Teichrow" in home_text
    assert "Unified site" not in home_text
    assert 'button primary' not in home_text
    assert "site-header-inner" in home_text
    assert home_text.index('<header class="site-header">') < home_text.index('<main class="page">')
    essays_text = (docs_dir / "essays" / "index.html").read_text()
    assert "essay-card-featured" in essays_text
    assert "https://images.example/cover.jpg" in essays_text
    about_text = (docs_dir / "about" / "index.html").read_text()
    assert "About Devin Teichrow and The Edge of Epidemiology" in about_text
    assert "I’m Devin Teichrow, an epidemiologist based at the University of California, Irvine" in about_text
    assert "plague outbreaks during war" in about_text
    assert "The Edge of Epidemiology on Substack" in about_text
    assert "diseases do not move only through bodies" not in about_text
    opportunities_text = (docs_dir / "opportunities" / "index.html").read_text()
    assert "Bring me the projects where disease, data, history, and public understanding collide." in opportunities_text
    assert "devinteichrow@gmail.com" in opportunities_text
    assert "https://x.com/edgeofepi" in opportunities_text
    assert "https://www.instagram.com/edgeofepi/" in opportunities_text
    assert "https://www.linkedin.com/in/devin-teichrow-msc-938942254" in opportunities_text
    assert "https://medium.com/@EdgeofEpi" in opportunities_text
    assert "The Edge of Epidemiology" in opportunities_text
    assert "Domain direction: use devinteichrow.com" in opportunities_text
    assert "youtube.com" not in opportunities_text
    assert opportunities_text.count('class="opportunities-section"') == 0
    assert opportunities_text.count('class="opportunities-showcase"') == 1
    assert "Evidence and analysis" in opportunities_text
    assert "Science communication" in opportunities_text
    assert "Interactive exhibits and atlases" in opportunities_text
    assert "Talks, workshops, and teaching" not in opportunities_text
    assert "devinteichrow.com" in opportunities_text
    post_text = (docs_dir / "essays" / "first-post" / "index.html").read_text()
    assert "First Local SEO Title" in post_text
    assert '<meta name="robots" content="noindex,follow" />' in post_text
    assert '<link rel="canonical" href="https://devinteichrow.com/essays/first-post/" />' in post_text
    assert "Contents" in post_text
    assert "Archive note" in post_text
    assert "This page keeps the essay connected to related topics, maps, and reference pages" in post_text
    topic_text = (docs_dir / "topics" / "historical-epidemiology" / "index.html").read_text()
    assert '<link rel="canonical" href="https://devinteichrow.com/topics/historical-epidemiology/" />' in topic_text
    assert "First Local SEO Title" in topic_text
    robots_text = (docs_dir / "robots.txt").read_text()
    assert "Disallow: /app_exports/" in robots_text
    assert "Sitemap: https://devinteichrow.com/sitemap.xml" in robots_text
    sitemap_text = (docs_dir / "sitemap.xml").read_text()
    assert "<loc>https://devinteichrow.com/</loc>" in sitemap_text
    assert "<loc>https://devinteichrow.com/topics/historical-epidemiology/</loc>" in sitemap_text
    assert "https://devinteichrow.com/search/" not in sitemap_text
    assert "https://devinteichrow.com/essays/first-post/" not in sitemap_text

    indexable_titles = []
    for html_path in sorted(docs_dir.rglob("*.html")):
        page_text = html_path.read_text()
        assert '<link rel="canonical" href="' in page_text
        assert '<meta name="description" content="' in page_text
        assert '<meta property="og:title" content="' in page_text
        assert '<meta property="og:description" content="' in page_text
        assert '<meta property="og:url" content="' in page_text
        assert '<meta name="twitter:title" content="' in page_text
        assert '<meta name="twitter:description" content="' in page_text
        assert '<script type="application/ld+json" data-eoe-seo>' in page_text

        description_match = re.search(r'<meta name="description" content="([^"]+)"', page_text)
        assert description_match is not None
        assert description_match.group(1) not in build_site.GENERIC_DESCRIPTIONS

        title_match = re.search(r"<title>(.*?)</title>", page_text, flags=re.S)
        assert title_match is not None
        title = re.sub(r"\s+", " ", title_match.group(1)).strip()
        assert title

        route = build_site.route_for_html_path(html_path, docs_dir)
        url = build_site.public_url_for_route(route)
        if '<meta name="robots" content="noindex,follow" />' not in page_text:
            assert f"<loc>{url}</loc>" in sitemap_text
            indexable_titles.append(title)
        else:
            assert f"<loc>{url}</loc>" not in sitemap_text

    duplicate_titles = [title for title, count in Counter(indexable_titles).items() if count > 1]
    assert duplicate_titles == []


def test_import_external_pathogen_writes_js_payload(tmp_path, monkeypatch) -> None:
    project_root = tmp_path / "project"
    src_root = project_root / "external" / "pathogen_atlas"
    docs_dir = tmp_path / "docs"
    src_root.mkdir(parents=True)
    (src_root / "index.html").write_text("<html><head></head><body><main id='map'></main></body></html>")
    (src_root / "extra_pathogens.json").write_text(json.dumps({"atlas": []}))
    (src_root / "core_geography_overrides.json").write_text(
        json.dumps(
            {
                "atlas": [
                    {
                        "slug": "yellow-fever",
                        "citations": [
                            {
                                "id": "official-geo-source",
                                "short_citation": "WHO. Yellow fever fixture.",
                                "url": "https://www.who.int/news-room/fact-sheets/detail/yellow-fever",
                                "claim_supported": "Should be merged into the imported core entry.",
                            }
                        ],
                        "geography_layers": [
                            {
                                "layer_id": "yellow-fever-fixture-zone",
                                "label": "Yellow fever fixture zone",
                                "layer_type": "endemic_zone",
                                "geometry_type": "world",
                                "confidence": "moderate",
                                "narrative": "Fixture geography layer.",
                                "citation_ids": ["official-geo-source"],
                            }
                        ],
                    }
                ]
            }
        )
    )
    (src_root / "catalog").mkdir()
    (src_root / "catalog" / "drafts.json").write_text(json.dumps({"drafts": []}))

    app_exports = docs_dir / "app_exports"
    app_exports.mkdir(parents=True)
    (app_exports / "atlas.json").write_text(
        json.dumps(
            {
                "generated_at": "2026-05-10T00:00:00",
                "atlas": [
                    {
                        "slug": "yellow-fever",
                        "name": "Yellow fever",
                        "status": "consensus",
                        "writing_state": "direct",
                        "reference_web_path": "reference/yellow-fever.html",
                        "related_stories": [
                            {
                                "display_title": "Demo story",
                                "story_web_path": "stories/demo-story.html",
                            }
                        ],
                        "citations": [
                            {
                                "id": "fake-doi",
                                "short_citation": "A fake DOI fixture.",
                                "url": "https://doi.org/10.1234/fake-fixture",
                                "claim_supported": "Should not be publicly linked.",
                            },
                            {
                                "id": "official-source",
                                "short_citation": "CDC. Yellow fever fixture.",
                                "url": "https://www.cdc.gov/yellow-fever/index.html",
                                "claim_supported": "Should remain publicly linked.",
                            },
                        ],
                        "variants": [
                            {
                                "slug": "urban-yellow-fever",
                                "name": "Urban yellow fever",
                                "status": "mixed",
                                "writing_state": "adjacent",
                                "reference_web_path": "reference/yellow-fever.html",
                                "related_stories": [
                                    {
                                        "display_title": "Variant story",
                                        "story_web_path": "stories/demo-story.html",
                                    }
                                ],
                            }
                        ],
                    }
                ],
            }
        )
    )

    monkeypatch.setattr(build_site, "PROJECT_ROOT", project_root)
    build_site.import_external_pathogen(docs_dir, "/")

    built_index = docs_dir / "atlases" / "pathogen" / "index.html"
    built_data = docs_dir / "atlases" / "pathogen" / "data" / "pathogen_atlas_data.js"
    source_data = src_root / "data" / "pathogen_atlas_data.js"
    assert built_index.exists()
    assert built_data.exists()
    assert source_data.exists()
    assert not (docs_dir / "atlases" / "pathogen" / "catalog").exists()
    assert not (docs_dir / "atlases" / "pathogen" / "extra_pathogens.json").exists()
    index_text = built_index.read_text()
    assert "eoe-atlas-overlay-brand" in index_text
    assert "by Devin Teichrow" in index_text
    assert 'href="../../index.html"' in index_text
    assert 'href="../../tools/index.html"' in index_text
    assert ">Exhibits</a>" in index_text
    source_text = source_data.read_text()
    assert '"reference_href": "../../docs/reference/yellow-fever.html"' in source_text
    assert '"story_href": "../../docs/stories/demo-story.html"' in source_text
    assert "https://doi.org/10.1234/fake-fixture" not in source_text
    assert "DOI citations are withheld" in source_text
    assert "https://www.cdc.gov/yellow-fever/index.html" in source_text
    assert "official-geo-source" in source_text
    assert "yellow-fever-fixture-zone" in source_text
    data_text = built_data.read_text()
    assert 'window.PATHOGEN_ATLAS_BASE_URL = "/"' in data_text
    assert '"reference_href": "../../reference/yellow-fever.html"' in data_text
    assert '"story_href": "../../stories/demo-story.html"' in data_text
    assert '"slug": "urban-yellow-fever"' in data_text
    assert '"writing_state_label": "Adjacent writing"' in data_text
    assert "https://doi.org/10.1234/fake-fixture" not in data_text
    assert "DOI citations are withheld" in data_text
    assert "official-geo-source" in data_text
    assert "yellow-fever-fixture-zone" in data_text


def test_import_external_revolutionary_war_atlas_copies_bundle(tmp_path, monkeypatch) -> None:
    project_root = tmp_path / "project"
    src_root = project_root / "external" / "revolutionary_war_atlas"
    docs_dir = tmp_path / "docs"
    src_root.mkdir(parents=True)
    (src_root / "index.html").write_text("<html><body>Revolutionary War Battle & Disease Atlas</body></html>")
    (src_root / "assets").mkdir()
    (src_root / "assets" / "fixture.txt").write_text("asset")

    monkeypatch.setattr(build_site, "PROJECT_ROOT", project_root)
    build_site.import_external_revolutionary_war_atlas(docs_dir, "/")

    dest_root = docs_dir / "atlases" / "revolutionary-war"
    assert (dest_root / "index.html").read_text() == "<html><body>Revolutionary War Battle & Disease Atlas</body></html>"
    assert (dest_root / "assets" / "fixture.txt").read_text() == "asset"


def test_pathogen_atlas_filters_do_not_fallback_to_all_entries() -> None:
    atlas_html = (build_site.PROJECT_ROOT / "external" / "pathogen_atlas" / "index.html").read_text()
    assert "return scoped.length ? scoped : ATLAS_ENTRIES" not in atlas_html
    assert "function renderTypeSelectOptions()" in atlas_html
    assert "No diseases match selected filters" in atlas_html


def test_maritime_atlas_has_video_mode_contract() -> None:
    atlas_html = (build_site.PROJECT_ROOT / "external" / "maritime_disease_atlas" / "index.html").read_text()
    assert 'id="cinema-backdrop"' in atlas_html
    assert "Guided Tour" in atlas_html
    assert "Presentation Mode" in atlas_html
    assert "Atmosphere Off" in atlas_html
    assert "Sources / Credits" in atlas_html
    assert "How to use this exhibit" in atlas_html
    assert "Vector / port" in atlas_html
    assert "Provisions" in atlas_html
    assert "Crowding" in atlas_html
    assert "Coercion / piracy" in atlas_html
    assert "function playTour()" in atlas_html
    assert 'queryFlag("video", "recording", "record")' in atlas_html
    assert "function setPresentationMode" in atlas_html
    assert ".recording-mode #eoe-atlas-overlay" in atlas_html
    assert "MARITIME_ATLAS_CONTROLS" in atlas_html
    assert "contextZoom" in atlas_html
    assert "CINEMA_REELS" in atlas_html
    assert "cinema-caption-credit" in atlas_html
    assert "pyle_pirate_captain.jpg" in atlas_html
    assert "blackbeard_capture_ferris.jpg" in atlas_html
    assert "pyle_henry_morgan_recruiting.jpg" in atlas_html
    assert "ann_bonny_mary_read.jpg" in atlas_html
    assert "cinemaSecondPresence" in atlas_html
    assert "cinemaPrimaryPresence" in atlas_html
    assert ".recording-mode #cinema-backdrop.open.has-secondary #cinema-backdrop-image" in atlas_html
    assert "route_pirate_network" in atlas_html
    assert 'id="video-pause-btn"' in atlas_html
    assert 'id="sound-btn"' in atlas_html
    assert 'id="video-sound-btn"' in atlas_html
    assert 'id="sources-drawer"' in atlas_html
    assert 'id="story-evidence"' in atlas_html
    assert "function evidenceHtml" in atlas_html
    assert "SOURCE_CATALOG" in atlas_html
    assert "buildSourceCatalog" in atlas_html
    assert "renderSourceCatalog" in atlas_html
    assert "stepHoldMs" in atlas_html
    assert "bindPauseControl" in atlas_html
    assert "createSoundDesign" in atlas_html
    assert "soundProfileForStep" in atlas_html
    assert "setSoundEnabled" in atlas_html
    assert 'queryFlag("sound", "audio")' in atlas_html
    assert "soundStatus" in atlas_html
    assert "dataset.soundScene" in atlas_html
    assert "dataset.soundState" in atlas_html
    assert "tonalOscillators: 0" in atlas_html
    assert "createOscillator" not in atlas_html
    assert "dampedOsc" not in atlas_html
    assert "pauseStepProgress" in atlas_html
    assert "animation-play-state: paused" in atlas_html
    assert "steerage_children_friedrich_der_grosse.jpg" in atlas_html
    assert "cook_at_galley_hatch.jpg" in atlas_html
    assert "sailors_drinking_tunbridge_waters.jpg" in atlas_html
    assert "barrels_on_savannah_docks_nara.jpg" in atlas_html
    assert "National Archives via Wikimedia Commons, public domain" in atlas_html
    assert "typhoid_prevention_1908.jpg" not in atlas_html
    assert "secondary:" not in atlas_html.split("yellow_fever: [", 1)[1].split("malaria: [", 1)[0]
    assert "secondary:" not in atlas_html.split("ship_fever: [", 1)[1].split("flux: [", 1)[0]
    assert "secondary:" not in atlas_html.split("flux: [", 1)[1].split("typhoid: [", 1)[0]
    assert "secondary:" not in atlas_html.split("typhoid: [", 1)[1].split("smallpox: [", 1)[0]


def test_maritime_atlas_public_exhibit_metadata_and_video_package() -> None:
    tools_text = (build_site.PROJECT_ROOT / "content" / "tools.yml").read_text()
    build_text = (build_site.PROJECT_ROOT / "src" / "build_site.py").read_text()
    video_package = (build_site.PROJECT_ROOT / "notes" / "maritime-disease-atlas-youtube-guided-tour.md").read_text()
    assert "map-first digital exhibit" in tools_text
    assert "guided-tour and presentation modes" in tools_text
    assert "archival sources" in build_text
    assert "Final narration: Devin" in video_package
    assert "AI voice: scratch timing only" in video_package
    assert "?youtube=1&scenario=<scenario_id>&pace=2.05" in video_package


def test_pathogen_atlas_renders_geography_layers() -> None:
    atlas_html = (build_site.PROJECT_ROOT / "external" / "pathogen_atlas" / "index.html").read_text()
    assert "Geographic extent" in atlas_html
    assert "Geography interpretation" in atlas_html
    assert "Reviewed geography" in atlas_html
    assert "function drawGeographyLayer" in atlas_html
    assert "function ellipseLatLngs" in atlas_html
    assert "function geographyTypeColor" in atlas_html
    assert "geography_layers" in atlas_html
    assert "Endemic zone" in atlas_html
    assert "Reservoir ecology" in atlas_html


def test_pathogen_atlas_has_map_mode_and_search_controls() -> None:
    atlas_html = (build_site.PROJECT_ROOT / "external" / "pathogen_atlas" / "index.html").read_text()
    assert 'id="map-mode-select"' in atlas_html
    assert '<option value="routes">Routes</option>' in atlas_html
    assert '<option value="geography">Extent</option>' in atlas_html
    assert '<option value="evidence">Evidence</option>' in atlas_html
    assert 'id="pathogen-search"' in atlas_html
    assert 'id="filter-count"' in atlas_html
    assert "function mapModeLabel" in atlas_html
    assert "function normalizedSearchText" in atlas_html


def test_archived_story_placeholders_cover_stale_archive_links(tmp_path) -> None:
    docs_dir = tmp_path / "docs"
    archive_page = docs_dir / "newsdesk" / "2026" / "05" / "2026-05-08.html"
    archive_page.parent.mkdir(parents=True)
    archive_page.write_text(
        '<a href="/stories/story_abc123-tuberculosis-and-antimicrobial-resistance.html">Old story</a>'
    )

    build_site.ensure_archived_story_placeholders(docs_dir, "/")

    placeholder = docs_dir / "stories" / "story_abc123-tuberculosis-and-antimicrobial-resistance.html"
    assert placeholder.exists()
    text = placeholder.read_text()
    assert "Archived story file" in text
    assert "Tuberculosis And Antimicrobial Resistance" in text
