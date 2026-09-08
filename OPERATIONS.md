# Edge Site Operations

This repository owns the final GitHub Pages artifact. Edit source records and renderers, then rebuild `docs/`.

## Source ownership

| Source | Responsibility |
|---|---|
| `content/posts.yml`, `content/post_bodies/` | Essay metadata, curated introductions and relationships, available full text |
| `content/services.json` | All service packages, prices, scope, examples, and referral guide |
| `content/tools.yml`, `content/atlases.yml` | Exhibit discovery metadata and preserved routes |
| `data/exhibits/` | Reviewed Viking and Revolutionary records, Histsearch dossiers and provenance |
| `external/american_epidemic_timeline/data/` | Timeline events, evidence, images, uncertainty |
| `external/pathogen_atlas/source_backed_profiles.json` | Pathogen profiles and claim-specific citations |
| `external/maritime_disease_atlas/data/` | Maritime cases, mechanisms, routes and presentation material |
| `assets/exhibits/` | Shared navigation/styles/state, local cartography, exhibit behavior and optional ship modules |
| `src/site_pages.py`, `site_cards.py`, `site_shell.py` | Publication rendering |
| `src/site_content.py`, `site_seo.py` | Content normalization, canonical search destinations, SEO |
| `src/curated_exhibits.py`, `site_exhibits.py` | Static records and shared exhibit shell |
| `epi-dossier` upstream repository | Newsdesk collection, publication/discovery/retrieval dates, geography and public summaries |

## Install and build

Python 3.12+ and Node.js 22+ are used by CI. Local verification also ran on Python 3.14.

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
.venv/bin/python -m src.build_site --site-base-url /
.venv/bin/python -m http.server 8765 --bind 127.0.0.1 --directory docs
```

The public build command is unchanged. It uses `EOE_EPI_DOSSIER_DOCS` when configured, a sibling checkout when available, or a temporary clone of `dteichrow/epi-dossier`. The upstream `rebuild_public` renderer processes existing exports in an isolated temporary directory. It does not fetch reports, send email, or rewrite the original upstream checkout. Collection timestamps remain the original timestamps.

Service HTML and the three-page referral PDF are generated from the same registry. Regenerate the guide independently with `.venv/bin/python -m src.referral`. These files are intentionally public under `assets/referral/`.

## Required validation

```sh
.venv/bin/python scripts/repo_doctor.py --json
.venv/bin/python scripts/validate_tool_sources.py
.venv/bin/python scripts/smoke_test_tool_pages.py
.venv/bin/python -m pytest
pnpm test:browser
pnpm test:performance
.venv/bin/python scripts/validate_artifact.py --write-manifest
```

Playwright starts or reuses the local preview server. The performance command requires that server to be running. `CHROME_PATH` can select a Chrome executable; otherwise tests use Chrome on macOS when available, or Playwright Chromium. `TEST_BASE_URL` changes the URL used by tests.

Browser verification covers 390, 768, and 1440 pixel viewports, all six exhibit interactions, URL restoration, filters, resets, source access, keyboard focus, WCAG A/AA checks, lazy 3D loading, and WebGL/third-party failure. Reports and screenshots go to `output/playwright/`. Lighthouse uses a 390×844 mobile viewport, simulated 150 ms RTT, 1638.4 Kbps throughput, and 4× CPU slowdown. It requires score ≥90, LCP ≤2500 ms and CLS ≤0.1. Reports go to `output/lighthouse/`.

## Actual publishing triggers and gate

- `substack_sync`: hourly at minute **27 UTC**, manual dispatch, and selected source pushes. It preserves the existing archive when discovery fails. Curated editorial summaries, captions and relationships survive synchronization.
- `deploy_pages`: minutes **23 and 53 UTC** and manual dispatch. It does **not** run on push or `repository_dispatch`. An upstream dispatch alone is not a deployment guarantee.
- `quality_gate`: pull requests and main-branch changes to source, assets, data, tests and validation configuration.

Both deployment and quality checks call `validate-artifact.yml`. The deployment path builds once, validates sources and Python behavior, runs browser/accessibility/mobile tests and Lighthouse, records the artifact manifest, and only then uploads `docs/`. The deployment job requires this job to succeed and deploys its uploaded artifact without rebuilding. Pages runs are serialized. Failed checks leave production on its last successful deployment.

`docs/build-manifest.json` records the source commit and file hashes. Verification reports are retained as GitHub Actions artifacts for 30 days. Scheduled builds may import a later Newsdesk collection; each tested artifact records its own complete hashes.

## Evidence and fallback behavior

- Unknown publication dates remain unknown. HTTP modification time is a separate field; discovery and retrieval dates are separately named.
- Story country and region labels use the same underlying records. Multi-region coverage is explicit. Inferred coverage geography is not a geocoded case count.
- Unknown, missing, estimated, not-applicable, and zero counts have different displays.
- The four maps use bundled land geometry and locally served Leaflet. Static cited records remain readable when the map fails.
- The ship's SVG, labeled controls, mechanism descriptions, cases and citations remain usable without WebGL. No 3D payload is requested by ordinary pages.
- Motion starts through a visitor control. Existing explicit recording/presentation URLs remain available. Reduced-motion preferences disable visual animation.

## Post-deployment verification and recovery

Check the successful deployment's commit and public build manifest, then visit the homepage, services, Newsdesk and all six exhibits at `https://dteichrow.github.io/`. The existing canonical domain and CNAME file are preserved; this change does not modify DNS or GitHub's custom-domain setting.

Use `git revert` to undo a published source change, rerun validation, and manually dispatch `deploy_pages`. Do not bypass a failed artifact gate. Diagnose an upstream collection problem in `epi-dossier`; diagnose page rendering, search, CSS or delivery here.

## Working-tree policy

Use an isolated checkout when the user's working directory is dirty. Original local changes must remain intact. Generated `docs/` is tracked as a reproducible public artifact; private databases, credentials, outreach, scratch media, browser dependencies and reports remain untracked. Review `git diff --cached` before publishing.


### Exhibit imagery and palette (September 8, 2026)

`src/site_images.py` renders exhibit covers, captions, and `/image-credits/` from `assets/exhibits/image-credits.json`. Update this registry together with local WebP files when changing an image; every entry requires a source record, creator, rights statement, and image hashes. The build does not fetch cover images. Keep original colours and the full image available on the credits page; adjust card crops through `position`, not by retouching the historical object.

The publication uses paper `#F6F1E4`, charcoal `#202127`, indigo `#414B82`, rust `#B84A3E`, gold `#B28B3E`, and neutral slate `#555561`. Exhibit categories also use plum and blue. Forest green and teal are retired, including their former dark backgrounds. `scripts/validate_artifact.py` checks generated styles and owned vector/script assets for the retired colour family. It does not inspect or recolour documentary photographs. The imported Newsdesk also refreshes archived embedded palettes upstream in `src/rebuild_public.py`.

Run the existing build and validation commands after edits. The browser suite includes cover loading, attribution navigation, whole-image credits, 390/768/1440px layouts, accessibility, and availability without collection servers. The image registry's paths, dimensions, rights fields, and hashes are covered by Python tests.
