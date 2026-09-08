"""Render source-linked record exhibits and research dossiers as static HTML."""

import csv
import html
import io
import json
from .common import PROJECT_ROOT, ensure_dir


def load_sources(root=PROJECT_ROOT):
    return {
        s["id"]: s
        for s in json.loads((root / "data/exhibits/sources.json").read_text())
    }


def source_list(ids, sources):
    return (
        '<ul class="record-sources">'
        + "".join(
            f'<li><a href="{html.escape(sources[id]["url"])}">{html.escape(sources[id]["title"])}</a><small>{html.escape(sources[id]["review_status"])} · Source date: {html.escape(sources[id]["published_date"] or "not established")}</small></li>'
            for id in ids
        )
        + "</ul>"
    )


def count(value, status):
    if value is None:
        return {
            "missing": "Not recorded in this dataset",
            "not_applicable": "Not applicable",
        }.get(status, "Unknown")
    return ("Estimated: " if status == "estimated" else "") + f"{value:,}"


def record_body(p, kind, sources):
    if kind == "viking":
        facts = f"<dl><div><dt>Sample</dt><dd>{str(p['sample_size']) + ' ' if p['sample_size'] is not None else ''}{html.escape(p['sample_unit'])}</dd></div><div><dt>Evidence</dt><dd>{html.escape(p['category'])}</dd></div></dl>"
    else:
        facts = (
            '<dl class="count-grid">'
            + "".join(
                f"<div><dt>{label}</dt><dd>{count(p[key], p[key + '_status'])}</dd></div>"
                for key, label in [
                    ("disease_deaths", "Disease deaths"),
                    ("total_deaths", "All-cause deaths"),
                    ("battle_casualties", "Battle casualties (killed/wounded)"),
                ]
            )
            + "</dl>"
        )
    return f'<p class="record-date">{html.escape(p["date"])} · {html.escape(p["period"])}</p>{facts}<h3>What the record supports</h3><p>{html.escape(p["finding"])}</p><h3>Limits of interpretation</h3><p>{html.escape(p["limitations"])}</p><h3>Evidence and sources</h3>{source_list(p["source_ids"], sources)}'


def render_records(kind, root=PROJECT_ROOT):
    data = json.loads((root / f"data/exhibits/{kind}.json").read_text())
    sources = load_sources(root)
    records = data["records"]
    viking = kind == "viking"
    title = data["title"]
    intro = (
        "A cemetery, a tooth, a genome, and a piece of wood answer different historical questions. Start with the sample."
        if viking
        else "Follow smallpox, troop movements, inoculation orders, and winter encampments through the American Revolution."
    )
    periods = list(dict.fromkeys(p["period"] for p in records))
    categories = list(dict.fromkeys(p["category"] for p in records))
    options = lambda values: "".join(
        f"<option>{html.escape(v)}</option>" for v in values
    )
    chapters = (
        "".join(
            f'<button type="button" data-chapter="{html.escape(p)}">{i:02} {html.escape(p)}</button>'
            for i, p in enumerate(periods, 1)
        )
        if not viking
        else '<button type="button" id="compare-sites">Compare Ribe, Birka, and Varnhem</button>'
    )
    archive = "".join(
        f'<details class="archive-record" id="record-{p["id"]}"><summary>{html.escape(p["name"])} <span>{html.escape(p["date"])}</span></summary>{record_body(p, kind, sources)}</details>'
        for p in records
    )
    payload = json.dumps(
        {"kind": kind, "records": records, "sources": sources}, ensure_ascii=False
    ).replace("</", "<\\/")
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><meta name="description" content="{html.escape(intro)}"><link rel="stylesheet" href="../../assets/vendor/leaflet/leaflet.css"><link rel="stylesheet" href="../../assets/exhibits/shared.css"><link rel="stylesheet" href="../../assets/exhibits/records.css"><script src="../../assets/exhibits/shared.js"></script></head><body class="record-exhibit {kind}"><main class="record-page"><header class="record-intro"><p class="record-kicker">{"Sites, samples, and uncertainty" if viking else "Disease, movement, and military decisions"}</p><h1>{title}</h1><p>{intro}</p><div class="chapter-navigation" aria-label="{"Comparative study" if viking else "Disease chapters"}">{chapters}</div></header><section class="record-controls" aria-label="Record filters"><label>Search records<input type="search" id="record-search" placeholder="Search a place, finding, or source"></label><label>{"Period" if viking else "Chapter"}<select id="period-filter"><option value="">All {"periods" if viking else "chapters"}</option>{options(periods)}</select></label><label>Evidence category<select id="category-filter"><option value="">All categories</option>{options(categories)}</select></label><button id="record-reset" type="button">Reset</button></section><p id="record-count" role="status">{len(records)} cited records</p><section class="record-workspace"><div class="map-and-list"><div id="record-map" role="region" aria-label="Map of cited {"sites" if viking else "events"}"></div><p class="map-key">Markers have equal size. Color identifies evidence category; size does not imply disease burden or quality. Locations are approximate geographic anchors.</p><div id="map-legend"></div><nav id="record-list" aria-label="Accessible record list">{"".join(f'<a href="#record-{p["id"]}">{html.escape(p["name"])}</a>' for p in records)}</nav></div><article id="selected-record" aria-label="Selected record"><h2 id="selected-title">{html.escape(records[0]["name"])}</h2><div id="selected-content">{record_body(records[0], kind, sources)}</div><div id="record-utilities"></div></article></section><section id="comparison" hidden aria-label="Comparison of three sites"><h2>Three samples, three different questions.</h2><p>These studies cannot be pooled into a single measure of Viking health.</p><div class="comparison-grid"></div><button type="button" id="close-comparison">Close comparison</button></section><section class="complete-records"><h2>Read every record</h2><p>All evidence remains available here if the interactive map is unavailable.</p>{archive}<p class="record-downloads"><a href="records.json" download>Download records (JSON)</a> <a href="records.csv" download>Download records (CSV)</a> <a href="../../tools/histsearch/?dossier={"viking-paleodemography" if viking else "revolutionary-smallpox"}">Open the research dossier →</a></p></section></main><script id="record-data" type="application/json">{payload}</script><script src="../../assets/vendor/leaflet/leaflet.js"></script><script src="../../assets/exhibits/land.js"></script><script src="../../assets/exhibits/map-base.js"></script><script type="module" src="../../assets/exhibits/records.js"></script></body></html>'''


def write_record_exhibit(kind, destination, root=PROJECT_ROOT):
    ensure_dir(destination)
    data = json.loads((root / f"data/exhibits/{kind}.json").read_text())
    data["sources"] = list(load_sources(root).values())
    (destination / "index.html").write_text(render_records(kind, root))
    (destination / "records.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    )
    buffer = io.StringIO()
    fields = list(data["records"][0])
    writer = csv.DictWriter(buffer, fieldnames=fields)
    writer.writeheader()
    for record in data["records"]:
        writer.writerow(
            {k: "; ".join(v) if isinstance(v, list) else v for k, v in record.items()}
        )
    (destination / "records.csv").write_text(buffer.getvalue())


def render_histsearch(root=PROJECT_ROOT):
    dossiers = json.loads((root / "data/exhibits/dossiers.json").read_text())
    sources = load_sources(root)
    cards = []
    for d in dossiers:
        entries = "".join(
            f'<article class="dossier-source" data-source="{id}"><p class="record-kicker">{html.escape(sources[id]["review_status"])}</p><h3><a href="{html.escape(sources[id]["url"])}">{html.escape(sources[id]["title"])}</a></h3><p class="source-dates">Source date: {html.escape(sources[id]["published_date"] or "not established")} · Checked: {sources[id]["reviewed_at"]}</p><p>{html.escape(sources[id]["editorial_note"])}</p></article>'
            for id in d["source_ids"]
        )
        strategies = "".join(
            f"<li><code>{html.escape(q)}</code></li>" for q in d["strategies"]
        )
        cards.append(
            f'<section class="dossier" id="{d["id"]}" data-dossier="{d["id"]}"><p class="record-kicker">Curated dossier</p><h2>{d["title"]}</h2><p class="dossier-question">{d["question"]}</p><p>{d["scope"]}</p><aside class="editorial-note"><h3>Editorial note</h3><p>{html.escape(d["editorial_note"])}</p></aside><details class="search-log"><summary>Search strategy and review trail · {d["search_date"]}</summary><p>Targeted web discovery and source chaining, using the existing research project as a starting point. These strings record this curation pass; search-engine results change over time.</p><ul>{strategies}</ul><p>Metadata retrieval identifies a source. Only entries marked as reviewed were used for the displayed evidence summaries.</p></details><div class="dossier-sources">{entries}</div><p class="record-downloads"><a href="downloads/{d["id"]}.csv" download>CSV ↓</a><a href="downloads/{d["id"]}.json" download>JSON ↓</a><a href="../../{d["exhibit"]}">Explore the {d["exhibit_label"]} →</a></p></section>'
        )
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Histsearch | Curated research dossiers</title><meta name="description" content="Browse curated historical epidemiology research with source links, search strategies, review notes, and downloadable records."><link rel="stylesheet" href="../../assets/exhibits/shared.css"><link rel="stylesheet" href="../../assets/exhibits/records.css"><link rel="stylesheet" href="../../assets/exhibits/histsearch.css"><script src="../../assets/exhibits/shared.js"></script></head><body><main class="record-page"><header class="record-intro"><p class="record-kicker">The research collection</p><h1>Histsearch</h1><p>Follow the question back to the sources.</p><p class="histsearch-description">Curated dossiers from the research behind these exhibits. Browse the evidence, inspect the search trail, and download the records.</p></header><section class="record-controls" aria-label="Dossier filters"><label>Search the collection<input type="search" id="dossier-search" placeholder="Search a subject, source, or method"></label><label>Dossier<select id="dossier-filter"><option value="">All dossiers</option>{"".join(f'<option value="{d["id"]}">{d["title"]}</option>' for d in dossiers)}</select></label><label>Review status<select id="review-filter"><option value="">All records</option><option value="reviewed">Reviewed evidence</option><option value="metadata">Retrieved metadata</option></select></label><button id="dossier-reset" type="button">Reset</button></section><p id="dossier-count" role="status">3 dossiers</p><div id="dossier-utilities"></div>{"".join(cards)}<p class="project-link">About the research software: <a href="setup/">local Histsearch project and setup</a>.</p></main><script type="module" src="../../assets/exhibits/histsearch.js"></script></body></html>"""


def write_histsearch(destination, root=PROJECT_ROOT):
    ensure_dir(destination)
    (destination / "index.html").write_text(render_histsearch(root))
    dossiers = json.loads((root / "data/exhibits/dossiers.json").read_text())
    sources = load_sources(root)
    ensure_dir(destination / "downloads")
    for dossier in dossiers:
        payload = {**dossier, "sources": [sources[id] for id in dossier["source_ids"]]}
        (destination / "downloads" / f"{dossier['id']}.json").write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
        )
        buffer = io.StringIO()
        writer = csv.DictWriter(
            buffer,
            fieldnames=[
                "id",
                "title",
                "url",
                "published_date",
                "review_status",
                "reviewed_at",
                "editorial_note",
            ],
        )
        writer.writeheader()
        writer.writerows(payload["sources"])
        (destination / "downloads" / f"{dossier['id']}.csv").write_text(
            buffer.getvalue()
        )
    from .site_shell import base_html

    ensure_dir(destination / "setup")
    (destination / "setup/index.html").write_text(
        base_html(
            title="Histsearch local project | Edge of Epidemiology",
            description="The local research software behind Histsearch dossiers.",
            active="tools",
            base_url="/",
            body="""<section class="hero"><p class="kicker">Research software</p><h1 class="hero-title">The local Histsearch project</h1><p class="subtitle">The public collection is a curated export. The Python application runs on its operator’s computer and produces research packets, records, and search logs.</p></section><section class="prose"><p>For an existing Histsearch source checkout, use its README and Python package to create an isolated environment. The following commands are for the local project, not the website repository.</p><pre>python3.12 -m venv .venv
.venv/bin/python -m pip install -e '.[dev]'
.venv/bin/histsearch init
.venv/bin/histsearch app</pre><p>The app stores private working data locally. Public dossiers are selected, reviewed, and exported separately; running a search does not publish its results.</p><p>Stop the local application with <code>.venv/bin/histsearch stop</code>. Use <code>.venv/bin/histsearch doctor</code> to inspect connector availability.</p><p><a href="../">Return to the curated collection →</a></p></section>""",
        )
    )
