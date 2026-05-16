from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from collections.abc import Iterable
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlencode

from .common import DOCS_DIR, PROJECT_ROOT, ensure_dir, fetch_json, load_json, write_json


ATLAS_ROOT = PROJECT_ROOT / "external" / "pathogen_atlas"
CATALOG_DIR = ATLAS_ROOT / "catalog"
CANDIDATES_PATH = CATALOG_DIR / "candidates.jsonl"
DRAFTS_PATH = CATALOG_DIR / "drafts.json"
REJECTED_PATH = CATALOG_DIR / "rejected.jsonl"
EXTRA_PATHOGENS_PATH = ATLAS_ROOT / "extra_pathogens.json"
ATLAS_EXPORT_PATH = DOCS_DIR / "app_exports" / "atlas.json"
LATEST_EXPORT_PATH = DOCS_DIR / "app_exports" / "latest.json"

WIKIDATA_SPARQL_URL = "https://query.wikidata.org/sparql"
WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php"
WIKIPEDIA_PAGE_URL = "https://en.wikipedia.org/wiki/{title}"

CATEGORY_LABELS = {
    "mosquito-borne": "Mosquito-borne",
    "tick-borne": "Tick-borne",
    "flea-louse-mite-borne": "Flea, louse, and mite-borne",
    "other-arthropod-borne": "Other arthropod-borne",
    "fecal-oral-waterborne": "Fecal-oral / waterborne",
    "foodborne": "Foodborne",
    "airborne-respiratory": "Airborne / respiratory",
    "contact-sexual-bloodborne": "Contact, sexual, or bloodborne",
    "zoonotic-animal-interface": "Zoonotic / animal interface",
    "rodent-environmental": "Rodent-borne / environmental",
    "soil-environmental": "Soil / environmental",
    "healthcare-associated": "Healthcare-associated",
    "other-mixed": "Other / mixed transmission",
}
CATEGORY_ORDER = list(CATEGORY_LABELS)
PATHOGEN_TYPE_LABELS = {
    "Virus",
    "Bacterium",
    "Protozoan parasite",
    "Helminth",
    "Fungus",
    "Prion",
    "Other",
}

REQUIRED_ENTRY_FIELDS = {
    "slug",
    "name",
    "subtitle",
    "status",
    "pathogen_type",
    "summary",
    "why_it_matters",
    "atlas_scope",
    "origin_claim",
    "spread_routes",
    "modern_echoes",
    "framing_traps",
    "citations",
    "writing_state",
    "category",
    "category_label",
    "transmission_group",
}
REQUIRED_ORIGIN_FIELDS = {"label", "coordinates", "date_or_era", "confidence", "narrative", "citation_ids"}
REQUIRED_ROUTE_FIELDS = {
    "route_id",
    "from_label",
    "to_label",
    "from_coordinates",
    "to_coordinates",
    "date_or_era",
    "route_type",
    "confidence",
    "narrative",
    "citation_ids",
}
REQUIRED_GEOGRAPHY_LAYER_FIELDS = {
    "layer_id",
    "label",
    "layer_type",
    "geometry_type",
    "confidence",
    "narrative",
    "citation_ids",
}
GEOGRAPHY_LAYER_TYPES = {
    "global_distribution",
    "endemic_zone",
    "reservoir_ecology",
    "outbreak_region",
    "surveillance_region",
    "exposure_zone",
}
GEOGRAPHY_GEOMETRY_TYPES = {"world", "bbox", "polygon", "circle", "ellipse"}
WIKIPEDIA_DOMAINS = {"wikipedia.org", "en.wikipedia.org", "m.wikipedia.org", "wikidata.org", "www.wikidata.org"}
DOI_URL_PATTERN = re.compile(r"(^|/)(10\.[0-9]{4,9}/\S+)", re.IGNORECASE)
ACCEPTED_SOURCE_HINTS = {
    "who.int",
    "cdc.gov",
    "ecdc.europa.eu",
    "nih.gov",
    "ncbi.nlm.nih.gov",
    "pubmed.ncbi.nlm.nih.gov",
    "nejm.org",
    "thelancet.com",
    "nature.com",
    "science.org",
    "ictv.global",
    "msdmanuals.com",
    "paho.org",
    "medlineplus.gov",
}


class ValidationError(ValueError):
    """Raised when a pathogen atlas entry is not safe to promote."""


def today_iso() -> str:
    return dt.date.today().isoformat()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "untitled"


def unique_list(values: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    output: list[str] = []
    for value in values:
        clean = re.sub(r"\s+", " ", str(value or "")).strip()
        key = clean.casefold()
        if not clean or key in seen:
            continue
        seen.add(key)
        output.append(clean)
    return output


def domain_from_url(url: str) -> str:
    match = re.match(r"https?://([^/]+)", url or "")
    return match.group(1).lower().removeprefix("www.") if match else ""


def is_wikipedia_url(url: str) -> bool:
    domain = domain_from_url(url)
    return domain in WIKIPEDIA_DOMAINS or domain.endswith(".wikipedia.org")


def is_doi_url(url: str) -> bool:
    lowered = (url or "").lower()
    return "doi.org/" in lowered or bool(DOI_URL_PATTERN.search(url or ""))


def is_accepted_evidence_url(url: str) -> bool:
    domain = domain_from_url(url)
    if not domain or is_wikipedia_url(url) or is_doi_url(url):
        return False
    return any(domain == hint or domain.endswith(f".{hint}") for hint in ACCEPTED_SOURCE_HINTS)


def read_json_default(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return load_json(path)


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    rows = []
    for line in path.read_text().splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def write_jsonl(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    ensure_dir(path.parent)
    path.write_text("".join(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n" for row in rows))


def append_jsonl(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    ensure_dir(path.parent)
    with path.open("a", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")


def current_atlas_entries(
    atlas_export_path: Path = ATLAS_EXPORT_PATH,
    extra_pathogens_path: Path = EXTRA_PATHOGENS_PATH,
) -> list[dict[str, Any]]:
    entries: list[dict[str, Any]] = []
    if atlas_export_path.exists():
        entries.extend(read_json_default(atlas_export_path, {"atlas": []}).get("atlas", []))
    if extra_pathogens_path.exists():
        entries.extend(read_json_default(extra_pathogens_path, {"atlas": []}).get("atlas", []))
    return entries


def existing_slug_set(
    atlas_export_path: Path = ATLAS_EXPORT_PATH,
    extra_pathogens_path: Path = EXTRA_PATHOGENS_PATH,
) -> set[str]:
    return {entry.get("slug", "") for entry in current_atlas_entries(atlas_export_path, extra_pathogens_path) if entry.get("slug")}


def reference_names(latest_export_path: Path = LATEST_EXPORT_PATH) -> set[str]:
    if not latest_export_path.exists():
        return set()
    latest = read_json_default(latest_export_path, {})
    names: set[str] = set()
    for ref in latest.get("reference", []):
        for key in ("name", "pathogen", "title"):
            if ref.get(key):
                names.add(str(ref[key]))
    for story in latest.get("stories", []):
        for key in ("pathogen", "disease", "display_title"):
            if story.get(key):
                names.add(str(story[key]))
    return names


def transmission_guess(text: str) -> tuple[str, str]:
    haystack = text.casefold()
    rules = [
        ("mosquito", "mosquito-borne"),
        ("aedes", "mosquito-borne"),
        ("anopheles", "mosquito-borne"),
        ("tick", "tick-borne"),
        ("flea", "flea-louse-mite-borne"),
        ("louse", "flea-louse-mite-borne"),
        ("mite", "flea-louse-mite-borne"),
        ("sandfly", "other-arthropod-borne"),
        ("sand fly", "other-arthropod-borne"),
        ("triatomine", "other-arthropod-borne"),
        ("blackfly", "other-arthropod-borne"),
        ("black fly", "other-arthropod-borne"),
        ("waterborne", "fecal-oral-waterborne"),
        ("fecal", "fecal-oral-waterborne"),
        ("faecal", "fecal-oral-waterborne"),
        ("foodborne", "foodborne"),
        ("food-borne", "foodborne"),
        ("respiratory", "airborne-respiratory"),
        ("airborne", "airborne-respiratory"),
        ("sexual", "contact-sexual-bloodborne"),
        ("bloodborne", "contact-sexual-bloodborne"),
        ("blood-borne", "contact-sexual-bloodborne"),
        ("contact", "contact-sexual-bloodborne"),
        ("zoonotic", "zoonotic-animal-interface"),
        ("animal", "zoonotic-animal-interface"),
        ("rodent", "rodent-environmental"),
        ("soil", "soil-environmental"),
        ("healthcare", "healthcare-associated"),
        ("nosocomial", "healthcare-associated"),
    ]
    for needle, category in rules:
        if needle in haystack:
            return category, CATEGORY_LABELS[category]
    return "other-mixed", CATEGORY_LABELS["other-mixed"]


def priority_for_candidate(name: str, description: str, reference_seed_names: set[str]) -> tuple[int, str]:
    key = name.casefold()
    if any(key in ref.casefold() or ref.casefold() in key for ref in reference_seed_names):
        return 1, "already present in Newsdesk/reference exports"
    historical_keywords = (
        "plague",
        "cholera",
        "smallpox",
        "influenza",
        "yellow fever",
        "typhus",
        "tuberculosis",
        "malaria",
        "measles",
        "polio",
        "pox",
        "fever",
    )
    if any(keyword in key for keyword in historical_keywords):
        return 1, "historically or outbreak-important disease family"
    if any(word in description.casefold() for word in ("common", "major", "global", "epidemic", "pandemic", "outbreak")):
        return 2, "major human disease candidate with broad public-health relevance"
    return 3, "candidate retained for later review"


def candidate_record(
    *,
    name: str,
    description: str = "",
    aliases: Iterable[str] = (),
    wikidata_id: str = "",
    wikipedia_title: str = "",
    wikipedia_url: str = "",
    source: str,
    reference_seed_names: set[str] | None = None,
) -> dict[str, Any]:
    reference_seed_names = reference_seed_names or set()
    category, category_label = transmission_guess(" ".join([name, description, " ".join(aliases)]))
    tier, reason = priority_for_candidate(name, description, reference_seed_names)
    title = wikipedia_title.replace(" ", "_") if wikipedia_title else quote(name.replace(" ", "_"))
    return {
        "slug": slugify(name),
        "name": name,
        "aliases": unique_list(aliases),
        "wikidata_id": wikidata_id,
        "wikipedia_title": wikipedia_title,
        "wikipedia_url": wikipedia_url or WIKIPEDIA_PAGE_URL.format(title=title),
        "description": description,
        "possible_category": category,
        "possible_category_label": category_label,
        "priority_tier": tier,
        "priority_reason": reason,
        "source_seeds": unique_list([source, "wikipedia", "wikidata" if wikidata_id else ""]),
        "discovered_at": today_iso(),
        "review_status": "candidate",
    }


def merge_candidates(candidates: Iterable[dict[str, Any]]) -> list[dict[str, Any]]:
    merged: dict[str, dict[str, Any]] = {}
    for candidate in candidates:
        slug = candidate.get("slug") or slugify(candidate.get("name", ""))
        if not slug:
            continue
        if slug not in merged:
            merged[slug] = dict(candidate, slug=slug)
            continue
        existing = merged[slug]
        existing["aliases"] = unique_list(existing.get("aliases", []) + candidate.get("aliases", []))
        existing["source_seeds"] = unique_list(existing.get("source_seeds", []) + candidate.get("source_seeds", []))
        if candidate.get("wikidata_id") and not existing.get("wikidata_id"):
            existing["wikidata_id"] = candidate["wikidata_id"]
        if candidate.get("description") and len(candidate["description"]) > len(existing.get("description", "")):
            existing["description"] = candidate["description"]
        if int(candidate.get("priority_tier", 3)) < int(existing.get("priority_tier", 3)):
            existing["priority_tier"] = candidate["priority_tier"]
            existing["priority_reason"] = candidate.get("priority_reason", existing.get("priority_reason", ""))
    return sorted(merged.values(), key=lambda item: (int(item.get("priority_tier", 3)), item.get("name", "")))


def wikidata_candidates(limit: int = 300) -> list[dict[str, Any]]:
    # Q18123741 = infectious disease. The transitive subclass query is broad,
    # so the candidate layer is intentionally reviewed before anything promotes.
    query = f"""
    SELECT ?disease ?diseaseLabel ?description ?article WHERE {{
      ?disease wdt:P279* wd:Q18123741 .
      OPTIONAL {{ ?article schema:about ?disease ; schema:isPartOf <https://en.wikipedia.org/> . }}
      SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    LIMIT {int(limit)}
    """
    url = f"{WIKIDATA_SPARQL_URL}?{urlencode({'query': query, 'format': 'json'})}"
    payload = fetch_json(url, headers={"Accept": "application/sparql-results+json"})
    references = reference_names()
    candidates = []
    for row in payload.get("results", {}).get("bindings", []):
        name = row.get("diseaseLabel", {}).get("value", "")
        if not name or name.startswith("Q"):
            continue
        disease_url = row.get("disease", {}).get("value", "")
        wikidata_id = disease_url.rsplit("/", 1)[-1] if disease_url else ""
        description = row.get("description", {}).get("value", "")
        article = row.get("article", {}).get("value", "")
        wikipedia_title = article.rsplit("/", 1)[-1].replace("_", " ") if article else ""
        candidates.append(
            candidate_record(
                name=name,
                description=description,
                wikidata_id=wikidata_id,
                wikipedia_title=wikipedia_title,
                wikipedia_url=article,
                source="wikidata infectious disease subclass query",
                reference_seed_names=references,
            )
        )
    return candidates


def wikipedia_category_candidates(category: str = "Category:Infectious_diseases", limit: int = 300) -> list[dict[str, Any]]:
    params = {
        "action": "query",
        "list": "categorymembers",
        "cmtitle": category,
        "cmlimit": min(int(limit), 500),
        "cmtype": "page",
        "format": "json",
    }
    payload = fetch_json(f"{WIKIPEDIA_API_URL}?{urlencode(params)}")
    references = reference_names()
    candidates = []
    for page in payload.get("query", {}).get("categorymembers", []):
        title = page.get("title", "")
        if not title or title.startswith(("List of", "Category:")):
            continue
        candidates.append(
            candidate_record(
                name=title,
                wikipedia_title=title,
                source=f"wikipedia category {category}",
                reference_seed_names=references,
            )
        )
    return candidates


def discover_candidates(limit: int = 300, include_wikipedia: bool = True, include_wikidata: bool = True) -> list[dict[str, Any]]:
    discovered: list[dict[str, Any]] = []
    if include_wikidata:
        discovered.extend(wikidata_candidates(limit=limit))
    if include_wikipedia:
        discovered.extend(wikipedia_category_candidates(limit=limit))
    existing = existing_slug_set()
    candidates = [candidate for candidate in merge_candidates(discovered) if candidate.get("slug") not in existing]
    return candidates


def source_queries_for(candidate: dict[str, Any]) -> list[dict[str, str]]:
    name = candidate.get("name", "")
    return [
        {"source": "WHO", "query": f"WHO {name} fact sheet"},
        {"source": "CDC", "query": f"CDC {name} transmission"},
        {"source": "ECDC", "query": f"ECDC {name} facts"},
        {"source": "NCBI Bookshelf", "query": f"NCBI Bookshelf {name} transmission history"},
        {"source": "PubMed", "query": f"PubMed {name} epidemiology history transmission origin"},
    ]


def draft_shell(candidate: dict[str, Any]) -> dict[str, Any]:
    category = candidate.get("possible_category") or "other-mixed"
    category_label = CATEGORY_LABELS.get(category, CATEGORY_LABELS["other-mixed"])
    return {
        "slug": candidate.get("slug"),
        "name": candidate.get("name"),
        "aliases": candidate.get("aliases", []),
        "wikidata_id": candidate.get("wikidata_id", ""),
        "wikipedia_url": candidate.get("wikipedia_url", ""),
        "category": category,
        "category_label": category_label,
        "transmission_group": category_label,
        "priority_tier": candidate.get("priority_tier", 3),
        "priority_reason": candidate.get("priority_reason", ""),
        "source_queries": source_queries_for(candidate),
        "review_status": "needs_source_pack",
        "drafted_at": today_iso(),
    }


def enrich_candidates(candidates: Iterable[dict[str, Any]]) -> dict[str, Any]:
    drafts = [draft_shell(candidate) for candidate in candidates]
    return {
        "generated_at": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
        "draft_count": len(drafts),
        "drafts": drafts,
    }


def citation_ids(entry: dict[str, Any]) -> set[str]:
    return {citation.get("id", "") for citation in entry.get("citations", []) if citation.get("id")}


def validate_coordinates(value: Any, label: str, errors: list[str]) -> None:
    if not isinstance(value, list) or len(value) != 2:
        errors.append(f"{label} must be [longitude, latitude]")
        return
    lng, lat = value
    if not isinstance(lng, (int, float)) or not isinstance(lat, (int, float)):
        errors.append(f"{label} must contain numeric longitude and latitude")
        return
    if not -180 <= lng <= 180 or not -90 <= lat <= 90:
        errors.append(f"{label} is outside valid longitude/latitude bounds")


def validate_geography_geometry(layer: dict[str, Any], label: str, errors: list[str]) -> None:
    geometry_type = layer.get("geometry_type")
    if geometry_type == "world":
        return
    if geometry_type == "bbox":
        bounds = layer.get("bounds")
        if not isinstance(bounds, list) or len(bounds) != 2:
            errors.append(f"{label}.bounds must contain southwest and northeast coordinates")
            return
        validate_coordinates(bounds[0], f"{label}.bounds[0]", errors)
        validate_coordinates(bounds[1], f"{label}.bounds[1]", errors)
        return
    if geometry_type == "polygon":
        coordinates = layer.get("coordinates")
        if not isinstance(coordinates, list) or len(coordinates) < 3:
            errors.append(f"{label}.coordinates must contain at least three [longitude, latitude] points")
            return
        for point_index, point in enumerate(coordinates):
            validate_coordinates(point, f"{label}.coordinates[{point_index}]", errors)
        return
    if geometry_type == "circle":
        validate_coordinates(layer.get("center"), f"{label}.center", errors)
        radius = layer.get("radius_km")
        if not isinstance(radius, (int, float)) or radius <= 0:
            errors.append(f"{label}.radius_km must be a positive number")
    if geometry_type == "ellipse":
        validate_coordinates(layer.get("center"), f"{label}.center", errors)
        for radius_key in ("radius_lng", "radius_lat"):
            radius = layer.get(radius_key)
            if not isinstance(radius, (int, float)) or radius <= 0:
                errors.append(f"{label}.{radius_key} must be a positive number")
        rotation = layer.get("rotation_degrees", 0)
        if not isinstance(rotation, (int, float)):
            errors.append(f"{label}.rotation_degrees must be numeric when present")


def validate_entry(entry: dict[str, Any], existing_slugs: set[str] | None = None) -> list[str]:
    errors: list[str] = []
    missing = sorted(field for field in REQUIRED_ENTRY_FIELDS if field not in entry or entry.get(field) in ("", None, []))
    if missing:
        errors.append(f"missing required field(s): {', '.join(missing)}")
    slug = entry.get("slug", "")
    if slug and slug != slugify(slug):
        errors.append("slug must be lowercase kebab-case")
    if existing_slugs and slug in existing_slugs:
        errors.append(f"duplicate slug already exists: {slug}")
    category = entry.get("category")
    if category and category not in CATEGORY_LABELS:
        errors.append(f"unknown category: {category}")
    pathogen_type = entry.get("pathogen_type")
    if pathogen_type and pathogen_type not in PATHOGEN_TYPE_LABELS:
        errors.append(f"unknown pathogen_type: {pathogen_type}")

    citations = entry.get("citations", [])
    if not isinstance(citations, list) or not citations:
        errors.append("citations must contain at least one non-Wikipedia source")
    evidence_ids = citation_ids(entry)
    non_wikipedia_citation_ids = {
        citation.get("id", "")
        for citation in citations
        if citation.get("id") and is_accepted_evidence_url(citation.get("url", ""))
    }
    if not non_wikipedia_citation_ids:
        errors.append("at least one citation must be from a non-Wikipedia accepted evidence source")
    for citation in (citations if isinstance(citations, list) else []):
        if not citation.get("id"):
            errors.append("citation missing id")
        if not citation.get("url"):
            errors.append(f"citation {citation.get('id', '<unknown>')} missing url")
        if citation.get("url") and is_wikipedia_url(citation["url"]):
            errors.append(f"citation {citation.get('id', '<unknown>')} uses Wikipedia; use it only as a seed")
        if citation.get("url") and is_doi_url(citation["url"]):
            errors.append(f"citation {citation.get('id', '<unknown>')} uses a DOI URL; cite a verified article/source page instead")

    origin = entry.get("origin_claim")
    if not isinstance(origin, dict):
        errors.append("origin_claim must be an object")
    else:
        for field in sorted(REQUIRED_ORIGIN_FIELDS):
            if origin.get(field) in ("", None, []):
                errors.append(f"origin_claim missing {field}")
        validate_coordinates(origin.get("coordinates"), "origin_claim.coordinates", errors)
        origin_citations = set(origin.get("citation_ids", []))
        if not origin_citations:
            errors.append("origin_claim must cite at least one source")
        if origin_citations and not origin_citations <= evidence_ids:
            errors.append("origin_claim citation_ids include unknown citation ids")
        if origin_citations and not origin_citations & non_wikipedia_citation_ids:
            errors.append("origin_claim must cite at least one non-Wikipedia evidence source")
        if str(origin.get("confidence", "")).lower() in {"certain", "definitive", "proven"}:
            errors.append("origin_claim confidence is overconfident; use strong, moderate, mixed, weak, or contested")

    routes = entry.get("spread_routes", [])
    if not isinstance(routes, list) or not routes:
        errors.append("spread_routes must contain at least one mapped route")
    for index, route in enumerate(routes if isinstance(routes, list) else []):
        if not isinstance(route, dict):
            errors.append(f"spread_routes[{index}] must be an object")
            continue
        for field in sorted(REQUIRED_ROUTE_FIELDS):
            if route.get(field) in ("", None, []):
                errors.append(f"spread_routes[{index}] missing {field}")
        validate_coordinates(route.get("from_coordinates"), f"spread_routes[{index}].from_coordinates", errors)
        validate_coordinates(route.get("to_coordinates"), f"spread_routes[{index}].to_coordinates", errors)
        route_citations = set(route.get("citation_ids", []))
        if route_citations and not route_citations <= evidence_ids:
            errors.append(f"spread_routes[{index}] citation_ids include unknown citation ids")
        if route_citations and not route_citations & non_wikipedia_citation_ids:
            errors.append(f"spread_routes[{index}] must cite at least one non-Wikipedia evidence source")

    geography_layers = entry.get("geography_layers", [])
    if geography_layers and not isinstance(geography_layers, list):
        errors.append("geography_layers must be a list when present")
    for index, layer in enumerate(geography_layers if isinstance(geography_layers, list) else []):
        layer_label = f"geography_layers[{index}]"
        if not isinstance(layer, dict):
            errors.append(f"{layer_label} must be an object")
            continue
        for field in sorted(REQUIRED_GEOGRAPHY_LAYER_FIELDS):
            if layer.get(field) in ("", None, []):
                errors.append(f"{layer_label} missing {field}")
        if layer.get("layer_type") and layer["layer_type"] not in GEOGRAPHY_LAYER_TYPES:
            errors.append(f"{layer_label} unknown layer_type: {layer['layer_type']}")
        if layer.get("geometry_type") and layer["geometry_type"] not in GEOGRAPHY_GEOMETRY_TYPES:
            errors.append(f"{layer_label} unknown geometry_type: {layer['geometry_type']}")
        validate_geography_geometry(layer, layer_label, errors)
        layer_citations = set(layer.get("citation_ids", []))
        if not layer_citations:
            errors.append(f"{layer_label} must cite at least one source")
        if layer_citations and not layer_citations <= evidence_ids:
            errors.append(f"{layer_label} citation_ids include unknown citation ids")
        if layer_citations and not layer_citations & non_wikipedia_citation_ids:
            errors.append(f"{layer_label} must cite at least one non-Wikipedia evidence source")

    for field in ("modern_echoes", "framing_traps"):
        if field in entry and (not isinstance(entry[field], list) or not all(isinstance(item, str) and item.strip() for item in entry[field])):
            errors.append(f"{field} must be a non-empty list of strings")
    return errors


def validate_entries(entries: Iterable[dict[str, Any]], existing_slugs: set[str] | None = None) -> dict[str, Any]:
    existing_slugs = existing_slugs or set()
    results = []
    for entry in entries:
        errors = validate_entry(entry, existing_slugs=existing_slugs)
        results.append({"slug": entry.get("slug", ""), "name": entry.get("name", ""), "valid": not errors, "errors": errors})
    return {
        "checked": len(results),
        "valid": sum(1 for result in results if result["valid"]),
        "invalid": sum(1 for result in results if not result["valid"]),
        "results": results,
    }


def reviewed_entries_from_drafts(drafts_payload: dict[str, Any]) -> list[dict[str, Any]]:
    raw = drafts_payload.get("drafts", drafts_payload.get("atlas", []))
    entries = []
    for draft in raw:
        if draft.get("review_status") in {"reviewed", "approved", "ready_to_promote"}:
            entry = dict(draft)
            for staging_field in ("source_queries", "review_status", "priority_tier", "priority_reason", "drafted_at", "aliases", "wikidata_id", "wikipedia_url"):
                entry.pop(staging_field, None)
            entries.append(entry)
    return entries


def promote_reviewed_entries(
    drafts_path: Path = DRAFTS_PATH,
    extra_pathogens_path: Path = EXTRA_PATHOGENS_PATH,
    atlas_export_path: Path = ATLAS_EXPORT_PATH,
) -> dict[str, Any]:
    drafts_payload = read_json_default(drafts_path, {"drafts": []})
    entries = reviewed_entries_from_drafts(drafts_payload)
    existing_slugs = existing_slug_set(atlas_export_path=atlas_export_path, extra_pathogens_path=extra_pathogens_path)
    entries_to_promote = [entry for entry in entries if entry.get("slug") not in existing_slugs]
    validation = validate_entries(entries_to_promote, existing_slugs=existing_slugs)
    invalid = [result for result in validation["results"] if not result["valid"]]
    if invalid:
        raise ValidationError(json.dumps({"message": "promotion blocked by validation errors", "invalid": invalid}, indent=2))

    extra_payload = read_json_default(extra_pathogens_path, {"atlas": []})
    extra_entries = extra_payload.get("atlas", [])
    extra_slugs = {entry.get("slug") for entry in extra_entries}
    promoted = []
    for entry in entries_to_promote:
        if entry.get("slug") in extra_slugs:
            continue
        promoted.append(entry)
        extra_entries.append(entry)
    if promoted:
        extra_payload["atlas"] = extra_entries
        extra_payload["updated_at"] = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
        write_json(extra_pathogens_path, extra_payload)
    return {"promoted": len(promoted), "skipped_existing": len(entries) - len(promoted), "validation": validation}


def reject_candidates(candidates: Iterable[dict[str, Any]], reason: str, rejected_path: Path = REJECTED_PATH) -> int:
    rows = []
    for candidate in candidates:
        row = dict(candidate)
        row["review_status"] = "rejected"
        row["rejection_reason"] = reason
        row["rejected_at"] = today_iso()
        rows.append(row)
    append_jsonl(rejected_path, rows)
    return len(rows)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Discover, stage, validate, and promote Pathogen Atlas disease entries.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    discover = subparsers.add_parser("discover", help="Discover candidate human infectious diseases from Wikidata/Wikipedia.")
    discover.add_argument("--limit", type=int, default=300)
    discover.add_argument("--no-wikidata", action="store_true")
    discover.add_argument("--no-wikipedia", action="store_true")
    discover.add_argument("--output", type=Path, default=CANDIDATES_PATH)

    enrich = subparsers.add_parser("enrich", help="Create reviewable draft shells with official-source search templates.")
    enrich.add_argument("--input", type=Path, default=CANDIDATES_PATH)
    enrich.add_argument("--output", type=Path, default=DRAFTS_PATH)

    validate = subparsers.add_parser("validate", help="Validate reviewed draft entries or an atlas JSON file.")
    validate.add_argument("--input", type=Path, default=DRAFTS_PATH)
    validate.add_argument("--allow-existing", action="store_true")

    promote = subparsers.add_parser("promote", help="Promote reviewed, valid drafts into extra_pathogens.json.")
    promote.add_argument("--input", type=Path, default=DRAFTS_PATH)
    promote.add_argument("--output", type=Path, default=EXTRA_PATHOGENS_PATH)

    reject = subparsers.add_parser("reject", help="Append staged candidates to the rejected audit log.")
    reject.add_argument("--input", type=Path, default=CANDIDATES_PATH)
    reject.add_argument("--reason", required=True)
    reject.add_argument("--output", type=Path, default=REJECTED_PATH)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.command == "discover":
        candidates = discover_candidates(
            limit=args.limit,
            include_wikipedia=not args.no_wikipedia,
            include_wikidata=not args.no_wikidata,
        )
        write_jsonl(args.output, candidates)
        print(json.dumps({"candidates": len(candidates), "output": str(args.output)}, indent=2))
        return
    if args.command == "enrich":
        candidates = read_jsonl(args.input)
        drafts = enrich_candidates(candidates)
        write_json(args.output, drafts)
        print(json.dumps({"drafts": drafts["draft_count"], "output": str(args.output)}, indent=2))
        return
    if args.command == "validate":
        payload = read_json_default(args.input, {"drafts": []})
        entries = reviewed_entries_from_drafts(payload) or payload.get("atlas", [])
        existing = set() if args.allow_existing else existing_slug_set()
        result = validate_entries(entries, existing_slugs=existing)
        print(json.dumps(result, indent=2))
        if result["invalid"]:
            raise SystemExit(1)
        return
    if args.command == "promote":
        result = promote_reviewed_entries(drafts_path=args.input, extra_pathogens_path=args.output)
        print(json.dumps(result, indent=2))
        return
    if args.command == "reject":
        candidates = read_jsonl(args.input)
        count = reject_candidates(candidates, args.reason, rejected_path=args.output)
        print(json.dumps({"rejected": count, "output": str(args.output)}, indent=2))


if __name__ == "__main__":
    main()
