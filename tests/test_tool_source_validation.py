from __future__ import annotations

import importlib.util
import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = PROJECT_ROOT / "scripts" / "validate_tool_sources.py"
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"


def load_validator():
    spec = importlib.util.spec_from_file_location("validate_tool_sources", VALIDATOR_PATH)
    assert spec is not None
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_source_registry_has_required_backbone_fields() -> None:
    registry = json.loads(SOURCE_REGISTRY_PATH.read_text())

    assert registry["schema_version"] == "1.0.0"
    assert set(registry["confidence_scale"]) == {"high", "moderate", "low", "contested", "speculative"}
    assert len(registry["sources"]) >= 400

    by_id = {source["source_id"]: source for source in registry["sources"]}
    for source_id in [
        "cdc-smallpox-history",
        "yellow-history",
        "measles-science",
        "maritime-lind-scurvy-treatise",
        "maritime-rediker-between-devil",
        "slavevoyages-methodology",
        "curtin-epidemiology-slave-trade",
    ]:
        assert source_id in by_id
        assert by_id[source_id]["full_citation"]
        assert by_id[source_id]["source_type"]
        assert isinstance(by_id[source_id]["topic_tags"], list)


def test_learning_tool_source_contract_passes() -> None:
    validator = load_validator()
    assert validator.validate_all(PROJECT_ROOT) == []
