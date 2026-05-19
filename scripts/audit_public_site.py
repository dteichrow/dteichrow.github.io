#!/usr/bin/env python3
from __future__ import annotations

import argparse
import concurrent.futures
import html.parser
import json
import re
import socket
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DOCS_ROOT = PROJECT_ROOT / "docs"
SOURCE_REGISTRY_PATH = PROJECT_ROOT / "data" / "sources" / "sources.json"

INTERNAL_HOSTS = {
    "dteichrow.github.io",
    "devinteichrow.com",
    "www.devinteichrow.com",
}

LINK_ATTRS = {
    "a": ("href",),
    "area": ("href",),
    "audio": ("src",),
    "embed": ("src",),
    "iframe": ("src",),
    "img": ("src", "srcset"),
    "link": ("href",),
    "script": ("src",),
    "source": ("src", "srcset"),
    "track": ("src",),
    "video": ("poster", "src"),
}

TEXT_FILE_SUFFIXES = {
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".xml",
}

BAD_PUBLIC_PATTERNS = {
    "file:///": "local file URL leaked into public output",
    "localhost": "localhost URL leaked into public output",
    "127.0.0.1": "loopback URL leaked into public output",
    "angular.dev/license": "Google News wrapper asset URL leaked into public output",
    "google-analytics.com/analytics.js": "analytics asset URL leaked as content link",
    "utm_source=chatgpt": "AI-generated tracking marker leaked into public output",
}

FORBIDDEN_PLACEHOLDERS = (
    "Lorem ipsum",
    "Source review pending",
    "Loading disease profile",
    "Loading evidence panel",
    "Preparing curated pathogen routes and evidence notes.",
    "Curated pathogen history, transmission ecology, and evidence notes will appear here.",
)

URL_RE = re.compile(r"https?://[^\s\"'<>\\)]+", re.I)
CSS_URL_RE = re.compile(r"url\(([^)]+)\)", re.I)


@dataclass(frozen=True)
class LinkRef:
    source: str
    target: str
    kind: str


class LinkExtractor(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[str, str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {name.lower(): value for name, value in attrs if value is not None}
        element_id = attr_map.get("id")
        if element_id:
            self.ids.add(element_id)
        name = attr_map.get("name")
        if name:
            self.ids.add(name)
        if tag.lower() == "link":
            rel_tokens = {token.strip().lower() for token in attr_map.get("rel", "").split()}
            if rel_tokens & {"dns-prefetch", "preconnect"}:
                return
        for attr in LINK_ATTRS.get(tag.lower(), ()):
            value = attr_map.get(attr)
            if not value:
                continue
            if attr == "srcset":
                for candidate in parse_srcset(value):
                    self.links.append((candidate, tag, attr))
            else:
                self.links.append((value, tag, attr))


def parse_srcset(value: str) -> list[str]:
    candidates: list[str] = []
    for part in value.split(","):
        first = part.strip().split()
        if first:
            candidates.append(first[0])
    return candidates


def is_ignored_scheme(url: str) -> bool:
    scheme = urllib.parse.urlsplit(url).scheme.lower()
    return scheme in {"mailto", "tel", "sms", "javascript", "data", "blob"}


def normalize_url(url: str) -> str:
    return html_unescape(url.strip())


def html_unescape(value: str) -> str:
    return (
        value.replace("&amp;", "&")
        .replace("&quot;", '"')
        .replace("&#x27;", "'")
        .replace("&#39;", "'")
    )


def route_for_file(path: Path, docs_root: Path) -> str:
    rel = path.relative_to(docs_root).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def iter_text_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_FILE_SUFFIXES:
            yield path


def collect_html_links(docs_root: Path) -> tuple[list[LinkRef], dict[str, set[str]], dict[str, Path]]:
    links: list[LinkRef] = []
    fragments: dict[str, set[str]] = {}
    route_to_file: dict[str, Path] = {}
    for path in docs_root.rglob("*.html"):
        route = route_for_file(path, docs_root)
        route_to_file[route] = path
        text = read_text(path)
        parser = LinkExtractor()
        parser.feed(text)
        fragments[route] = parser.ids
        for value, tag, attr in parser.links:
            links.append(LinkRef(source=route, target=normalize_url(value), kind=f"{tag}[{attr}]"))
        for css_url in CSS_URL_RE.findall(text):
            clean = css_url.strip().strip("\"'")
            if is_probable_css_link(clean):
                links.append(LinkRef(source=route, target=normalize_url(clean), kind="css[url]"))
    return links, fragments, route_to_file


def is_probable_css_link(value: str) -> bool:
    clean = value.strip().strip("\"'")
    if not clean or clean.startswith(("data:", "#")):
        return False
    if clean.startswith(("http://", "https://", "/", "./", "../")):
        return True
    if any(token in clean for token in ("window.", "location.", ",", " ")):
        return False
    return bool(re.search(r"\.(?:avif|gif|jpe?g|json|png|svg|webp|woff2?)(?:[?#].*)?$", clean, re.I))


def collect_registry_links(project_root: Path) -> list[LinkRef]:
    if not (project_root / SOURCE_REGISTRY_PATH.relative_to(PROJECT_ROOT)).exists():
        return []
    registry_path = project_root / SOURCE_REGISTRY_PATH.relative_to(PROJECT_ROOT)
    registry = json.loads(read_text(registry_path))
    refs: list[LinkRef] = []
    for source in registry.get("sources", []):
        if not isinstance(source, dict):
            continue
        raw_url = str(source.get("url_or_doi", "")).strip()
        if not raw_url:
            continue
        url = raw_url
        if raw_url.startswith("10."):
            url = "https://doi.org/" + raw_url
        if url.startswith("doi:"):
            url = "https://doi.org/" + url[4:]
        if url.startswith("http://") or url.startswith("https://"):
            refs.append(LinkRef(source=f"sources:{source.get('source_id', 'unknown')}", target=url, kind="source[url_or_doi]"))
    return refs


def iter_json_urls(value: Any) -> Iterable[str]:
    if isinstance(value, dict):
        for child in value.values():
            yield from iter_json_urls(child)
    elif isinstance(value, list):
        for child in value:
            yield from iter_json_urls(child)
    elif isinstance(value, str):
        text = value.strip()
        if text.startswith(("http://", "https://")):
            yield text
        elif text.startswith("doi:"):
            yield "https://doi.org/" + text[4:]
        elif text.startswith("10.") and "/" in text:
            yield "https://doi.org/" + text
        else:
            yield from (match.rstrip(".,;") for match in URL_RE.findall(value))


def collect_json_urls(docs_root: Path) -> list[LinkRef]:
    refs: list[LinkRef] = []
    for path in docs_root.rglob("*.json"):
        text = read_text(path)
        rel = path.relative_to(docs_root).as_posix()
        try:
            payload = json.loads(text)
        except json.JSONDecodeError:
            for match in URL_RE.findall(text):
                refs.append(LinkRef(source=rel, target=match.rstrip(".,;]"), kind="json[url]"))
            continue
        for url in iter_json_urls(payload):
            refs.append(LinkRef(source=rel, target=url, kind="json[url]"))
    return refs


def resolve_internal_target(ref: LinkRef, docs_root: Path) -> tuple[Path | None, str | None, str]:
    target = ref.target
    if not target:
        return None, None, "empty target"
    parsed = urllib.parse.urlsplit(target)
    if parsed.scheme and parsed.scheme.lower() in {"http", "https"}:
        if parsed.netloc.lower() not in INTERNAL_HOSTS:
            return None, None, "external"
        path = parsed.path or "/"
        fragment = parsed.fragment
    elif parsed.scheme or target.startswith("//"):
        return None, None, "external"
    else:
        parsed_target = urllib.parse.urlsplit(target)
        if not parsed_target.path and parsed_target.fragment:
            path = ref.source
            fragment = parsed_target.fragment
        else:
            source_dir = ref.source if ref.source.endswith("/") else ref.source.rsplit("/", 1)[0] + "/"
            joined = urllib.parse.urljoin(source_dir, target)
            parsed_joined = urllib.parse.urlsplit(joined)
            path = parsed_joined.path or "/"
            fragment = parsed_joined.fragment

    if path.startswith("/edge-of-epidemiology-site/"):
        path = path.removeprefix("/edge-of-epidemiology-site")

    path = urllib.parse.unquote(path)
    candidate = docs_root / path.lstrip("/")
    if path.endswith("/"):
        candidate = candidate / "index.html"
    elif candidate.is_dir():
        candidate = candidate / "index.html"
    elif not candidate.suffix:
        html_candidate = candidate / "index.html"
        if html_candidate.exists():
            candidate = html_candidate
    return candidate, fragment, "internal"


def audit_internal_links(docs_root: Path, links: list[LinkRef], fragments: dict[str, set[str]]) -> list[str]:
    errors: list[str] = []
    for ref in links:
        target = ref.target
        if is_ignored_scheme(target):
            continue
        if target == "#":
            errors.append(f"{ref.source}: {ref.kind} uses bare #")
            continue
        candidate, fragment, status = resolve_internal_target(ref, docs_root)
        if status == "empty target":
            errors.append(f"{ref.source}: {ref.kind} has empty URL")
            continue
        if status != "internal":
            continue
        if candidate is None or not candidate.exists():
            errors.append(f"{ref.source}: {ref.kind} points to missing internal target {target!r}")
            continue
        if fragment and not fragment.startswith(":~:text=") and candidate.suffix.lower() == ".html":
            route = route_for_file(candidate, docs_root)
            available = fragments.get(route)
            if available is None:
                parser = LinkExtractor()
                parser.feed(read_text(candidate))
                available = parser.ids
                fragments[route] = available
            if fragment not in available:
                errors.append(f"{ref.source}: {ref.kind} points to missing fragment #{fragment} in {route}")
    return errors


def audit_public_text(docs_root: Path) -> list[str]:
    errors: list[str] = []
    for path in iter_text_files(docs_root):
        text = read_text(path)
        rel = path.relative_to(docs_root).as_posix()
        for pattern, message in BAD_PUBLIC_PATTERNS.items():
            if pattern in text:
                errors.append(f"{rel}: {message}: {pattern}")
        for placeholder in FORBIDDEN_PLACEHOLDERS:
            if placeholder in text:
                errors.append(f"{rel}: forbidden public placeholder text: {placeholder!r}")
    return errors


def unique_external_links(refs: Iterable[LinkRef]) -> dict[str, list[LinkRef]]:
    by_url: dict[str, list[LinkRef]] = {}
    for ref in refs:
        target = ref.target
        if not target or is_ignored_scheme(target):
            continue
        parsed = urllib.parse.urlsplit(target)
        if parsed.scheme.lower() not in {"http", "https"}:
            continue
        if parsed.netloc.lower() in INTERNAL_HOSTS:
            continue
        by_url.setdefault(target, []).append(ref)
    return by_url


def request_url(url: str, timeout: float) -> tuple[str, int | None, str]:
    request = urllib.request.Request(
        url,
        method="GET",
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; EdgeOfEpidemiologyLinkAudit/1.0)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Range": "bytes=0-2047",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout, context=ssl.create_default_context()) as response:
            # Read a small amount so servers that wait for consumption can finish.
            response.read(1024)
            return url, int(response.status), "ok"
    except urllib.error.HTTPError as exc:
        return url, int(exc.code), "http_error"
    except (urllib.error.URLError, TimeoutError, socket.timeout, ssl.SSLError) as exc:
        return url, None, type(exc).__name__


def audit_external_links(refs: Iterable[LinkRef], *, timeout: float, workers: int) -> tuple[list[str], list[str], dict[str, Any]]:
    by_url = unique_external_links(refs)
    hard_errors: list[str] = []
    warnings: list[str] = []
    status_counts: dict[str, int] = {}
    soft_block_statuses = {401, 403, 405, 406, 408, 409, 418, 425, 429, 451, 999}
    hard_bad_statuses = {400, 404, 410}

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        futures = [executor.submit(request_url, url, timeout) for url in sorted(by_url)]
        for future in concurrent.futures.as_completed(futures):
            url, status, reason = future.result()
            refs_for_url = by_url[url]
            first_ref = refs_for_url[0]
            status_key = str(status) if status is not None else reason
            status_counts[status_key] = status_counts.get(status_key, 0) + 1
            where = f"{first_ref.source} ({first_ref.kind})"
            extra = f"; {len(refs_for_url)} uses" if len(refs_for_url) > 1 else ""
            if status in hard_bad_statuses:
                hard_errors.append(f"{where}: external URL returned {status}: {url}{extra}")
            elif status is None:
                warnings.append(f"{where}: external URL check failed with {reason}: {url}{extra}")
            elif status >= 500:
                warnings.append(f"{where}: external URL returned transient/server status {status}: {url}{extra}")
            elif status >= 400 and status not in soft_block_statuses:
                hard_errors.append(f"{where}: external URL returned {status}: {url}{extra}")

    summary = {
        "checked": len(by_url),
        "status_counts": dict(sorted(status_counts.items())),
    }
    return hard_errors, warnings, summary


def audit_live_routes(base_url: str, routes: Iterable[str], *, timeout: float, workers: int) -> list[str]:
    refs = [
        LinkRef(source="live-route", target=urllib.parse.urljoin(base_url.rstrip("/") + "/", route.lstrip("/")), kind="live")
        for route in routes
    ]
    errors, warnings, _ = audit_external_links(refs, timeout=timeout, workers=workers)
    # The live site itself must be reachable; network warnings are errors here.
    return errors + warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit the generated GitHub Pages site for broken links and public-source hygiene.")
    parser.add_argument("--project-root", type=Path, default=PROJECT_ROOT)
    parser.add_argument("--external", action="store_true", help="Check external HTTP(S) citation/article/media links.")
    parser.add_argument("--live-base-url", default="", help="Fetch key public routes from this live base URL, e.g. https://dteichrow.github.io/")
    parser.add_argument("--timeout", type=float, default=10.0)
    parser.add_argument("--workers", type=int, default=12)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    project_root = args.project_root.resolve()
    docs_root = project_root / "docs"
    errors: list[str] = []
    warnings: list[str] = []
    external_summary: dict[str, Any] = {}

    links, fragments, _ = collect_html_links(docs_root)
    registry_links = collect_registry_links(project_root)
    json_links = collect_json_urls(docs_root)
    errors.extend(audit_public_text(docs_root))
    errors.extend(audit_internal_links(docs_root, links, fragments))

    if args.external:
        external_errors, external_warnings, external_summary = audit_external_links(
            [*links, *registry_links, *json_links],
            timeout=args.timeout,
            workers=args.workers,
        )
        errors.extend(external_errors)
        warnings.extend(external_warnings)

    live_route_errors: list[str] = []
    if args.live_base_url:
        live_routes = [
            "/",
            "/tools/",
            "/reference/ebola-virus-disease.html",
            "/stories/story_56666e9c6c86e976-ebola-virus-disease.html",
            "/essays/ebola-in-drc-and-uganda-what-is-known/",
            "/newsdesk/",
            "/newsdesk/outbreaks/",
            "/atlases/revolutionary-war/",
            "/atlases/pathogen/",
            "/atlases/maritime/",
        ]
        live_route_errors = audit_live_routes(args.live_base_url, live_routes, timeout=args.timeout, workers=args.workers)
        errors.extend(live_route_errors)

    result = {
        "ok": not errors,
        "error_count": len(errors),
        "warning_count": len(warnings),
        "internal_link_count": len(links),
        "registry_url_count": len(registry_links),
        "json_url_count": len(json_links),
        "external": external_summary,
        "errors": errors,
        "warnings": warnings,
    }

    if args.json:
        print(json.dumps(result, indent=2, sort_keys=True))
    else:
        print(f"Internal/page links scanned: {len(links)}")
        print(f"Registry URLs scanned: {len(registry_links)}")
        print(f"JSON URLs scanned: {len(json_links)}")
        if external_summary:
            print(f"External URLs checked: {external_summary['checked']}")
            print(f"External status counts: {external_summary['status_counts']}")
        if errors:
            print("Errors:")
            for error in errors:
                print(f"- {error}")
        if warnings:
            print("Warnings:")
            for warning in warnings:
                print(f"- {warning}")
        if not errors:
            print("Public site audit passed.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
