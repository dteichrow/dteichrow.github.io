# Edge of Epidemiology Umbrella Site

Static umbrella site for:

- `The Pathogen Dispatch` newsdesk
- `Pathogen Atlas`
- `Maritime Disease Atlas`
- `Viking Health Atlas`
- `Revolutionary War` historical atlas section
- the published `Edge of Epidemiology` writing archive

## What this repo does

This site turns the existing public surfaces into one navigable publication shell.

- `content/posts.yml` is the authoritative essay registry
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
- if you publish under a repository subpath instead, rebuild with the matching
  base URL before deployment
