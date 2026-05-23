# Edge of Epidemiology Umbrella Site

Static umbrella site for:

- `The Pathogen Dispatch` newsdesk
- `Virtual Teaching Tools` static interactives
- `American Epidemic Timeline`
- `Pathogen Atlas`
- `Maritime Disease Atlas`
- `Viking Health Atlas`
- `Revolutionary War` historical atlas section
- the published `Edge of Epidemiology` writing archive

## What this repo does

This site turns the existing public surfaces into one navigable publication shell.

- `content/posts.yml` is the authoritative essay registry
- `content/tools.yml` is the teaching-tool registry for timelines, atlases, maps, and interactives
- `content/atlases.yml` remains supported for legacy atlas URLs and post relationships
- the public Substack sitemap powers full historical backfill
- the public Substack RSS feed powers 15-minute incremental new-post sync
- every post gets a local public page immediately
- posts default to `summary_only` stub pages with canonical outbound links
- `epi-dossier` public outputs are imported into this site under the new route map

## Routes

- `/`
- `/newsdesk/`
- `/stories/`
- `/reference/`
- `/notebook/`
- `/tools/`
- `/tools/american-epidemic-timeline/`
- `/atlases/`
- `/atlases/pathogen/`
- `/atlases/maritime/`
- `/atlases/revolutionary-war/`
- `/atlases/viking/`
- `/historical/`
- `/essays/`
- `/essays/<slug>/`
- `/methods/`
- `/about/`
- `/opportunities/`
- `/search/`

## Local commands

Use the existing `epi-dossier` virtualenv or a new Python 3.12 environment with `PyYAML` and `pytest` installed.

Backfill the full Substack archive:

```bash
python -m src.substack_sync --mode backfill
```

Run the 15-minute incremental-style sync manually:

```bash
python -m src.substack_sync --mode incremental
```

Validate source provenance for the interactive learning tools:

```bash
python scripts/validate_tool_sources.py
```

Smoke-test the built public tool pages for placeholder shells, zero-count regressions, and missing static fallback content:

```bash
python scripts/smoke_test_tool_pages.py
```

Build the umbrella site:

```bash
python -m src.build_site --site-base-url /
```

Discover and stage Pathogen Atlas candidates:

```bash
python -m src.pathogen_atlas_ingest discover --limit 300
python -m src.pathogen_atlas_ingest enrich
python -m src.pathogen_atlas_ingest validate
python -m src.pathogen_atlas_ingest promote
```

The ingestion workflow uses Wikipedia/Wikidata only for candidate discovery.
Public atlas entries are promoted only after reviewed, non-Wikipedia evidence
has been attached in `external/pathogen_atlas/catalog/drafts.json`.

## How the import works

For the historical essay archive:

- full URL inventory comes from the public Substack sitemap
- richer current metadata can come from the archive page
- individual public post pages are used to fill title, excerpt, cover, tags, and dates

For the live desk:

- local builds import from the sibling `../epi-dossier/docs`
- CI builds can clone `https://github.com/dteichrow/epi-dossier.git` if the sibling path is unavailable
- `substack_sync` updates the persisted repository content and generated docs, but it does not deploy GitHub Pages
- `deploy_pages` is the only Pages deployer; it runs after normal pushes, on manual dispatch, and on a cloud schedule with no more than a 10-minute gap between deploy attempts
- the Pages deploy step retries once after a short delay so a transient GitHub Pages deployment error does not fail the whole publication path immediately

For virtual teaching tools:

- `content/tools.yml` drives `/tools/`, the home-page tool cards, search export entries, and the `tools.json` app export
- existing atlas cards have been migrated into the tool registry while `content/atlases.yml` keeps `/atlases/` and `/atlases/<name>/` routes stable
- `external/american_epidemic_timeline/` is copied into `docs/tools/american-epidemic-timeline/`
- the timeline data contract lives in `external/american_epidemic_timeline/data/american_epidemic_timeline_data.js`
- the Pathogen Atlas public payload is generated into `external/pathogen_atlas/data/pathogen_atlas_data.js` and copied into `docs/atlases/pathogen/`
- the Maritime Disease Atlas uses `external/maritime_disease_atlas/data/maritime_disease_atlas_data.js` for map features and guided-tour scenario text, plus local archival image credits in the atlas app
- `data/sources/sources.json` is the central source registry used by `scripts/validate_tool_sources.py`
- `scripts/smoke_test_tool_pages.py` checks the built `docs/` pages for production-facing hydration failures: timeline counters stuck at zero, pathogen loading shells, empty origin panels, and maritime module lists not exposed as readable page content

## Learning tool evidence standard

These tools are teaching tools, not exhaustive historical or epidemiologic databases. Entries privilege claims supported by historical scholarship, epidemiologic literature, public-health records, public datasets, or clearly labeled primary sources. Absence from a tool does not mean absence from history.

Every displayed factual claim should have a source trail. Disease origin claims, mortality claims, date ranges, route claims, reservoir/vector claims, public-health interpretations, and historical consequences need source IDs. Uncertain or contested claims should remain visibly uncertain rather than being smoothed into certainty. If the literature does not support a claim, omit it.

Use the shared confidence categories consistently:

- `high`: multiple strong sources, or one definitive primary/technical source for the displayed claim
- `moderate`: supported but limited, indirect, source-type dependent, or interpretive
- `low`: plausible but thin evidence
- `contested`: serious scholarly disagreement or disputed retrospective diagnosis
- `speculative`: teaching model or hypothesis only, displayed only with an explicit caveat

Source records live in `data/sources/sources.json` and should keep the fields `source_id`, `full_citation`, `short_citation`, `authors`, `year`, `title`, `publication_or_publisher`, `url_or_doi`, `source_type`, `topic_tags`, `notes_on_use`, and `reliability_notes`. Tool records should cite those IDs directly, and interpretive records can add a `claims` list with `claim`, `source_ids`, `confidence`, `claim_type`, and optional `notes` or `uncertainty_note`.

## GitHub Actions

- `.github/workflows/substack-sync.yml`
  - runs every 15 minutes
  - pulls the RSS feed
  - updates `content/posts.yml`
  - rebuilds `docs/`
  - commits changes only when something changed

- `.github/workflows/archive-backfill.yml`
  - manual full re-hydration
  - useful when historical archive integrity needs to be refreshed

- `.github/workflows/deploy-pages.yml`
  - builds the umbrella site on every push to `main`
  - uploads `docs/` as the Pages artifact
  - deploys the public site through GitHub Pages

## GitHub Pages settings

This repo is set up for the GitHub Actions deployment model rather than the older
`docs/` branch-folder publishing toggle.

- set the repository Pages source to `GitHub Actions`
- keep `docs/.nojekyll` in place
- if you publish under a custom root domain, `--site-base-url /` is correct
- the recommended personal custom domain is `devinteichrow.com`; add `docs/CNAME`
  only after DNS is ready and GitHub Pages is configured for that domain
- if you publish under a repository subpath instead, rebuild with the matching
  base URL before deployment
