from __future__ import annotations

import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODULES_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_modules.js"
ATLAS_DATA_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_atlas_data.js"
HTML_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "index.html"
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"


def load_assignment(path: Path, name: str):
    text = path.read_text()
    if name == "MARITIME_DISEASE_ATLAS_GEOJSON":
        marker = "window.MARITIME_DISEASE_ATLAS_GEOJSON = "
        next_marker = "\n\nwindow.MARITIME_DISEASE_SCENARIOS = "
        start = text.index(marker) + len(marker)
        end = text.index(next_marker, start)
        return json.loads(text[start:end].rstrip().removesuffix(";"))
    marker = f"window.{name} = "
    start = text.index(marker) + len(marker)
    return json.loads(text[start:].strip().removesuffix(";"))


def test_maritime_modules_are_curated_source_backed_cases() -> None:
    payload = load_assignment(MODULES_PATH, "MARITIME_DISEASE_MODULES")
    modules = payload["modules"]

    assert payload["schema_version"] == "1.0.0"
    assert len(modules) == 16
    assert {module["id"] for module in modules} >= {
        "scurvy_long_voyage_navy",
        "ship_fever_grosse_ile_1847",
        "cholera_steamship_quarantine_1892",
        "algiers_plague_sanitary_ban_1818",
        "middle_passage_forced_transport",
        "mediterranean_plague_lazarettos",
        "cruise_ship_covid_2020",
    }

    for module in modules:
        assert module["source_ids"]
        assert module["confidence"] in {"high", "moderate", "low", "contested", "speculative"}
        assert module["uncertainty_note"]
        assert module["transmission_or_cause"]
        assert module["maritime_mechanism"]
        assert module["public_health_response"]
        assert module["human_burden"]["burden_type"] in {"exact", "estimated", "qualitative", "unknown"}
        assert module["human_burden"]["source_ids"]
        route = module["map_geometry_or_route"]
        assert route["claim_type"] in {
            "documented route",
            "typical route",
            "inferred route",
            "port location",
            "quarantine station",
            "region only",
        }
        assert route["route_confidence"] in {"high", "moderate", "low", "contested", "speculative"}
        assert route["source_ids"]


def test_maritime_module_source_ids_resolve_to_registry() -> None:
    payload = load_assignment(MODULES_PATH, "MARITIME_DISEASE_MODULES")
    registry = json.loads(SOURCE_REGISTRY_PATH.read_text())
    registry_ids = {source["source_id"] for source in registry["sources"]}

    used_ids: set[str] = set()
    for module in payload["modules"]:
        used_ids.update(module["source_ids"])
        used_ids.update(module["human_burden"]["source_ids"])
        used_ids.update(module["map_geometry_or_route"]["source_ids"])
        for claim in module.get("claims", []):
            used_ids.update(claim["source_ids"])

    assert used_ids <= registry_ids
    assert "wikipedia" not in " ".join(
        str(source.get("url_or_doi", "")).lower()
        for source in registry["sources"]
        if source["source_id"] in used_ids
    )


def test_maritime_map_features_expose_route_claim_type() -> None:
    atlas = load_assignment(ATLAS_DATA_PATH, "MARITIME_DISEASE_ATLAS_GEOJSON")
    for feature in atlas["features"]:
        props = feature["properties"]
        assert props["source_ids"]
        assert props["claim_type"]
        assert props["route_confidence"]
        if props["feature_type"] == "route":
            assert props["claim_type"] in {"documented route", "typical route", "inferred route", "region only"}


def test_maritime_ui_has_mechanism_filters_and_no_loading_placeholders() -> None:
    html = HTML_PATH.read_text()

    for expected in [
        "Mechanism first",
        "Case Studies",
        "module-setting-filter",
        "module-condition-filter",
        "module-mechanism-filter",
        "module-century-filter",
        "module-confidence-filter",
        "Quarantine infrastructure",
        "Not all ship disease is infection",
    ]:
        assert expected in html

    for forbidden in ["Loading disease profile", "Loading evidence panel", "Source review pending"]:
        assert forbidden not in html


def test_maritime_deferred_modules_keep_thin_claims_out() -> None:
    payload = load_assignment(MODULES_PATH, "MARITIME_DISEASE_MODULES")
    deferred_text = " ".join(item["candidate"] + " " + item["reason"] for item in payload["deferred_modules"]).lower()

    assert "barbary captivity" in deferred_text
    assert "convict ships" in deferred_text
    assert "hantavirus" in deferred_text
    assert "algiers plague" in deferred_text or "algiers plague" in (PROJECT_ROOT / "notes" / "maritime-disease-atlas-source-triage.md").read_text().lower()
