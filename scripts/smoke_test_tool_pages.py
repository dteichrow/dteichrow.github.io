#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import urljoin
from urllib.request import urlopen


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DOCS_ROOT = PROJECT_ROOT / "docs"

FORBIDDEN_PUBLIC_PLACEHOLDERS = (
    "Loading disease profile",
    "Loading evidence panel",
    "Preparing curated pathogen routes and evidence notes.",
    "Curated pathogen history, transmission ecology, and evidence notes will appear here.",
    "Select a pathogen profile",
)
LEAFLET_194_CSS_SRI = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="


def load_json_assignment(path: Path, assignment_name: str) -> Any:
    text = path.read_text()
    marker = f"window.{assignment_name} = "
    if marker not in text:
        raise ValueError(f"Could not locate {marker!r} in {path}")
    start = text.index(marker) + len(marker)
    tail = text[start:]
    if assignment_name == "PATHOGEN_ATLAS_DATA":
        # The pathogen data file may contain other assignments before this payload,
        # but the atlas payload itself is the final JSON assignment.
        return json.loads(tail.strip().removesuffix(";"))
    return json.loads(tail.strip().removesuffix(";"))


def read_public_page(route: str, project_root: Path, base_url: str | None = None) -> str:
    if base_url:
        url = urljoin(base_url.rstrip("/") + "/", route.lstrip("/"))
        with urlopen(url, timeout=12) as response:
            return response.read().decode("utf-8", errors="replace")
    return (project_root / "docs" / route / "index.html").read_text()


def validate_no_placeholders(errors: list[str], route: str, html: str) -> None:
    for placeholder in FORBIDDEN_PUBLIC_PLACEHOLDERS:
        if placeholder in html:
            errors.append(f"{route} contains public placeholder text: {placeholder!r}")


def validate_timeline_page(errors: list[str], project_root: Path, html: str) -> None:
    data = load_json_assignment(
        project_root / "docs" / "tools" / "american-epidemic-timeline" / "data" / "american_epidemic_timeline_data.js",
        "AMERICAN_EPIDEMIC_TIMELINE_DATA",
    )
    counts = {
        "statEvents": len(data.get("events", [])),
        "statSources": len(data.get("sources", [])),
        "statAssets": len(data.get("assets", [])),
    }
    for element_id, expected in counts.items():
        if expected <= 0:
            errors.append(f"timeline data has zero {element_id} count")
            continue
        zero_pattern = rf'id="{re.escape(element_id)}"\s*>\s*0\s*<'
        if re.search(zero_pattern, html):
            errors.append(f"timeline page renders zero for {element_id} even though data count is {expected}")
        expected_pattern = rf'id="{re.escape(element_id)}"\s*>\s*{expected}\s*<'
        if not re.search(expected_pattern, html):
            errors.append(f"timeline page does not expose expected {element_id} count {expected}")
    first_event = (data.get("events") or [{}])[0]
    if first_event.get("title") and first_event["title"] not in html:
        errors.append(f"timeline page does not expose first event title {first_event['title']!r}")


def validate_pathogen_page(errors: list[str], project_root: Path, html: str) -> None:
    data = load_json_assignment(
        project_root / "docs" / "atlases" / "pathogen" / "data" / "pathogen_atlas_data.js",
        "PATHOGEN_ATLAS_DATA",
    )
    entries = data.get("entries") or []
    if not entries:
        errors.append("pathogen atlas data has no entries")
        return
    first = entries[0]
    required_text = [
        first.get("display_name", ""),
        first.get("agent_name", ""),
        first.get("origin_claim", {}).get("label", ""),
        first.get("origin_claim", {}).get("narrative", ""),
        first.get("origin_uncertainty_note", ""),
        "What kind of evidence do we have?",
    ]
    for text in required_text:
        if text and text not in html:
            errors.append(f"pathogen page does not expose expected static text: {text[:80]!r}")
    if '<h3 id="origin-label"></h3>' in html or '<p class="panel-copy" id="origin-narrative"></p>' in html:
        errors.append("pathogen page still exposes an empty origin claim shell")


def validate_maritime_page(errors: list[str], project_root: Path, html: str) -> None:
    data = load_json_assignment(
        project_root / "docs" / "atlases" / "maritime" / "data" / "maritime_disease_modules.js",
        "MARITIME_DISEASE_MODULES",
    )
    modules = data.get("modules") or []
    if not modules:
        errors.append("maritime module data has no modules")
        return
    expected_count = f"{len(modules)} cited case studies"
    if expected_count not in html:
        errors.append(f"maritime page does not expose module count {expected_count!r}")
    module_list_match = re.search(r'<div id="module-list">(.*?)</section>', html, flags=re.S)
    if not module_list_match:
        errors.append("maritime page does not expose module-list markup")
        return
    module_list_html = module_list_match.group(1)
    if module_list_html.count('class="module-card"') < len(modules):
        errors.append("maritime page does not expose one readable module card per module")
    for module in (modules[0], modules[-1]):
        for key in ("title", "uncertainty_note"):
            value = module.get(key)
            if value and value not in module_list_html:
                errors.append(f"maritime module list does not expose {module['id']}.{key}")


def validate_revolutionary_war_page(errors: list[str], project_root: Path, html: str) -> None:
    _ = project_root
    css_link_match = re.search(
        r'<link[^>]+href=["\']https://unpkg\.com/leaflet@1\.9\.4/dist/leaflet\.css["\'][^>]*>',
        html,
        flags=re.I,
    )
    if not css_link_match:
        errors.append("revolutionary war atlas is missing the Leaflet CSS link")
        return
    css_link = css_link_match.group(0)
    if f'integrity="{LEAFLET_194_CSS_SRI}"' not in css_link:
        errors.append("revolutionary war atlas has an invalid Leaflet CSS integrity hash")
    for required in ("Revolutionary War Atlas", "const EVENTS = [", "Battle of Camden", "Valley Forge Encampment"):
        if required not in html:
            errors.append(f"revolutionary war atlas does not expose expected content: {required!r}")


def validate_built_pages(project_root: Path = PROJECT_ROOT, base_url: str | None = None) -> list[str]:
    errors: list[str] = []
    routes = {
        "tools/american-epidemic-timeline": validate_timeline_page,
        "atlases/pathogen": validate_pathogen_page,
        "atlases/maritime": validate_maritime_page,
        "atlases/revolutionary-war": validate_revolutionary_war_page,
    }
    for route, validator in routes.items():
        try:
            html = read_public_page(route, project_root, base_url)
        except Exception as exc:  # pragma: no cover - CLI diagnostic path
            errors.append(f"{route} could not be read: {exc}")
            continue
        validate_no_placeholders(errors, route, html)
        validator(errors, project_root, html)
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Smoke-test built public learning-tool pages for placeholders and hydration failures.")
    parser.add_argument("--base-url", help="Optional local HTTP base URL to fetch, for example http://127.0.0.1:8768/")
    parser.add_argument("--json", action="store_true", help="Print machine-readable output.")
    args = parser.parse_args()

    errors = validate_built_pages(PROJECT_ROOT, args.base_url)
    if args.json:
        print(json.dumps({"ok": not errors, "error_count": len(errors), "errors": errors}, indent=2))
    elif errors:
        print("Tool page smoke test failed:")
        for error in errors:
            print(f"- {error}")
    else:
        print("Tool page smoke test passed.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
