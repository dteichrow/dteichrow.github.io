from __future__ import annotations

import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROFILE_PATH = PROJECT_ROOT / "external" / "pathogen_atlas" / "source_backed_profiles.json"
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"
ATLAS_HTML_PATH = PROJECT_ROOT / "external" / "pathogen_atlas" / "index.html"


def load_profiles() -> dict:
    return json.loads(PROFILE_PATH.read_text())


def load_registry() -> dict[str, dict]:
    registry = json.loads(SOURCE_REGISTRY_PATH.read_text())
    return {source["source_id"]: source for source in registry["sources"]}


def test_pathogen_atlas_has_curated_source_backed_profile_set() -> None:
    payload = load_profiles()
    registry = load_registry()
    entries = payload["atlas"]

    assert payload["schema_version"] == "2.0.0"
    assert 12 <= len(entries) <= 20
    assert payload["source_audit"]["excluded_source_policy"]

    expected_slugs = {
        "variola-smallpox",
        "yersinia-pestis-plague",
        "vibrio-cholerae-cholera",
        "mycobacterium-tuberculosis-complex",
        "influenza-a",
        "measles-virus",
        "yellow-fever-virus",
        "dengue-virus",
        "malaria-parasites",
        "hantaviruses",
        "hiv-1",
        "sars-cov-2",
        "poliovirus",
        "treponema-pallidum-syphilis",
        "salmonella-enterica",
        "rickettsia-prowazekii-epidemic-typhus",
    }
    assert {entry["slug"] for entry in entries} == expected_slugs

    used_source_ids: set[str] = set()
    for entry in entries:
        assert entry["source_ids"]
        used_source_ids.update(entry["source_ids"])
        assert entry["origin_claim"]["source_ids"]
        assert entry["origin_confidence"] in {"high", "moderate", "low", "contested", "unknown"}
        assert entry["origin_uncertainty_note"]
        assert entry["earliest_strong_evidence"]["source_ids"]
        assert entry["ancient_dna_evidence"]["status"] in {"yes", "no", "limited", "not applicable"}
        assert entry["major_historical_episodes"]
        assert entry["evidence_panel"]["major_uncertainties"]
        assert entry["claims"]
        assert isinstance(entry["review_needed"], bool)

        for episode in entry["major_historical_episodes"]:
            assert episode["source_ids"]
            used_source_ids.update(episode["source_ids"])
        for claim in entry["claims"]:
            assert claim["source_ids"]
            used_source_ids.update(claim["source_ids"])
        for lane_key in (
            "textual_historical",
            "archaeological_skeletal",
            "ancient_dna_genomic",
            "ecological_vector_reservoir",
            "modern_epidemiologic",
        ):
            assert entry["evidence_panel"][lane_key]["source_ids"]
            used_source_ids.update(entry["evidence_panel"][lane_key]["source_ids"])
        for layer in entry.get("geography_layers", []):
            assert layer["source_ids"]
            assert layer["claim_type"]
            used_source_ids.update(layer["source_ids"])
        for route in entry.get("spread_routes", []):
            assert route["source_ids"]
            assert route["claim_type"]
            used_source_ids.update(route["source_ids"])

    missing = sorted(used_source_ids - set(registry))
    assert missing == []
    assert not [
        source_id
        for source_id in used_source_ids
        if "wikipedia.org" in str(registry[source_id].get("url_or_doi", "")).lower()
    ]


def test_pathogen_atlas_ui_exposes_evidence_confidence_and_no_loading_shell() -> None:
    atlas_html = ATLAS_HTML_PATH.read_text()

    assert "What kind of evidence do we have?" in atlas_html
    assert "How to read uncertainty" in atlas_html
    assert "Known / inferred / contested / unknown" in atlas_html
    assert 'id="origin-confidence-select"' in atlas_html
    assert 'id="evidence-type-select"' in atlas_html
    assert "function renderEvidenceKindList" in atlas_html
    assert "origin_uncertainty_note" in atlas_html
    assert "claim_type" in atlas_html
    assert "Loading disease profile" not in atlas_html
    assert "Loading evidence panel" not in atlas_html
    assert "Source review pending" not in atlas_html


def test_pathogen_atlas_defers_messy_or_fast_moving_profiles() -> None:
    payload = load_profiles()
    deferred_names = {item["name"] for item in payload["deferred_profiles"]}

    assert "Bartonella quintana / trench fever" in deferred_names
    assert "H5N1 avian influenza as a standalone profile" in deferred_names
    assert "Prion diseases" in deferred_names
