from __future__ import annotations

import json
from pathlib import Path

from src import build_site


def test_transform_imported_html_rewrites_known_paths() -> None:
    html_text = """
    <html>
      <head></head>
      <body>
        <a href="./index.html">Home</a>
        <a href="./watch.html">Watch</a>
        <a href="../reference/thing.html">Ref</a>
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
    assert 'href="/newsdesk/watch/"' in transformed
    assert 'href="/reference/thing.html"' in transformed
    assert 'fetch("/app_exports/manifest.json")' in transformed
    assert "Edge of Epidemiology" in transformed
    assert "touch-action: pan-x" in transformed
    assert "The Edge of Epidemiology" in transformed
    assert "On this page" not in transformed
    assert "56 item(s)" not in transformed
    assert "26 source(s)" not in transformed
    assert "Expanding coverage" in transformed


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

    monkeypatch.setattr(build_site, "copy_static_assets", fake_copy_static_assets)
    monkeypatch.setattr(build_site, "import_epidossier_public", fake_import_epidossier_public)
    monkeypatch.setattr(build_site, "import_external_pathogen", fake_import_external_pathogen)
    monkeypatch.setattr(build_site, "import_external_maritime", fake_import_external_maritime)
    monkeypatch.setattr(build_site, "import_external_viking", fake_import_external_viking)

    result = build_site.build_site(docs_dir=docs_dir, base_url="/")
    assert result["posts"] == 1
    assert (docs_dir / "index.html").exists()
    assert (docs_dir / "essays" / "first-post" / "index.html").exists()
    assert (docs_dir / "atlases" / "index.html").exists()
    assert (docs_dir / "historical" / "index.html").exists()
    assert (docs_dir / "app_exports" / "posts.json").exists()
    home_text = (docs_dir / "index.html").read_text()
    assert "Devin Teichrow" in home_text
    assert "Disease travels with people and the things people build" in home_text
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


def test_import_external_pathogen_writes_js_payload(tmp_path, monkeypatch) -> None:
    project_root = tmp_path / "project"
    src_root = project_root / "external" / "pathogen_atlas"
    docs_dir = tmp_path / "docs"
    src_root.mkdir(parents=True)
    (src_root / "index.html").write_text("<html><head></head><body><main id='map'></main></body></html>")

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
    index_text = built_index.read_text()
    assert 'href="../../index.html"' in index_text
    assert 'href="../index.html"' in index_text
    source_text = source_data.read_text()
    assert '"reference_href": "../../docs/reference/yellow-fever.html"' in source_text
    assert '"story_href": "../../docs/stories/demo-story.html"' in source_text
    data_text = built_data.read_text()
    assert 'window.PATHOGEN_ATLAS_BASE_URL = "/"' in data_text
    assert '"reference_href": "../../reference/yellow-fever.html"' in data_text
    assert '"story_href": "../../stories/demo-story.html"' in data_text
    assert '"slug": "urban-yellow-fever"' in data_text
    assert '"writing_state_label": "Adjacent writing"' in data_text
