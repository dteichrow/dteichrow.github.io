from __future__ import annotations

from pathlib import Path

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]


def load_workflow(path: str) -> dict:
    return yaml.load((REPO_ROOT / path).read_text(), Loader=yaml.BaseLoader)


def test_deploy_pages_accepts_newsdesk_dispatch_and_scheduled_pull() -> None:
    workflow = load_workflow(".github/workflows/deploy-pages.yml")
    triggers = workflow["on"]

    assert triggers["repository_dispatch"]["types"] == ["newsdesk_published"]
    assert triggers["schedule"] == [{"cron": "23,53 * * * *"}]

    build_steps = workflow["jobs"]["build"]["steps"]
    build_commands = "\n".join(step.get("run", "") for step in build_steps)

    assert "python -m src.build_site --site-base-url /" in build_commands
