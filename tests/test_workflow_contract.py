from __future__ import annotations

from pathlib import Path

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]


def load_workflow(path: str) -> dict:
    return yaml.load((REPO_ROOT / path).read_text(), Loader=yaml.BaseLoader)


def test_deploy_pages_uses_scheduled_serial_delivery() -> None:
    workflow = load_workflow(".github/workflows/deploy-pages.yml")
    triggers = workflow["on"]

    assert triggers["schedule"] == [{"cron": "23,53 * * * *"}]
    assert "repository_dispatch" not in triggers
    assert "push" not in triggers
    assert "concurrency" not in workflow

    build_steps = workflow["jobs"]["build"]["steps"]
    build_commands = "\n".join(step.get("run", "") for step in build_steps)

    assert "python -m src.build_site --site-base-url /" in build_commands

    deploy = workflow["jobs"]["deploy"]
    deploy_steps = deploy["steps"]
    deployment_steps = [step for step in deploy_steps if step.get("uses") == "actions/deploy-pages@v5"]

    assert deploy["timeout-minutes"] == "12"
    assert len(deployment_steps) == 1
