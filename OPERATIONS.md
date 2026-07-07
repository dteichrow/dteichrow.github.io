# Edge Site Operations

This repository is the public umbrella site for The Edge of Epidemiology. It owns the final GitHub Pages artifact for essays, tools, reference pages, Newsdesk mirrors, and app exports.

## Source Of Truth

- `content/posts.yml`: authoritative essay registry.
- `content/post_bodies/`: stored essay bodies used by generated archive pages.
- `content/tools.yml`: public tool registry.
- `content/atlases.yml`: atlas registry.
- `data/sources/sources.json`: source registry for public tools.
- `src/build_site.py`: static-site builder.
- `src/substack_sync.py`: Substack archive and incremental sync.
- `docs/`: generated GitHub Pages artifact.
- `docs/newsdesk/`: mirrored Newsdesk output from `epi-dossier`.

## Normal Publish Path

Build the public site locally:

```bash
python -m src.build_site --site-base-url /
```

Sync recent Substack posts only when the sync source is authoritative:

```bash
python -m src.substack_sync --mode incremental
python -m src.substack_sync --mode bodies
python -m src.build_site --site-base-url /
```

The workflow `.github/workflows/substack-sync.yml` skips rebuild and commit when the incremental sync report is degraded. That is intentional: a stale manifest is safer than republishing a partially pruned essay archive.

## Routine Health Check

Run the structural health check:

```bash
python scripts/repo_doctor.py
python scripts/repo_doctor.py --json
```

Run live route checks when diagnosing drift:

```bash
python scripts/repo_doctor.py --check-live
```

## Local Validation

Use these before publishing changes that affect generated pages, source registries, or workflows:

```bash
python scripts/repo_doctor.py --json
python -m src.build_site --site-base-url /
python scripts/validate_tool_sources.py
python scripts/smoke_test_tool_pages.py
python -m pytest
```

## Failure Triage

Start with the source of truth that matches the symptom:

- Missing or stale essay: inspect `content/posts.yml`, `notes/substack-sync-incremental.json`, and the `substack_sync` workflow log.
- Live page stale but `docs/` current: inspect `deploy_pages` workflow and GitHub Pages deployment status.
- Newsdesk mirror stale: inspect the `epi-dossier` publish run first, then `docs/newsdesk/` in this repo.
- Broken tool page: run `scripts/validate_tool_sources.py`, `scripts/smoke_test_tool_pages.py`, then `pytest`.

## Generated File Policy

The generated `docs/` tree is intentionally tracked because GitHub Pages deploys from it. Private local work should stay out of git:

- `.env` files.
- local databases.
- private application and outreach material.
- browser automation output.
- one-off scratch media.

Before staging, inspect:

```bash
git status --short
git diff --stat
git diff --cached --stat
```

## Dirty Checkout Policy

For operational fixes, use a clean clone or temporary worktree from `origin/main` when the local checkout is dirty. Keep source changes, generated-page rebuilds, and workflow fixes separable unless a single commit needs both.

## Manual Verification

After deployment, verify:

```text
https://dteichrow.github.io/
https://dteichrow.github.io/essays/
https://dteichrow.github.io/newsdesk/
https://dteichrow.github.io/app_exports/latest.json
```

If the custom domain is unreliable, verify against `https://dteichrow.github.io/` first.

## Recovery

- Prefer `git revert` for a bad published commit.
- Rebuild locally before re-running deployment.
- Do not force a Substack sync commit when the sync report is degraded.
- If Pages deployment is delayed, check whether a previous Pages run is still settling before dispatching another deployment.
