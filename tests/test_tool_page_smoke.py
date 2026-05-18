from __future__ import annotations

import importlib.util
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SMOKE_PATH = PROJECT_ROOT / "scripts" / "smoke_test_tool_pages.py"


def load_smoke_module():
    spec = importlib.util.spec_from_file_location("smoke_test_tool_pages", SMOKE_PATH)
    assert spec is not None
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_built_learning_tool_pages_do_not_ship_placeholder_shells() -> None:
    smoke = load_smoke_module()
    assert smoke.validate_built_pages(PROJECT_ROOT) == []
