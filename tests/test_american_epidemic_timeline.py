from __future__ import annotations

import datetime as dt
import json
import re
from collections import Counter
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "external" / "american_epidemic_timeline" / "data" / "american_epidemic_timeline_data.js"
APP_PATH = PROJECT_ROOT / "external" / "american_epidemic_timeline" / "index.html"
ALLOWED_CONFIDENCE = {"high", "moderate", "low", "contested", "speculative"}
ALLOWED_PERIODS = {"Indigenous", "colonial", "early republic", "19th century", "Progressive Era", "20th century", "modern"}
ALLOWED_TRANSMISSION = {
    "respiratory",
    "fecal-oral/waterborne",
    "vector-borne",
    "foodborne",
    "sexually transmitted",
    "bloodborne",
    "zoonotic/environmental",
    "toxin/poisoning",
    "unknown/contested",
}
UNCERTAINTY_WORDS = re.compile(r"\b(uncertain|contested|disputed|diagnosis|retrospective|unknown|limited|not clean|not precise)\b", re.I)
PLACEHOLDER_WORDS = re.compile(r"\b(TBD|TODO|placeholder|lorem ipsum|source review pending|not specified)\b", re.I)


def load_timeline_data() -> dict:
    text = DATA_PATH.read_text()
    match = re.search(r"window\.AMERICAN_EPIDEMIC_TIMELINE_DATA\s*=\s*(\{.*\});\s*$", text, flags=re.S)
    assert match is not None
    return json.loads(match.group(1))


def test_timeline_data_schema_and_seed_depth() -> None:
    data = load_timeline_data()
    events = data["events"]
    tiers = {tier: sum(1 for event in events if event["significance_tier"] == tier) for tier in ["hero", "major", "regional"]}

    assert data["schema_version"] == "2.0.0"
    assert 30 <= len(events) <= 50
    assert tiers["hero"] >= 15
    assert tiers["major"] >= 15
    assert tiers["hero"] + tiers["major"] + tiers["regional"] == len(events)
    assert len(data["sources"]) >= 60
    assert len(data["assets"]) >= 25
    assert set(data["periods"]) == ALLOWED_PERIODS
    assert set(data["transmission_categories"]) == ALLOWED_TRANSMISSION
    assert len(data["excluded_candidates"]) >= 4
    assert len(data["future_human_review_claims"]) >= 3


def test_timeline_events_have_valid_references_and_dates() -> None:
    data = load_timeline_data()
    era_ids = {era["id"] for era in data["eras"]}
    disease_ids = {group["id"] for group in data["disease_groups"]}
    source_ids = {source["id"] for source in data["sources"]}
    asset_ids = {asset["id"] for asset in data["assets"]}
    required = {
        "id",
        "title",
        "start_date",
        "end_date",
        "date_precision",
        "start_year",
        "end_year",
        "date_display",
        "century",
        "polity_scope",
        "geography",
        "pathogen_or_syndrome",
        "pathogen_or_agent",
        "disease_or_condition",
        "disease_group",
        "transmission_ecology",
        "transmission_category",
        "significance_tier",
        "case_estimate",
        "death_estimate",
        "uncertainty_note",
        "mortality_or_burden_note",
        "historical_thesis",
        "historical_context",
        "summary_1_sentence",
        "public_health_response",
        "public_health_significance",
        "confidence",
        "source_ids",
        "asset_ids",
        "related_posts",
        "related_tool_links",
        "related_blog_links",
        "period_tags",
        "setting_tags",
        "modern_location_tags",
        "claims",
        "tags",
    }
    event_ids = [event["id"] for event in data["events"]]

    assert len(event_ids) == len(set(event_ids))
    for event in data["events"]:
        assert required <= set(event)
        assert re.fullmatch(r"[a-z0-9-]+", event["id"])
        assert event["era_id"] in era_ids
        assert event["disease_group"] in disease_ids
        assert event["significance_tier"] in {"hero", "major", "regional"}
        assert event["confidence"] in ALLOWED_CONFIDENCE
        assert event["transmission_category"] in ALLOWED_TRANSMISSION
        assert event["period_tags"]
        assert set(event["period_tags"]) <= ALLOWED_PERIODS
        assert event["setting_tags"]
        assert event["modern_location_tags"]
        assert isinstance(event["related_tool_links"], list)
        assert isinstance(event["related_blog_links"], list)
        assert not PLACEHOLDER_WORDS.search(json.dumps(event))
        assert len(event["source_ids"]) >= 2
        assert set(event["source_ids"]) <= source_ids
        assert event["asset_ids"]
        assert set(event["asset_ids"]) <= asset_ids
        start = dt.date.fromisoformat(event["start_date"])
        end = dt.date.fromisoformat(event["end_date"])
        assert start <= end
        assert event["start_year"] == start.year
        assert event["end_year"] == end.year
        for claim in event["claims"]:
            assert claim["claim"]
            assert claim["confidence"] in ALLOWED_CONFIDENCE
            assert set(claim["source_ids"]) <= source_ids
        if event["confidence"] in {"low", "contested", "speculative"} or event["pathogen_or_agent"] in {"unknown", "contested", "not applicable"}:
            assert UNCERTAINTY_WORDS.search(event["uncertainty_note"])


def test_timeline_sources_and_assets_are_public_facing() -> None:
    data = load_timeline_data()
    source_ids = [source["id"] for source in data["sources"]]
    asset_ids = [asset["id"] for asset in data["assets"]]

    assert len(source_ids) == len(set(source_ids))
    assert len(asset_ids) == len(set(asset_ids))
    for source in data["sources"]:
        assert source["title"]
        assert source["url"].startswith("https://")
        assert "wikipedia.org" not in source["url"].lower()
        assert source["source_type"]

    for asset in data["assets"]:
        assert asset["local_path"]
        assert asset["source_url"].startswith("https://")
        assert asset["rights"]
        assert asset["credit"]
        assert asset["alt"]
        assert isinstance(asset["usage_start_year"], int)
        assert isinstance(asset["usage_end_year"], int)
        assert asset["usage_start_year"] <= asset["usage_end_year"]
        assert asset["temporal_note"]
        assert "rights not evaluated" not in asset["rights"].lower()

    hero_asset_ids = {
        asset_id
        for event in data["events"]
        if event["significance_tier"] == "hero"
        for asset_id in event["asset_ids"]
    }
    asset_by_id = {asset["id"]: asset for asset in data["assets"]}
    assert all("rights not evaluated" not in asset_by_id[asset_id]["rights"].lower() for asset_id in hero_asset_ids)


def test_timeline_event_images_fit_asset_temporal_ranges() -> None:
    data = load_timeline_data()
    asset_by_id = {asset["id"]: asset for asset in data["assets"]}
    violations = []

    for event in data["events"]:
        event_year = int(event["start_date"][:4])
        for asset_id in event["asset_ids"]:
            asset = asset_by_id[asset_id]
            if not asset["usage_start_year"] <= event_year <= asset["usage_end_year"]:
                violations.append(
                    {
                        "event_id": event["id"],
                        "event_year": event_year,
                        "asset_id": asset_id,
                        "asset_range": (asset["usage_start_year"], asset["usage_end_year"]),
                    }
                )

    assert violations == []


def test_timeline_asset_files_are_local_real_images() -> None:
    data = load_timeline_data()

    for asset in data["assets"]:
        local_path = asset["local_path"]
        candidates = [
            (APP_PATH.parent / local_path).resolve(),
            (PROJECT_ROOT / "docs" / "tools" / "american-epidemic-timeline" / local_path).resolve(),
        ]
        if local_path.startswith("../../atlases/maritime/"):
            maritime_relative = local_path.replace("../../atlases/maritime/", "")
            candidates.extend(
                [
                    (PROJECT_ROOT / "external" / "maritime_disease_atlas" / maritime_relative).resolve(),
                    (PROJECT_ROOT / "docs" / "atlases" / "maritime" / maritime_relative).resolve(),
                ]
            )

        existing = [path for path in candidates if path.is_file()]
        assert existing, f"{asset['id']} has no local image file at {local_path}"
        payload = existing[0].read_bytes()[:512]
        assert existing[0].stat().st_size > 3000, f"{asset['id']} looks too small to be a real visual asset"
        assert b"<html" not in payload.lower(), f"{asset['id']} points to an HTML error page, not an image"


def test_timeline_asset_reuse_stays_visually_diverse() -> None:
    data = load_timeline_data()
    counts = Counter(asset_id for event in data["events"] for asset_id in event["asset_ids"])

    assert counts.most_common(1)[0][1] <= 6


def test_timeline_early_entries_do_not_overuse_atlantic_map() -> None:
    data = load_timeline_data()
    early_events = [event for event in data["events"] if int(event["start_date"][:4]) <= 1853]
    atlantic_map_events = [event["id"] for event in early_events if "atlantic-map" in event["asset_ids"]]

    assert len(atlantic_map_events) <= 1
    assert {
        "new-england-smith-1616",
        "boylston-smallpox-inoculation-title",
        "washington-crossing",
        "yellow-fever-1793-title-page",
        "john-lea-cholera",
        "new-orleans-sanitary-map-1853",
    } <= {asset_id for event in early_events for asset_id in event["asset_ids"]}


def test_timeline_excluded_candidates_keep_scope_conservative() -> None:
    data = load_timeline_data()
    excluded_text = json.dumps(data["excluded_candidates"]).lower()

    for phrase in ["pontiac", "flint", "opioid", "h5n1", "recent measles"]:
        assert phrase in excluded_text


def test_timeline_app_exposes_required_interactions() -> None:
    html = APP_PATH.read_text()
    required_tokens = [
        'id="timelineList"',
        'id="searchInput"',
        'id="eraFilter"',
        'id="diseaseFilter"',
        'id="transmissionFilter"',
        'id="periodFilter"',
        'id="settingFilter"',
        'id="confidenceFilter"',
        'id="detailDrawer"',
        'id="tableView"',
        'id="compareView"',
        'id="motionToggle"',
        "Why this matters",
        "How to read uncertainty",
        "sourcePills",
        "evidenceBadges",
        "summary_1_sentence",
        "public_health_significance",
        "data-fallback-src",
        "imageFallbackAttrs",
        "IntersectionObserver",
        "american_epidemic_timeline_data.js",
    ]

    for token in required_tokens:
        assert token in html
