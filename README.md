# The Edge of Epidemiology Public Site

Public repository for [The Edge of Epidemiology](https://dteichrow.github.io/), a health-evidence and historical-epidemiology publication built by Devin Teichrow, MSc.

The site combines long-form science writing, outbreak monitoring, disease reference pages, and interactive teaching tools. It is meant to make epidemiologic evidence easier to inspect: what is known, what is uncertain, what sources support a claim, and how historical context changes the interpretation.

## What To Look At First

- [Public site](https://dteichrow.github.io/): umbrella home page for essays, tools, reference pages, and the newsdesk.
- [Essays](https://dteichrow.github.io/essays/): public archive of epidemiology, infectious-disease history, neuroepidemiology, and evidence-methods writing.
- [Virtual Teaching Tools](https://dteichrow.github.io/tools/): interactive maps, timelines, atlases, and evidence exhibits.
- [Pathogen and disease reference pages](https://dteichrow.github.io/reference/): concise pages organized around outbreak and disease-literacy needs.
- [Opportunities / portfolio page](https://dteichrow.github.io/opportunities/): summary of research communication, evidence translation, and applied public-health work.

## Why This Exists

Most public health writing either collapses uncertainty into a clean story or buries the story inside technical documents. This project tries to do the opposite: keep the narrative readable while making the evidence trail visible.

The recurring design principles are:

- separate evidence from interpretation;
- show source trails for factual claims;
- keep uncertainty visible when evidence is thin, contested, or retrospective;
- make historical epidemiology useful for modern health questions;
- turn dense scientific material into tools a reader can actually navigate.

## Technical Scope

This is a static publishing system built around Python-generated content and GitHub Pages. It is not a generic blog theme. The repo contains the publication shell, data registries, build scripts, generated public pages, and tests used to keep the site from quietly breaking.

Core pieces:

- `content/posts.yml`: authoritative essay registry.
- `content/tools.yml`: registry for interactive teaching tools, maps, timelines, and atlases.
- `content/atlases.yml`: legacy atlas relationships and stable atlas routes.
- `data/sources/sources.json`: structured source registry for cited claims in public tools.
- `src/build_site.py`: static-site generation.
- `src/substack_sync.py`: Substack archive and incremental-post sync.
- `scripts/smoke_test_tool_pages.py`: production-facing checks for broken interactive pages.
- `tests/`: regression tests for site generation and sync behavior.

The public site is generated into `docs/` and deployed through GitHub Pages.

## Evidence Standard

The interactive tools are teaching tools, not exhaustive historical or epidemiologic databases. Entries prioritize claims supported by historical scholarship, epidemiologic literature, public-health records, public datasets, or clearly labeled primary sources.

Displayed claims use confidence categories:

- `high`: multiple strong sources, or one definitive primary/technical source for the displayed claim.
- `moderate`: supported but limited, indirect, source-type dependent, or interpretive.
- `low`: plausible but thin evidence.
- `contested`: serious scholarly disagreement or disputed retrospective diagnosis.
- `speculative`: teaching model or hypothesis only, displayed only with an explicit caveat.

Disease origin claims, mortality claims, date ranges, route claims, reservoir/vector claims, public-health interpretations, and historical consequences should have a source trail. If the literature does not support a claim, the claim should be omitted or explicitly framed as uncertain.

## Relevance To Evidence, Data, And AI-Assisted Workflows

This project is a practical example of the kind of work I enjoy: turning messy source material into structured, reviewable outputs.

It involves:

- building content registries and data contracts for public-facing evidence products;
- using automation to keep a large writing archive navigable;
- checking generated pages for broken states and missing public content;
- translating research into clear narrative, tabular, and interactive formats;
- using AI-assisted workflows as drafting, search, and coding support while preserving human review of claims, sources, and interpretation.

For clinical evidence or real-world-data roles, the closest transferable habits are not the specific disease-history content. They are the workflow habits: define the question, inspect source structure, track uncertainty, generate a usable artifact, and QA the result before a reader or stakeholder relies on it.

## Local Development

Use Python 3.12 with `PyYAML` and `pytest` installed.

Build the site:

```bash
python -m src.build_site --site-base-url /
```

Run the incremental Substack sync manually:

```bash
python -m src.substack_sync --mode incremental
```

Backfill the Substack archive:

```bash
python -m src.substack_sync --mode backfill
```

Run smoke checks for public tool pages:

```bash
python scripts/smoke_test_tool_pages.py
```

Run tests:

```bash
pytest
```

## Notes For Reviewers

The generated `docs/` tree is intentionally committed because GitHub Pages publishes from it. The more useful review targets are usually the registries, source data, build scripts, and tests rather than the generated HTML itself.

This project is actively evolving, so some local experiments may be cleaner than others. The core public-facing standard is simple: the live site should help readers understand evidence without pretending uncertainty has disappeared.

## Public Repo Hygiene

This repository is public and doubles as a portfolio surface. Tracked files should be limited to the public site, source registries, build code, tests, public assets, and intentional project notes.

Keep private application material, outreach notes, referral packets, resumes, local `.env` files, browser-control output, and scratch media out of git unless a file is deliberately being published as part of the portfolio. The `.gitignore` blocks common local spillover paths, but still inspect the staged set before committing:

```bash
git status --short
git diff --stat
git diff --cached --stat
```
