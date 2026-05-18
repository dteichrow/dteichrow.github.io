#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"
TIMELINE_DATA_PATH = PROJECT_ROOT / "external" / "american_epidemic_timeline" / "data" / "american_epidemic_timeline_data.js"
PATHOGEN_DATA_PATH = PROJECT_ROOT / "external" / "pathogen_atlas" / "data" / "pathogen_atlas_data.js"
MARITIME_DATA_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_atlas_data.js"
MARITIME_MODULES_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_disease_modules.js"
MARITIME_YOUTUBE_PLAN_PATH = PROJECT_ROOT / "external" / "maritime_disease_atlas" / "data" / "maritime_youtube_video_plan.js"

ALLOWED_CONFIDENCE = {"high", "moderate", "low", "contested", "speculative"}
ALLOWED_TIMELINE_TRANSMISSION = {
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
ALLOWED_TIMELINE_PERIODS = {"Indigenous", "colonial", "early republic", "19th century", "Progressive Era", "20th century", "modern"}
ALLOWED_PATHOGEN_TYPES = {"virus", "bacterium", "parasite", "prion", "toxin", "other"}
ALLOWED_PATHOGEN_ORIGIN_CONFIDENCE = ALLOWED_CONFIDENCE | {"unknown"}
ALLOWED_PATHOGEN_ANCIENT_DNA = {"yes", "no", "limited", "not applicable"}
ALLOWED_PATHOGEN_EVIDENCE_STATUS = {"strong", "moderate", "limited", "absent", "not_applicable", "not applicable", "contested"}
ALLOWED_MARITIME_TRANSMISSION = {
    "respiratory crowding",
    "fecal-oral/waterborne",
    "vector-borne",
    "nutritional deficiency",
    "food spoilage/toxin",
    "wound infection",
    "quarantine exposure",
    "unknown/contested",
}
ALLOWED_MARITIME_CLAIM_TYPES = {
    "documented route",
    "typical route",
    "inferred route",
    "port location",
    "quarantine station",
    "region only",
}
ALLOWED_MARITIME_BURDEN_TYPES = {"exact", "estimated", "qualitative", "unknown"}
UNCERTAINTY_CONFIDENCE = {"low", "contested", "speculative"}
STRONG_CAUSAL_TERMS = re.compile(r"\b(proved|definitively|wiped out)\b", re.I)
SUPPORTED_CAUSE_TERM = re.compile(r"\bcaused\b", re.I)
UNCERTAINTY_TERMS = re.compile(r"\b(uncertain|contested|disputed|debated|hypothesis|model-dependent|speculative)\b", re.I)
PLACEHOLDER_TERMS = re.compile(r"\b(TBD|TODO|placeholder|lorem ipsum|source review pending|not specified)\b", re.I)


def load_json_assignment(path: Path, assignment_name: str) -> Any:
    text = path.read_text()
    if assignment_name == "MARITIME_DISEASE_ATLAS_GEOJSON":
        marker = "window.MARITIME_DISEASE_ATLAS_GEOJSON = "
        next_marker = "\n\nwindow.MARITIME_DISEASE_SCENARIOS = "
        start = text.index(marker) + len(marker)
        end = text.index(next_marker, start)
        return json.loads(text[start:end].rstrip().removesuffix(";"))
    if assignment_name == "MARITIME_DISEASE_SCENARIOS":
        marker = "window.MARITIME_DISEASE_SCENARIOS = "
        start = text.index(marker) + len(marker)
        return json.loads(text[start:].strip().removesuffix(";"))
    if assignment_name == "MARITIME_DISEASE_MODULES":
        marker = "window.MARITIME_DISEASE_MODULES = "
        start = text.index(marker) + len(marker)
        return json.loads(text[start:].strip().removesuffix(";"))

    pattern = rf"window\.{re.escape(assignment_name)}\s*=\s*(\{{.*\}});\s*$"
    match = re.search(pattern, text, flags=re.S)
    if not match:
        raise ValueError(f"Could not locate window.{assignment_name} assignment in {path}")
    return json.loads(match.group(1))


def require_nonempty(errors: list[str], path: str, item: dict[str, Any], fields: tuple[str, ...]) -> None:
    for field in fields:
        value = item.get(field)
        if value is None or value == "" or value == []:
            errors.append(f"{path} missing nonempty {field}")


def source_ids_from(item: dict[str, Any], key: str = "source_ids") -> list[str]:
    value = item.get(key, [])
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        return [str(source_id) for source_id in value if str(source_id).strip()]
    return []


def validate_source_ids(errors: list[str], path: str, ids: list[str], registry_ids: set[str]) -> None:
    if not ids:
        errors.append(f"{path} must cite at least one source_id")
        return
    missing = sorted(set(ids) - registry_ids)
    if missing:
        errors.append(f"{path} cites unknown source_id(s): {', '.join(missing)}")


def validate_confidence(errors: list[str], path: str, item: dict[str, Any]) -> None:
    confidence = item.get("confidence")
    if confidence not in ALLOWED_CONFIDENCE:
        errors.append(f"{path} has invalid confidence {confidence!r}; allowed: {', '.join(sorted(ALLOWED_CONFIDENCE))}")


def uncertainty_note(item: dict[str, Any]) -> str:
    for key in ("uncertainty_note", "evidence_note", "note", "notes"):
        value = item.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return ""


def validate_uncertainty_note(errors: list[str], path: str, item: dict[str, Any]) -> None:
    confidence = item.get("confidence")
    if confidence in UNCERTAINTY_CONFIDENCE and not uncertainty_note(item):
        errors.append(f"{path} is {confidence} but has no uncertainty_note/evidence_note/note")
    text = " ".join(
        str(item.get(key, ""))
        for key in (
            "title",
            "summary",
            "caption",
            "mechanism",
            "copy",
            "narrative",
            "historical_thesis",
            "transmission_ecology",
            "claim",
            "notes",
        )
    )
    if confidence in {"contested", "speculative"} and not UNCERTAINTY_TERMS.search(text + " " + uncertainty_note(item)):
        errors.append(f"{path} is {confidence} but does not visibly name the uncertainty")


def validate_causal_language(errors: list[str], path: str, item: dict[str, Any], source_ids: list[str]) -> None:
    text_fields = (
        "title",
        "summary",
        "caption",
        "mechanism",
        "copy",
        "narrative",
        "historical_thesis",
        "public_health_response",
        "transmission_ecology",
        "claim",
        "notes",
    )
    text = " ".join(str(item.get(field, "")) for field in text_fields)
    if STRONG_CAUSAL_TERMS.search(text) and not item.get("allow_strong_causal_language"):
        errors.append(f"{path} uses strong causal language without allow_strong_causal_language=true")
    if SUPPORTED_CAUSE_TERM.search(text) and not source_ids:
        errors.append(f"{path} uses 'caused' without source support")


def validate_no_placeholders(errors: list[str], path: str, item: dict[str, Any]) -> None:
    text = " ".join(
        str(item.get(field, ""))
        for field in (
            "title",
            "summary_1_sentence",
            "historical_context",
            "public_health_significance",
            "uncertainty_note",
            "mortality_or_burden_note",
            "historical_thesis",
            "public_health_response",
        )
    )
    if PLACEHOLDER_TERMS.search(text):
        errors.append(f"{path} contains placeholder text")


def validate_claims(errors: list[str], path: str, item: dict[str, Any], registry_ids: set[str]) -> None:
    claims = item.get("claims")
    if claims is None:
        return
    if not isinstance(claims, list):
        errors.append(f"{path}.claims must be a list")
        return
    for index, claim in enumerate(claims):
        claim_path = f"{path}.claims[{index}]"
        if not isinstance(claim, dict):
            errors.append(f"{claim_path} must be an object")
            continue
        require_nonempty(errors, claim_path, claim, ("claim", "source_ids", "confidence", "claim_type"))
        ids = source_ids_from(claim)
        validate_source_ids(errors, claim_path, ids, registry_ids)
        validate_confidence(errors, claim_path, claim)
        validate_uncertainty_note(errors, claim_path, claim)
        validate_causal_language(errors, claim_path, claim, ids)


def validate_registry(project_root: Path = PROJECT_ROOT) -> tuple[dict[str, Any], list[str]]:
    path = project_root / "data" / "sources" / "sources.json"
    errors: list[str] = []
    if not path.exists():
        return {}, [f"Missing source registry: {path}"]
    registry = json.loads(path.read_text())
    sources = registry.get("sources")
    if not isinstance(sources, list):
        return registry, ["source registry must contain a sources list"]

    required = {
        "source_id",
        "full_citation",
        "short_citation",
        "authors",
        "year",
        "title",
        "publication_or_publisher",
        "url_or_doi",
        "source_type",
        "topic_tags",
        "notes_on_use",
        "reliability_notes",
    }
    ids: list[str] = []
    for index, source in enumerate(sources):
        path_label = f"sources[{index}]"
        if not isinstance(source, dict):
            errors.append(f"{path_label} is not an object")
            continue
        missing_fields = required - set(source)
        if missing_fields:
            errors.append(f"{path_label} missing field(s): {', '.join(sorted(missing_fields))}")
        ids.append(str(source.get("source_id", "")))
        for field in (
            "source_id",
            "full_citation",
            "short_citation",
            "year",
            "title",
            "publication_or_publisher",
            "source_type",
            "notes_on_use",
            "reliability_notes",
        ):
            if not str(source.get(field, "")).strip():
                errors.append(f"{path_label} missing nonempty {field}")
        if not isinstance(source.get("authors", []), list) or not source.get("authors"):
            errors.append(f"{path_label}.authors must be a nonempty list")
        if not isinstance(source.get("topic_tags", []), list) or not source.get("topic_tags"):
            errors.append(f"{path_label}.topic_tags must be a nonempty list")
    duplicates = sorted({source_id for source_id in ids if ids.count(source_id) > 1 and source_id})
    if duplicates:
        errors.append(f"Duplicate source_id(s): {', '.join(duplicates)}")
    return registry, errors


def validate_timeline(registry_ids: set[str], project_root: Path = PROJECT_ROOT) -> list[str]:
    data = load_json_assignment(project_root / TIMELINE_DATA_PATH.relative_to(PROJECT_ROOT), "AMERICAN_EPIDEMIC_TIMELINE_DATA")
    errors: list[str] = []

    for source in data.get("sources", []):
        source_id = source.get("id")
        if source_id not in registry_ids:
            errors.append(f"american_timeline.sources[{source_id}] is not present in central registry")

    for event in data.get("events", []):
        path = f"american_timeline.events[{event.get('id', 'unknown')}]"
        require_nonempty(errors, path, event, ("id", "title", "start_date", "end_date", "historical_thesis", "transmission_ecology"))
        require_nonempty(
            errors,
            path,
            event,
            (
                "disease_or_condition",
                "pathogen_or_agent",
                "start_year",
                "end_year",
                "date_display",
                "modern_location_tags",
                "period_tags",
                "transmission_category",
                "setting_tags",
                "summary_1_sentence",
                "historical_context",
                "public_health_significance",
                "uncertainty_note",
                "mortality_or_burden_note",
                "confidence",
                "source_ids",
            ),
        )
        for optional_list_field in ("related_tool_links", "related_blog_links"):
            if optional_list_field not in event or not isinstance(event.get(optional_list_field), list):
                errors.append(f"{path} missing list field {optional_list_field}")
        ids = source_ids_from(event)
        validate_source_ids(errors, path, ids, registry_ids)
        validate_confidence(errors, path, event)
        validate_uncertainty_note(errors, path, event)
        validate_causal_language(errors, path, event, ids)
        validate_no_placeholders(errors, path, event)
        validate_claims(errors, path, event, registry_ids)
        if event.get("transmission_category") not in ALLOWED_TIMELINE_TRANSMISSION:
            errors.append(f"{path} has invalid transmission_category {event.get('transmission_category')!r}")
        if not isinstance(event.get("period_tags"), list) or not set(event.get("period_tags", [])) <= ALLOWED_TIMELINE_PERIODS:
            errors.append(f"{path} has invalid period_tags")
        if not isinstance(event.get("setting_tags"), list) or not event.get("setting_tags"):
            errors.append(f"{path} must have nonempty setting_tags")
        if not isinstance(event.get("modern_location_tags"), list) or not event.get("modern_location_tags"):
            errors.append(f"{path} must have nonempty modern_location_tags")
        if str(event.get("pathogen_or_agent", "")).lower() in {"unknown", "contested", "unknown/contested", "mixed/partly unknown"} and not UNCERTAINTY_TERMS.search(event.get("uncertainty_note", "")):
            errors.append(f"{path} has uncertain pathogen_or_agent but uncertainty_note does not explain uncertainty")
        if event.get("disease_group") == "uncertain" and event.get("confidence") != "contested":
            errors.append(f"{path} has disease_group=uncertain but confidence is not contested")
    return errors


def validate_pathogen(registry_ids: set[str], project_root: Path = PROJECT_ROOT) -> list[str]:
    data = load_json_assignment(project_root / PATHOGEN_DATA_PATH.relative_to(PROJECT_ROOT), "PATHOGEN_ATLAS_DATA")
    errors: list[str] = []

    entries = data.get("entries", [])
    if not 12 <= len(entries) <= 20:
        errors.append(f"pathogen_atlas must contain 12-20 curated source-backed profiles; found {len(entries)}")

    html_path = project_root / "external" / "pathogen_atlas" / "index.html"
    if html_path.exists():
        html_text = html_path.read_text()
        for phrase in ("Loading disease profile", "Loading evidence panel", "Source review pending"):
            if phrase in html_text:
                errors.append(f"pathogen_atlas.index contains forbidden loading/placeholder phrase: {phrase}")

    for entry in data.get("entries", []):
        path = f"pathogen_atlas.entries[{entry.get('slug') or entry.get('id') or 'unknown'}]"
        require_nonempty(
            errors,
            path,
            entry,
            (
                "id",
                "slug",
                "display_name",
                "name",
                "agent_name",
                "disease_names",
                "pathogen_type",
                "primary_reservoirs",
                "main_transmission_routes",
                "historical_signature",
                "origin_claim",
                "origin_confidence",
                "origin_uncertainty_note",
                "earliest_strong_evidence",
                "ancient_dna_evidence",
                "major_historical_episodes",
                "transmission_ecology",
                "public_health_control",
                "modern_status",
                "confidence",
                "source_ids",
                "evidence_panel",
            ),
        )
        ids = source_ids_from(entry)
        validate_source_ids(errors, path, ids, registry_ids)
        validate_confidence(errors, path, entry)
        validate_causal_language(errors, path, entry, ids)
        validate_claims(errors, path, entry, registry_ids)
        validate_no_placeholders(errors, path, entry)

        if str(entry.get("pathogen_type", "")).lower() not in ALLOWED_PATHOGEN_TYPES:
            errors.append(f"{path} has invalid pathogen_type {entry.get('pathogen_type')!r}")
        if entry.get("origin_confidence") not in ALLOWED_PATHOGEN_ORIGIN_CONFIDENCE:
            errors.append(f"{path} has invalid origin_confidence {entry.get('origin_confidence')!r}")
        if entry.get("origin_confidence") in {"low", "contested", "unknown", "speculative"} and not entry.get("origin_uncertainty_note"):
            errors.append(f"{path} has uncertain origin_confidence but no origin_uncertainty_note")
        if not isinstance(entry.get("review_needed"), bool):
            errors.append(f"{path}.review_needed must be a boolean")
        if not isinstance(entry.get("disease_names"), list) or not entry.get("disease_names"):
            errors.append(f"{path}.disease_names must be a nonempty list")
        if not isinstance(entry.get("primary_reservoirs"), list) or not entry.get("primary_reservoirs"):
            errors.append(f"{path}.primary_reservoirs must be a nonempty list")
        if not isinstance(entry.get("main_transmission_routes"), list) or not entry.get("main_transmission_routes"):
            errors.append(f"{path}.main_transmission_routes must be a nonempty list")

        origin = entry.get("origin_claim")
        if not isinstance(origin, dict):
            errors.append(f"{path}.origin_claim must be an object")
        else:
            origin_path = f"{path}.origin_claim"
            require_nonempty(errors, origin_path, origin, ("claim", "label", "date_or_era", "narrative", "claim_type", "source_ids"))
            ids = source_ids_from(origin) or source_ids_from(origin, "citation_ids")
            validate_source_ids(errors, origin_path, ids, registry_ids)
            validate_confidence(errors, origin_path, origin)
            validate_uncertainty_note(errors, origin_path, origin)
            validate_causal_language(errors, origin_path, origin, ids)
            validate_claims(errors, origin_path, origin, registry_ids)
            if origin.get("coordinates") is not None and not origin.get("claim_type"):
                errors.append(f"{origin_path} has coordinates but no claim_type")

        earliest = entry.get("earliest_strong_evidence")
        if not isinstance(earliest, dict):
            errors.append(f"{path}.earliest_strong_evidence must be an object")
        else:
            earliest_path = f"{path}.earliest_strong_evidence"
            require_nonempty(errors, earliest_path, earliest, ("description", "evidence_type", "date_or_era", "location", "source_ids"))
            earliest_ids = source_ids_from(earliest)
            validate_source_ids(errors, earliest_path, earliest_ids, registry_ids)
            validate_causal_language(errors, earliest_path, earliest, earliest_ids)

        ancient = entry.get("ancient_dna_evidence")
        if not isinstance(ancient, dict):
            errors.append(f"{path}.ancient_dna_evidence must be an object")
        else:
            ancient_path = f"{path}.ancient_dna_evidence"
            require_nonempty(errors, ancient_path, ancient, ("status", "summary", "source_ids"))
            if ancient.get("status") not in ALLOWED_PATHOGEN_ANCIENT_DNA:
                errors.append(f"{ancient_path} has invalid status {ancient.get('status')!r}")
            ancient_ids = source_ids_from(ancient)
            validate_source_ids(errors, ancient_path, ancient_ids, registry_ids)
            validate_causal_language(errors, ancient_path, ancient, ancient_ids)

        evidence_panel = entry.get("evidence_panel")
        if not isinstance(evidence_panel, dict):
            errors.append(f"{path}.evidence_panel must be an object")
        else:
            for lane_key in ("textual_historical", "archaeological_skeletal", "ancient_dna_genomic", "ecological_vector_reservoir", "modern_epidemiologic"):
                lane = evidence_panel.get(lane_key)
                lane_path = f"{path}.evidence_panel.{lane_key}"
                if not isinstance(lane, dict):
                    errors.append(f"{lane_path} must be an object")
                    continue
                require_nonempty(errors, lane_path, lane, ("status", "summary", "source_ids"))
                if lane.get("status") not in ALLOWED_PATHOGEN_EVIDENCE_STATUS:
                    errors.append(f"{lane_path} has invalid status {lane.get('status')!r}")
                lane_ids = source_ids_from(lane)
                validate_source_ids(errors, lane_path, lane_ids, registry_ids)
                validate_causal_language(errors, lane_path, lane, lane_ids)
            uncertainties = evidence_panel.get("major_uncertainties", [])
            if not isinstance(uncertainties, list) or not uncertainties:
                errors.append(f"{path}.evidence_panel.major_uncertainties must be a nonempty list")
            for uncertainty_index, uncertainty in enumerate(uncertainties):
                uncertainty_path = f"{path}.evidence_panel.major_uncertainties[{uncertainty_index}]"
                if not isinstance(uncertainty, dict):
                    errors.append(f"{uncertainty_path} must be an object")
                    continue
                require_nonempty(errors, uncertainty_path, uncertainty, ("note", "source_ids"))
                validate_source_ids(errors, uncertainty_path, source_ids_from(uncertainty), registry_ids)

        episodes = entry.get("major_historical_episodes", [])
        if not isinstance(episodes, list) or not episodes:
            errors.append(f"{path}.major_historical_episodes must be a nonempty list")
        for index, episode in enumerate(episodes):
            episode_path = f"{path}.major_historical_episodes[{index}]"
            if not isinstance(episode, dict):
                errors.append(f"{episode_path} must be an object")
                continue
            require_nonempty(errors, episode_path, episode, ("title", "date_display", "locations", "summary", "confidence", "source_ids"))
            episode_ids = source_ids_from(episode)
            validate_source_ids(errors, episode_path, episode_ids, registry_ids)
            validate_confidence(errors, episode_path, episode)
            validate_uncertainty_note(errors, episode_path, episode)
            validate_causal_language(errors, episode_path, episode, episode_ids)

        for index, route in enumerate(entry.get("spread_routes", [])):
            route_path = f"{path}.spread_routes[{index}]"
            require_nonempty(errors, route_path, route, ("route_id", "from_label", "to_label", "date_or_era", "narrative", "claim_type", "source_ids"))
            ids = source_ids_from(route) or source_ids_from(route, "citation_ids")
            validate_source_ids(errors, route_path, ids, registry_ids)
            validate_confidence(errors, route_path, route)
            validate_uncertainty_note(errors, route_path, route)
            validate_causal_language(errors, route_path, route, ids)
            validate_claims(errors, route_path, route, registry_ids)
            if (route.get("from_coordinates") or route.get("to_coordinates")) and not route.get("claim_type"):
                errors.append(f"{route_path} has coordinates but no claim_type")

        for index, layer in enumerate(entry.get("geography_layers", [])):
            layer_path = f"{path}.geography_layers[{index}]"
            require_nonempty(errors, layer_path, layer, ("layer_id", "label", "layer_type", "geometry_type", "narrative", "claim_type", "source_ids"))
            ids = source_ids_from(layer) or source_ids_from(layer, "citation_ids")
            validate_source_ids(errors, layer_path, ids, registry_ids)
            validate_confidence(errors, layer_path, layer)
            validate_uncertainty_note(errors, layer_path, layer)
            validate_causal_language(errors, layer_path, layer, ids)
            validate_claims(errors, layer_path, layer, registry_ids)
    return errors


def validate_maritime(registry_ids: set[str], project_root: Path = PROJECT_ROOT) -> list[str]:
    atlas = load_json_assignment(project_root / MARITIME_DATA_PATH.relative_to(PROJECT_ROOT), "MARITIME_DISEASE_ATLAS_GEOJSON")
    scenarios = load_json_assignment(project_root / MARITIME_DATA_PATH.relative_to(PROJECT_ROOT), "MARITIME_DISEASE_SCENARIOS")
    modules_payload = load_json_assignment(project_root / MARITIME_MODULES_PATH.relative_to(PROJECT_ROOT), "MARITIME_DISEASE_MODULES")
    errors: list[str] = []

    html_path = project_root / "external" / "maritime_disease_atlas" / "index.html"
    if html_path.exists():
        html_text = html_path.read_text()
        for phrase in ("Loading disease profile", "Loading evidence panel", "Source review pending", "TODO", "TBD"):
            if phrase in html_text:
                errors.append(f"maritime_atlas.index contains forbidden loading/placeholder phrase: {phrase}")

    for feature in atlas.get("features", []):
        props = feature.get("properties", {})
        path = f"maritime_atlas.features[{props.get('id', 'unknown')}]"
        require_nonempty(errors, path, props, ("id", "name", "caption", "claim_type", "route_confidence"))
        ids = source_ids_from(props)
        validate_source_ids(errors, path, ids, registry_ids)
        validate_confidence(errors, path, props)
        validate_uncertainty_note(errors, path, props)
        validate_causal_language(errors, path, props, ids)
        validate_claims(errors, path, props, registry_ids)
        if props.get("claim_type") not in ALLOWED_MARITIME_CLAIM_TYPES:
            errors.append(f"{path} has invalid claim_type {props.get('claim_type')!r}")
        if props.get("route_confidence") not in ALLOWED_CONFIDENCE:
            errors.append(f"{path} has invalid route_confidence {props.get('route_confidence')!r}")
        if feature.get("geometry") and not ids:
            errors.append(f"{path} has mapped geometry without source_ids")

    for scenario_id, scenario in scenarios.items():
        path = f"maritime_atlas.scenarios[{scenario_id}]"
        require_nonempty(errors, path, scenario, ("title", "summary", "source_ids"))
        ids = source_ids_from(scenario)
        validate_source_ids(errors, path, ids, registry_ids)
        validate_confidence(errors, path, scenario)
        validate_uncertainty_note(errors, path, scenario)
        validate_causal_language(errors, path, scenario, ids)
        validate_claims(errors, path, scenario, registry_ids)
        for index, step in enumerate(scenario.get("steps", [])):
            step_path = f"{path}.steps[{index}]"
            require_nonempty(errors, step_path, step, ("kind", "title", "copy", "source_ids"))
            ids = source_ids_from(step)
            validate_source_ids(errors, step_path, ids, registry_ids)
            validate_confidence(errors, step_path, step)
            validate_uncertainty_note(errors, step_path, step)
            validate_causal_language(errors, step_path, step, ids)
            validate_claims(errors, step_path, step, registry_ids)
            if step.get("kind") == "plot" and step.get("claim_type") != "illustrative model":
                errors.append(f"{step_path} is a plot but is not marked claim_type='illustrative model'")

    modules = modules_payload.get("modules", [])
    if not 10 <= len(modules) <= 20:
        errors.append(f"maritime_atlas.modules must contain 10-20 source-backed modules; found {len(modules)}")

    module_source_ids = {source.get("source_id") for source in modules_payload.get("sources", []) if isinstance(source, dict)}
    for source_id in sorted(module_source_ids):
        if source_id not in registry_ids:
            errors.append(f"maritime_atlas.sources[{source_id}] is not present in central registry")

    required_module_fields = (
        "id",
        "title",
        "date_range",
        "geography",
        "route_or_setting",
        "diseases_or_conditions",
        "agents",
        "transmission_or_cause",
        "maritime_mechanism",
        "historical_context",
        "human_burden",
        "public_health_response",
        "uncertainty_note",
        "confidence",
        "source_ids",
        "map_geometry_or_route",
    )
    for module in modules:
        path = f"maritime_atlas.modules[{module.get('id', 'unknown')}]"
        require_nonempty(errors, path, module, required_module_fields)
        ids = source_ids_from(module)
        validate_source_ids(errors, path, ids, registry_ids)
        validate_confidence(errors, path, module)
        validate_uncertainty_note(errors, path, module)
        validate_causal_language(errors, path, module, ids)
        validate_claims(errors, path, module, registry_ids)
        validate_no_placeholders(errors, path, module)

        if not isinstance(module.get("diseases_or_conditions"), list) or not module.get("diseases_or_conditions"):
            errors.append(f"{path}.diseases_or_conditions must be a nonempty list")
        if not isinstance(module.get("agents"), list) or not module.get("agents"):
            errors.append(f"{path}.agents must be a nonempty list")
        causes = module.get("transmission_or_cause", [])
        if not isinstance(causes, list) or not causes:
            errors.append(f"{path}.transmission_or_cause must be a nonempty list")
        elif not set(causes) <= ALLOWED_MARITIME_TRANSMISSION:
            errors.append(f"{path}.transmission_or_cause has unsupported value(s): {', '.join(sorted(set(causes) - ALLOWED_MARITIME_TRANSMISSION))}")
        if not isinstance(module.get("mechanism_tags"), list) or not module.get("mechanism_tags"):
            errors.append(f"{path}.mechanism_tags must be a nonempty list")
        if not isinstance(module.get("century_tags"), list) or not module.get("century_tags"):
            errors.append(f"{path}.century_tags must be a nonempty list")
        if not isinstance(module.get("setting_tags"), list) or not module.get("setting_tags"):
            errors.append(f"{path}.setting_tags must be a nonempty list")

        burden = module.get("human_burden")
        if not isinstance(burden, dict):
            errors.append(f"{path}.human_burden must be an object")
        else:
            burden_path = f"{path}.human_burden"
            require_nonempty(errors, burden_path, burden, ("burden_type", "summary", "source_ids"))
            if burden.get("burden_type") not in ALLOWED_MARITIME_BURDEN_TYPES:
                errors.append(f"{burden_path} has invalid burden_type {burden.get('burden_type')!r}")
            burden_ids = source_ids_from(burden)
            validate_source_ids(errors, burden_path, burden_ids, registry_ids)
            validate_causal_language(errors, burden_path, burden, burden_ids)
            if re.search(r"\b\d[\d,]*(?:\.\d+)?\b", str(burden.get("summary", ""))) and burden.get("burden_type") not in {"exact", "estimated"}:
                errors.append(f"{burden_path} contains a number but burden_type is not exact/estimated")

        route = module.get("map_geometry_or_route")
        if not isinstance(route, dict):
            errors.append(f"{path}.map_geometry_or_route must be an object")
        else:
            route_path = f"{path}.map_geometry_or_route"
            require_nonempty(errors, route_path, route, ("geometry_type", "claim_type", "route_confidence", "source_ids"))
            route_ids = source_ids_from(route)
            validate_source_ids(errors, route_path, route_ids, registry_ids)
            if route.get("claim_type") not in ALLOWED_MARITIME_CLAIM_TYPES:
                errors.append(f"{route_path} has invalid claim_type {route.get('claim_type')!r}")
            if route.get("route_confidence") not in ALLOWED_CONFIDENCE:
                errors.append(f"{route_path} has invalid route_confidence {route.get('route_confidence')!r}")
            if route.get("coordinates") and not route_ids:
                errors.append(f"{route_path} has coordinates without source_ids")
            validate_causal_language(errors, route_path, route, route_ids)

    youtube_plan_path = project_root / MARITIME_YOUTUBE_PLAN_PATH.relative_to(PROJECT_ROOT)
    if youtube_plan_path.exists():
        youtube_plan = load_json_assignment(youtube_plan_path, "MARITIME_YOUTUBE_VIDEO_PLAN")
        plan_path = "maritime_atlas.youtube_video_plan"
        require_nonempty(errors, plan_path, youtube_plan, ("schema_version", "title", "runtime_target_seconds", "capture_entrypoint", "chapters", "shots", "narration_script"))
        runtime = youtube_plan.get("runtime_target_seconds")
        if not isinstance(runtime, int) or not 360 <= runtime <= 540:
            errors.append(f"{plan_path}.runtime_target_seconds must be an integer between 360 and 540")
        if "youtube=1" not in str(youtube_plan.get("capture_entrypoint", "")):
            errors.append(f"{plan_path}.capture_entrypoint must use youtube=1")

        scenario_ids = set(scenarios)
        module_ids = {module.get("id") for module in modules if isinstance(module, dict)}

        playback = youtube_plan.get("playback", {})
        playback_order = playback.get("scenario_order", []) if isinstance(playback, dict) else []
        if not isinstance(playback_order, list) or not playback_order:
            errors.append(f"{plan_path}.playback.scenario_order must be a nonempty list")
        else:
            missing_scenarios = sorted(set(playback_order) - scenario_ids)
            if missing_scenarios:
                errors.append(f"{plan_path}.playback.scenario_order cites unknown scenario(s): {', '.join(missing_scenarios)}")

        total_shot_seconds = 0
        for index, chapter in enumerate(youtube_plan.get("chapters", [])):
            chapter_path = f"{plan_path}.chapters[{index}]"
            require_nonempty(errors, chapter_path, chapter, ("id", "title", "duration_seconds", "scenarios", "source_ids", "narration_job", "uncertainty_note"))
            chapter_ids = source_ids_from(chapter)
            validate_source_ids(errors, chapter_path, chapter_ids, registry_ids)
            if set(chapter.get("scenarios", [])) - scenario_ids:
                errors.append(f"{chapter_path}.scenarios cites unknown scenario(s)")
            if set(chapter.get("module_ids", [])) - module_ids:
                errors.append(f"{chapter_path}.module_ids cites unknown module(s)")

        chapter_ids = {chapter.get("id") for chapter in youtube_plan.get("chapters", []) if isinstance(chapter, dict)}
        for index, shot in enumerate(youtube_plan.get("shots", [])):
            shot_path = f"{plan_path}.shots[{index}]"
            require_nonempty(errors, shot_path, shot, ("id", "chapter_id", "duration_seconds", "capture_url", "visual_beat", "narration_beat", "edit_notes", "source_ids"))
            shot_ids = source_ids_from(shot)
            validate_source_ids(errors, shot_path, shot_ids, registry_ids)
            if shot.get("chapter_id") not in chapter_ids:
                errors.append(f"{shot_path}.chapter_id does not resolve to a chapter")
            duration = shot.get("duration_seconds")
            if isinstance(duration, int):
                total_shot_seconds += duration
            else:
                errors.append(f"{shot_path}.duration_seconds must be an integer")
            capture_url = str(shot.get("capture_url", ""))
            if "youtube=1" not in capture_url:
                errors.append(f"{shot_path}.capture_url must use youtube=1")
            if "sound=1" in capture_url or "audio=1" in capture_url:
                errors.append(f"{shot_path}.capture_url must not enable sound by default")
            scenario_id = shot.get("scenario_id")
            if scenario_id is not None and scenario_id not in scenario_ids:
                errors.append(f"{shot_path}.scenario_id cites unknown scenario {scenario_id!r}")
            if set(shot.get("module_ids", [])) - module_ids:
                errors.append(f"{shot_path}.module_ids cites unknown module(s)")

        if runtime and abs(total_shot_seconds - runtime) > 5:
            errors.append(f"{plan_path}.shots total {total_shot_seconds}s does not match runtime target {runtime}s")

        for index, section in enumerate(youtube_plan.get("narration_script", [])):
            section_path = f"{plan_path}.narration_script[{index}]"
            require_nonempty(errors, section_path, section, ("chapter_id", "script", "source_ids", "review_note"))
            validate_source_ids(errors, section_path, source_ids_from(section), registry_ids)
            validate_causal_language(errors, section_path, section, source_ids_from(section))
            if section.get("chapter_id") not in chapter_ids:
                errors.append(f"{section_path}.chapter_id does not resolve to a chapter")
    return errors


def validate_all(project_root: Path = PROJECT_ROOT) -> list[str]:
    registry, errors = validate_registry(project_root)
    registry_ids = {source.get("source_id") for source in registry.get("sources", []) if isinstance(source, dict)}
    errors.extend(validate_timeline(registry_ids, project_root))
    errors.extend(validate_pathogen(registry_ids, project_root))
    errors.extend(validate_maritime(registry_ids, project_root))
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate source provenance for Edge of Epidemiology teaching tools.")
    parser.add_argument("--json", action="store_true", help="Print machine-readable validation output.")
    args = parser.parse_args()

    errors = validate_all(PROJECT_ROOT)
    if args.json:
        print(json.dumps({"ok": not errors, "error_count": len(errors), "errors": errors}, indent=2))
    elif errors:
        print("Tool source validation failed:")
        for error in errors:
            print(f"- {error}")
    else:
        print("Tool source validation passed.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
