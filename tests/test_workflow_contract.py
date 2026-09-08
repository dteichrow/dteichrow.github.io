from pathlib import Path
import yaml

REPO_ROOT = Path(__file__).resolve().parents[1]


def load_workflow(path):
    return yaml.load((REPO_ROOT / path).read_text(), Loader=yaml.BaseLoader)


def test_deployment_requires_the_exact_validated_artifact():
    workflow = load_workflow(".github/workflows/deploy-pages.yml")
    assert workflow["on"]["schedule"] == [{"cron": "23,53 * * * *"}]
    assert "push" not in workflow["on"] and "repository_dispatch" not in workflow["on"]
    assert workflow["concurrency"]["cancel-in-progress"] == "false"
    validation = workflow["jobs"]["validated-artifact"]
    assert validation["uses"] == "./.github/workflows/validate-artifact.yml"
    assert validation["with"]["upload-pages"] == "true"
    assert workflow["jobs"]["deploy"]["needs"] == "validated-artifact"
    steps = load_workflow(".github/workflows/validate-artifact.yml")["jobs"][
        "validate"
    ]["steps"]
    commands = "\n".join(step.get("run", "") for step in steps)
    assert commands.count("python -m src.build_site --site-base-url /") == 1
    for gate in [
        "validate_tool_sources.py",
        "smoke_test_tool_pages.py",
        "python -m pytest",
        "pnpm test:browser",
        "pnpm test:performance",
        "validate_artifact.py --write-manifest",
    ]:
        assert gate in commands
    upload = next(
        i
        for i, s in enumerate(steps)
        if s.get("uses") == "actions/upload-pages-artifact@v5"
    )
    gate = next(
        i for i, s in enumerate(steps) if "validate_artifact.py" in s.get("run", "")
    )
    assert upload > gate


def test_quality_gate_covers_shared_assets_and_browser_configuration():
    workflow = load_workflow(".github/workflows/quality-gate.yml")
    paths = workflow["on"]["push"]["paths"]
    for path in ["assets/**", "package.json", "pnpm-lock.yaml", "playwright.config.js"]:
        assert path in paths
    assert (
        workflow["jobs"]["validate"]["uses"]
        == "./.github/workflows/validate-artifact.yml"
    )
