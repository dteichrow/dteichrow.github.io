from __future__ import annotations

from pathlib import Path

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]


def load_workflow(path: str) -> dict:
    return yaml.load((REPO_ROOT / path).read_text(), Loader=yaml.BaseLoader)


def test_deploy_pages_uses_scheduled_content_delivery_and_immediate_code_deploys() -> None:
    workflow = load_workflow(".github/workflows/deploy-pages.yml")
    triggers = workflow["on"]

    assert workflow["permissions"]["actions"] == "read"

    assert triggers["schedule"] == [{"cron": "23,53 * * * *"}]
    assert "repository_dispatch" not in triggers
    assert triggers["push"]["paths"] == [
        ".github/workflows/deploy-pages.yml",
        "src/**",
        "requirements.txt",
    ]

    build_steps = workflow["jobs"]["build"]["steps"]
    build_commands = "\n".join(step.get("run", "") for step in build_steps)

    assert "python -m src.build_site --site-base-url /" in build_commands

    deploy = workflow["jobs"]["deploy"]
    deploy_steps = deploy["steps"]
    deploy_commands = "\n".join(step.get("run", "") for step in deploy_steps)

    assert deploy["timeout-minutes"] == "35"
    assert any(step.get("uses") == "actions/checkout@v7" for step in deploy_steps)
    assert "actions/deploy-pages" not in "\n".join(str(step) for step in deploy_steps)
    assert "python scripts/deploy_pages.py --max-wait-seconds 1800 --poll-seconds 10" in deploy_commands


def test_pages_deployer_observes_without_cancelling() -> None:
    source = (REPO_ROOT / "scripts/deploy_pages.py").read_text()

    assert "/pages/deployments" in source
    assert "/cancel" not in source
    assert 'repository.partition("/")' in source
    assert "leaving the accepted deployment running" in source
