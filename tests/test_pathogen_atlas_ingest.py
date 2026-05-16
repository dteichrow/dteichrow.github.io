from __future__ import annotations

import json
from pathlib import Path

from src import pathogen_atlas_ingest as ingest


def valid_entry(slug: str = "test-fever") -> dict:
    return {
        "slug": slug,
        "name": "Test fever",
        "subtitle": "A source-backed test disease entry",
        "status": "mixed",
        "pathogen_type": "Virus",
        "summary": "A concise public-health summary.",
        "why_it_matters": "It tests the atlas ingestion path.",
        "atlas_scope": "Test geography and transmission",
        "category": "airborne-respiratory",
        "category_label": "Airborne / respiratory",
        "transmission_group": "Airborne / respiratory",
        "origin_claim": {
            "label": "Test origin frame",
            "coordinates": [10.0, 20.0],
            "date_or_era": "Twentieth century recognition",
            "confidence": "mixed",
            "narrative": "A deliberately cautious origin claim.",
            "citation_ids": ["cdc-test"],
        },
        "spread_routes": [
            {
                "route_id": f"{slug}-route",
                "from_label": "Origin",
                "to_label": "Destination",
                "from_coordinates": [10.0, 20.0],
                "to_coordinates": [15.0, 25.0],
                "date_or_era": "Modern surveillance period",
                "route_type": "spread",
                "confidence": "moderate",
                "narrative": "A source-backed route claim.",
                "citation_ids": ["cdc-test"],
            }
        ],
        "modern_echoes": ["Modern surveillance still depends on source quality."],
        "framing_traps": ["Do not overread a test fixture as epidemiology."],
        "linked_reference_slug": "",
        "linked_story_ids": [],
        "linked_blog_posts": [],
        "citations": [
            {
                "id": "cdc-test",
                "short_citation": "CDC. Test disease facts.",
                "url": "https://www.cdc.gov/test-disease/about/index.html",
                "claim_supported": "Supports the fixture origin and route claims.",
                "note": "Official source fixture.",
            }
        ],
        "writing_state": "not_yet_written",
    }


def test_slugify_and_candidate_merge_are_stable() -> None:
    assert ingest.slugify("Crimean-Congo hemorrhagic fever") == "crimean-congo-hemorrhagic-fever"
    merged = ingest.merge_candidates(
        [
            {"slug": "test-fever", "name": "Test fever", "aliases": ["TF"], "source_seeds": ["wikidata"], "priority_tier": 3},
            {"slug": "test-fever", "name": "Test fever", "aliases": ["Test fever virus"], "source_seeds": ["wikipedia"], "priority_tier": 1},
        ]
    )
    assert len(merged) == 1
    assert merged[0]["aliases"] == ["TF", "Test fever virus"]
    assert merged[0]["source_seeds"] == ["wikidata", "wikipedia"]
    assert merged[0]["priority_tier"] == 1


def test_validate_entry_rejects_wikipedia_only_citations() -> None:
    entry = valid_entry()
    entry["citations"][0]["url"] = "https://en.wikipedia.org/wiki/Test_fever"
    errors = ingest.validate_entry(entry)
    assert any("Wikipedia" in error for error in errors)
    assert any("non-Wikipedia" in error for error in errors)


def test_validate_entry_rejects_doi_urls() -> None:
    entry = valid_entry()
    entry["citations"][0]["url"] = "https://doi.org/10.1234/fake-fixture"
    errors = ingest.validate_entry(entry)
    assert any("DOI URL" in error for error in errors)
    assert any("non-Wikipedia accepted evidence source" in error for error in errors)


def test_validate_entry_rejects_missing_route_coordinates() -> None:
    entry = valid_entry()
    entry["spread_routes"][0].pop("to_coordinates")
    errors = ingest.validate_entry(entry)
    assert any("to_coordinates" in error for error in errors)


def test_validate_entry_accepts_cited_geography_layer() -> None:
    entry = valid_entry()
    entry["geography_layers"] = [
        {
            "layer_id": "test-global-layer",
            "label": "Global test layer",
            "layer_type": "global_distribution",
            "geometry_type": "world",
            "confidence": "moderate",
            "narrative": "A cited global distribution layer.",
            "citation_ids": ["cdc-test"],
        }
    ]
    assert ingest.validate_entry(entry) == []


def test_validate_entry_accepts_ellipse_geography_layer() -> None:
    entry = valid_entry()
    entry["geography_layers"] = [
        {
            "layer_id": "test-ellipse-layer",
            "label": "Soft realm test layer",
            "layer_type": "endemic_zone",
            "geometry_type": "ellipse",
            "center": [20.0, 10.0],
            "radius_lng": 12.0,
            "radius_lat": 8.0,
            "rotation_degrees": -15,
            "confidence": "moderate",
            "narrative": "A cited schematic realm layer.",
            "citation_ids": ["cdc-test"],
        }
    ]
    assert ingest.validate_entry(entry) == []


def test_validate_entry_rejects_uncited_geography_layer() -> None:
    entry = valid_entry()
    entry["geography_layers"] = [
        {
            "layer_id": "test-bad-layer",
            "label": "Bad test layer",
            "layer_type": "endemic_zone",
            "geometry_type": "bbox",
            "bounds": [[-10.0, -5.0], [10.0, 5.0]],
            "confidence": "moderate",
            "narrative": "A layer without citation support.",
            "citation_ids": ["missing-source"],
        }
    ]
    errors = ingest.validate_entry(entry)
    assert any("citation_ids include unknown citation ids" in error for error in errors)


def test_validate_entry_rejects_unknown_category() -> None:
    entry = valid_entry()
    entry["category"] = "vibes"
    errors = ingest.validate_entry(entry)
    assert any("unknown category" in error for error in errors)


def test_validate_entry_accepts_other_arthropod_category() -> None:
    entry = valid_entry()
    entry["category"] = "other-arthropod-borne"
    entry["category_label"] = "Other arthropod-borne"
    entry["transmission_group"] = "Other arthropod-borne"
    assert ingest.validate_entry(entry) == []


def test_validate_entry_rejects_unknown_pathogen_type() -> None:
    entry = valid_entry()
    entry["pathogen_type"] = "Mood"
    errors = ingest.validate_entry(entry)
    assert any("unknown pathogen_type" in error for error in errors)


def test_promote_reviewed_entries_skips_existing_without_overwrite(tmp_path: Path) -> None:
    existing = valid_entry("already-live")
    incoming_existing = valid_entry("already-live")
    incoming_existing["name"] = "Changed name that should not overwrite"
    incoming_new = valid_entry("new-fever")
    drafts_path = tmp_path / "drafts.json"
    extra_path = tmp_path / "extra_pathogens.json"
    atlas_export_path = tmp_path / "atlas.json"
    drafts_path.write_text(
        json.dumps(
            {
                "drafts": [
                    dict(incoming_existing, review_status="reviewed"),
                    dict(incoming_new, review_status="reviewed"),
                ]
            }
        )
    )
    extra_path.write_text(json.dumps({"atlas": [existing]}))
    atlas_export_path.write_text(json.dumps({"atlas": []}))

    result = ingest.promote_reviewed_entries(
        drafts_path=drafts_path,
        extra_pathogens_path=extra_path,
        atlas_export_path=atlas_export_path,
    )

    promoted = json.loads(extra_path.read_text())["atlas"]
    assert result["promoted"] == 1
    assert result["skipped_existing"] == 1
    assert [entry["slug"] for entry in promoted] == ["already-live", "new-fever"]
    assert promoted[0]["name"] == "Test fever"


def test_enrich_candidates_creates_review_shells_not_public_entries() -> None:
    candidate = ingest.candidate_record(
        name="Example fever",
        description="A mosquito-borne infectious disease candidate.",
        source="test",
    )
    drafts = ingest.enrich_candidates([candidate])
    draft = drafts["drafts"][0]
    assert drafts["draft_count"] == 1
    assert draft["review_status"] == "needs_source_pack"
    assert draft["category"] == "mosquito-borne"
    assert any(query["source"] == "WHO" for query in draft["source_queries"])
