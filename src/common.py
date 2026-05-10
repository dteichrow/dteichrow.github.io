from __future__ import annotations

import datetime as dt
import html
import json
import re
import tempfile
import time
from pathlib import Path
from typing import Any
from urllib.error import HTTPError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

import yaml


PROJECT_ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = PROJECT_ROOT / "content"
DOCS_DIR = PROJECT_ROOT / "docs"
ASSETS_DIR = PROJECT_ROOT / "assets"
NOTES_DIR = PROJECT_ROOT / "notes"
DEFAULT_BASE_URL = "/"
USER_AGENT = "Mozilla/5.0 (compatible; EdgeOfEpidemiologyBot/1.0; +https://theedgeofepidemiology.substack.com)"

UPSTREAM_FIELDS = [
    "substack_id",
    "slug",
    "title",
    "date",
    "canonical_url",
    "excerpt",
    "cover_image",
    "upstream_tags",
    "source_mode",
    "first_seen_at",
    "last_synced_at",
    "wordcount",
]
CURATED_FIELDS = [
    "status",
    "dek",
    "topics",
    "series",
    "related_atlases",
    "related_reference_slugs",
    "related_story_ids",
    "search_excerpt",
    "local_body_path",
    "hero_mode",
    "notes",
]
CURATED_DEFAULTS = {
    "status": "summary_only",
    "dek": "",
    "topics": [],
    "series": [],
    "related_atlases": [],
    "related_reference_slugs": [],
    "related_story_ids": [],
    "search_excerpt": "",
    "local_body_path": "",
    "hero_mode": "cover",
    "notes": "",
}


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def read_yaml(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    data = yaml.safe_load(path.read_text())  # type: ignore[no-any-return]
    return default if data is None else data


def write_yaml(path: Path, data: Any) -> None:
    ensure_dir(path.parent)
    path.write_text(yaml.safe_dump(data, sort_keys=False, allow_unicode=True))


def write_json(path: Path, data: Any) -> None:
    ensure_dir(path.parent)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False))


def fetch_text(url: str, timeout: int = 30, attempts: int = 4) -> str:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(1, attempts + 1):
        try:
            with urlopen(request, timeout=timeout) as response:
                charset = response.headers.get_content_charset() or "utf-8"
                return response.read().decode(charset, errors="replace")
        except HTTPError as exc:
            if exc.code != 429 or attempt == attempts:
                raise
            retry_after = exc.headers.get("Retry-After")
            sleep_for = float(retry_after) if retry_after else float(attempt * 3)
            time.sleep(sleep_for)
    raise RuntimeError(f"Failed to fetch {url}")


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    value = html.unescape(value)
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def _normalize_scalar(value: Any) -> Any:
    if isinstance(value, dt.datetime):
        return value.isoformat()
    if isinstance(value, dt.date):
        return value.isoformat()
    return value


def normalize_post_types(post: dict[str, Any]) -> dict[str, Any]:
    normalized = {key: _normalize_scalar(value) for key, value in post.items()}
    for field in ["upstream_tags", "topics", "series", "related_atlases", "related_reference_slugs", "related_story_ids"]:
        normalized[field] = canonicalize_list(normalized.get(field))
    return normalized


def sort_posts(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(
        [normalize_post_types(post) for post in posts],
        key=lambda post: (post.get("date") or "", post.get("title") or ""),
        reverse=True,
    )


def normalize_base_url(base_url: str) -> str:
    base = base_url.strip() or "/"
    if not base.startswith("/"):
        base = f"/{base}"
    if not base.endswith("/"):
        base = f"{base}/"
    return base


def link_for(base_url: str, path: str) -> str:
    base = normalize_base_url(base_url)
    clean_path = path.lstrip("/")
    if base == "/":
        return f"/{clean_path}" if clean_path else "/"
    return f"{base}{clean_path}"


def slug_from_canonical(url: str) -> str:
    return url.rstrip("/").rsplit("/", 1)[-1]


def parse_iso_date(value: str | None) -> str:
    if not value:
        return ""
    try:
        if value.endswith("Z"):
            dt_value = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
        else:
            dt_value = dt.datetime.fromisoformat(value)
        return dt_value.date().isoformat()
    except ValueError:
        return value[:10]


def format_display_date(value: str | None) -> str:
    if not value:
        return "Undated"
    if isinstance(value, dt.datetime):
        return value.date().strftime("%B %-d, %Y")
    if isinstance(value, dt.date):
        return value.strftime("%B %-d, %Y")
    try:
        parsed = dt.date.fromisoformat(value[:10])
    except ValueError:
        return value
    return parsed.strftime("%B %-d, %Y")


def decode_substack_json_payload(encoded: str) -> dict[str, Any]:
    decoded = encoded.encode("utf-8").decode("unicode_escape")
    return json.loads(decoded)


def extract_preloads_payload(html_text: str) -> dict[str, Any]:
    match = re.search(
        r"window\._preloads\s*=\s*JSON\.parse\(\"(?P<payload>.*?)\"\)</script>",
        html_text,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError("Could not find window._preloads payload")
    return decode_substack_json_payload(match.group("payload"))


def meta_content(html_text: str, attr: str, name: str) -> str:
    pattern = rf'<meta[^>]+{attr}="{re.escape(name)}"[^>]+content="([^"]*)"'
    match = re.search(pattern, html_text, flags=re.IGNORECASE)
    return html.unescape(match.group(1)).strip() if match else ""


def canonicalize_list(value: Any) -> list[str]:
    if not value:
        return []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return [str(value).strip()]


def infer_related_atlases(slug: str, title: str, upstream_tags: list[str]) -> list[str]:
    text = " ".join([slug, title, " ".join(upstream_tags)]).lower()
    atlas_ids: list[str] = []
    if any(token in text for token in ["yellow", "cholera", "measles", "hantavirus", "mpox", "dengue", "h5n1", "mosquito", "pathogen dispatch"]):
        atlas_ids.append("pathogen-atlas")
    if any(token in text for token in ["maritime", "high-seas", "high seas", "sea", "ship", "port", "napoleon", "atlantic", "mosquito"]):
        atlas_ids.append("maritime-disease-atlas")
    if any(token in text for token in ["viking", "norse", "greenland", "vinland"]):
        atlas_ids.append("viking-health-atlas")
    if any(token in text for token in ["revolution", "colonies", "colonial", "oregon trail", "american republic", "smallpox in the colonies"]):
        atlas_ids.append("revolutionary-war-atlas")
    seen: set[str] = set()
    return [atlas_id for atlas_id in atlas_ids if not (atlas_id in seen or seen.add(atlas_id))]


def default_curated_fields(slug: str, title: str, upstream_tags: list[str], excerpt: str) -> dict[str, Any]:
    topics = [tag for tag in upstream_tags[:6]]
    atlas_links = infer_related_atlases(slug, title, upstream_tags)
    return {
        **CURATED_DEFAULTS,
        "topics": topics,
        "related_atlases": atlas_links,
        "search_excerpt": excerpt[:280],
    }


def merge_post_record(existing: dict[str, Any] | None, incoming: dict[str, Any]) -> dict[str, Any]:
    record = dict(existing or {})
    curated_snapshot = {
        key: record.get(key, CURATED_DEFAULTS.get(key))
        for key in CURATED_FIELDS
    }

    for field in UPSTREAM_FIELDS:
        incoming_value = incoming.get(field)
        if incoming_value not in (None, "", []):
            record[field] = incoming_value

    if existing is None:
        created = default_curated_fields(
            slug=record.get("slug", ""),
            title=record.get("title", ""),
            upstream_tags=canonicalize_list(record.get("upstream_tags")),
            excerpt=record.get("excerpt", ""),
        )
        record.update(created)
        record["first_seen_at"] = record.get("first_seen_at") or now_iso()

    for key, value in curated_snapshot.items():
        if value not in (None, "", []):
            record[key] = value
        elif key not in record:
            record[key] = CURATED_DEFAULTS.get(key)

    record["last_synced_at"] = now_iso()
    record["status"] = record.get("status") or "summary_only"
    record["upstream_tags"] = canonicalize_list(record.get("upstream_tags"))
    record["topics"] = canonicalize_list(record.get("topics"))
    record["series"] = canonicalize_list(record.get("series"))
    record["related_atlases"] = canonicalize_list(record.get("related_atlases"))
    record["related_reference_slugs"] = canonicalize_list(record.get("related_reference_slugs"))
    record["related_story_ids"] = canonicalize_list(record.get("related_story_ids"))
    record["slug"] = record.get("slug") or slug_from_canonical(record.get("canonical_url", ""))
    record["search_excerpt"] = record.get("search_excerpt") or record.get("excerpt", "")
    return record


def load_posts_manifest(path: Path | None = None) -> list[dict[str, Any]]:
    manifest_path = path or (CONTENT_DIR / "posts.yml")
    payload = read_yaml(manifest_path, {"posts": []})
    posts = payload.get("posts", [])
    return sort_posts(posts)


def save_posts_manifest(posts: list[dict[str, Any]], path: Path | None = None) -> None:
    manifest_path = path or (CONTENT_DIR / "posts.yml")
    write_yaml(manifest_path, {"posts": sort_posts(posts)})


def load_atlas_registry(path: Path | None = None) -> list[dict[str, Any]]:
    registry_path = path or (CONTENT_DIR / "atlases.yml")
    payload = read_yaml(registry_path, {"atlases": []})
    return payload.get("atlases", [])


def load_json(path: Path) -> Any:
    return json.loads(path.read_text())


def temporary_directory(prefix: str = "eoe-site-") -> Path:
    return Path(tempfile.mkdtemp(prefix=prefix))


def domain_from_url(url: str) -> str:
    return urlparse(url).netloc
