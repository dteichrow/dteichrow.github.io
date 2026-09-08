#!/usr/bin/env python3
"""Check the built artifact and record the exact files tested for deployment."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]


def validate(docs):
    errors = []
    for path in docs.rglob("*.html"):
        text = path.read_text()
        if re.search(r"(?:basemaps\.cartocdn\.com|API KEY REQUIRED)", text, re.I):
            errors.append(f"{path.relative_to(docs)}: retired map dependency")
    missing = set()
    for page in docs.rglob("*.html"):
        soup = BeautifulSoup(page.read_text(), "html.parser")
        for element in soup.select("a[href],script[src],img[src],link[rel=stylesheet]"):
            value = element.get("href") or element.get("src")
            parsed = urlsplit(value)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            target = (
                docs / parsed.path.lstrip("/")
                if parsed.path.startswith("/")
                else page.parent / unquote(parsed.path)
            ).resolve()
            if not target.exists():
                missing.add(
                    f"{page.relative_to(docs)}: broken local destination {value}"
                )
    errors.extend(sorted(missing))
    for route in [
        "atlases/pathogen",
        "atlases/maritime",
        "atlases/viking",
        "atlases/revolutionary-war",
    ]:
        soup = BeautifulSoup((docs / route / "index.html").read_text(), "html.parser")
        for asset in soup.select("script[src],link[rel=stylesheet]"):
            value = asset.get("src") or asset.get("href")
            if value.startswith(("http:", "https:", "//")):
                errors.append(f"{route}: external executable/style dependency {value}")
    snapshot = json.loads((docs / "app_exports/latest.json").read_text())
    if snapshot.get("public_contract_version") != 2:
        errors.append("Newsdesk export is missing evidence contract version 2")
    for item in snapshot.get("items", []) + snapshot.get("story_items", []):
        for key in ["source_published_at", "first_discovered_at", "last_retrieved_at"]:
            if key not in item:
                errors.append(f"{item.get('item_id')}: missing {key}")
    if "Baseline snapshot created" in json.dumps(snapshot):
        errors.append("Newsdesk exposes processing notices")
    for route in ["", "opportunities", "essays"]:
        text = (docs / route / "index.html").read_text()
        if re.search(r"<script[^>]+(?:three|ship3d)", text, re.I):
            errors.append(f"{route}: ordinary page loads 3D")
    for target in [
        "assets/referral/devin-teichrow-referral-packet.pdf",
        "assets/vendor/leaflet/LICENSE",
        "assets/vendor/three/LICENSE",
        "assets/exhibits/land.js",
    ]:
        if not (docs / target).is_file():
            errors.append(f"Missing {target}")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write-manifest", action="store_true")
    args = parser.parse_args()
    docs = ROOT / "docs"
    errors = validate(docs)
    report = {"ok": not errors, "errors": errors}
    if args.write_manifest and not errors:
        files = {
            p.relative_to(docs).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(docs.rglob("*"))
            if p.is_file() and p.name != "build-manifest.json"
        }
        manifest = {
            "git_commit": subprocess.check_output(
                ["git", "rev-parse", "HEAD"], cwd=ROOT, text=True
            ).strip(),
            "file_count": len(files),
            "artifact_sha256": hashlib.sha256(
                json.dumps(files, sort_keys=True).encode()
            ).hexdigest(),
            "files": files,
        }
        (docs / "build-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        report.update(
            {
                key: manifest[key]
                for key in ["git_commit", "file_count", "artifact_sha256"]
            }
        )
    (ROOT / "output/validation").mkdir(parents=True, exist_ok=True)
    (ROOT / "output/validation/artifact.json").write_text(
        json.dumps(report, indent=2) + "\n"
    )
    print(json.dumps(report, indent=2))
    return int(bool(errors))


if __name__ == "__main__":
    raise SystemExit(main())
