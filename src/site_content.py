"""Site content."""

from __future__ import annotations
import re
from typing import Any
from .common import format_display_date
from .site_config import NOINDEX_POST_STRATEGIES, TOPIC_HUBS


def post_folio_meta(post: dict[str, Any]) -> tuple[str, str]:
    date_text = format_display_date(post.get("date"))
    category_text = ""
    if post.get("series"):
        category_text = str(post["series"][0])
    elif post.get("topics"):
        category_text = str(post["topics"][0])
    strategy = post_indexing_strategy(post)
    if strategy == "evergreen":
        status_label = "Evergreen"
    elif post.get("status") == "mirrored":
        status_label = "Full essay"
    elif post_should_index(post):
        status_label = "On Substack"
    else:
        status_label = "Private archive"
    utility_meta = " · ".join(item for item in [category_text, status_label] if item)
    return date_text, utility_meta


def public_tool_status(entry: dict[str, Any]) -> str:
    status = str(entry.get("status") or "").lower()
    tool_type = str(entry.get("tool_type") or "tool").replace("_", " ").title()
    if status == "live":
        return "Open now"
    if status in {"prototype", "in_build", "section"}:
        return f"{tool_type} section"
    return tool_type


def public_tool_export(entry: dict[str, Any]) -> dict[str, Any]:
    public_entry = {
        key: value
        for key, value in entry.items()
        if key
        not in {
            "source_path",
            "launch_priority",
            "legacy_atlas_id",
        }
    }
    public_entry["status_label"] = str(
        entry.get("status_label") or public_tool_status(entry)
    )
    public_entry["status"] = (
        "open" if str(entry.get("status") or "").lower() == "live" else "section"
    )
    return public_entry


def public_post_export(post: dict[str, Any]) -> dict[str, Any]:
    internal_keys = {
        "flashcards",
        "flashcards_generated_at",
        "flashcards_source",
        "flashcards_source_url",
        "local_body_path",
        "body_synced_at",
        "body_source_url",
        "body_source_mode",
        "body_source_file",
        "body_wordcount",
        "source_mode",
        "indexing_strategy",
        "first_seen_at",
        "last_synced_at",
        "sync_source",
        "source_path",
        "original_title",
        "site_visibility",
    }
    return {key: value for key, value in post.items() if key not in internal_keys}


def canonical_meta(values: list[str]) -> list[str]:
    return [value for value in values if value]


def post_display_title(post: dict[str, Any]) -> str:
    return post.get("seo_title") or post.get("title") or "Untitled post"


def post_seo_description(post: dict[str, Any]) -> str:
    return (
        post.get("editorial_summary")
        or post.get("seo_description")
        or post.get("dek")
        or post.get("excerpt")
        or post.get("search_excerpt")
        or "Published writing from The Edge of Epidemiology."
    )


def normalize_overview_paragraph(value: Any) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def post_overview_paragraphs(post: dict[str, Any]) -> list[str]:
    candidates = [
        post_seo_description(post),
        post.get("excerpt") or post.get("search_excerpt") or "",
    ]
    paragraphs: list[str] = []
    seen: set[str] = set()
    for candidate in candidates:
        paragraph = normalize_overview_paragraph(candidate)
        if not paragraph:
            continue
        key = paragraph.casefold()
        if key in seen:
            continue
        seen.add(key)
        paragraphs.append(paragraph)
    return paragraphs


def post_indexing_strategy(post: dict[str, Any]) -> str:
    strategy = str(post.get("indexing_strategy") or "").strip()
    if strategy == "noindex_stub":
        return "summary_only"
    if strategy:
        return strategy
    if post.get("status") == "mirrored":
        return "mirrored"
    return "summary_only"


def post_should_index(post: dict[str, Any]) -> bool:
    return post_indexing_strategy(post).lower() not in NOINDEX_POST_STRATEGIES


def post_site_visibility(post: dict[str, Any]) -> str:
    visibility = str(post.get("site_visibility") or "").strip().lower()
    if visibility:
        return visibility
    # Existing Substack records predate site_visibility. Treat synced records
    # that already have a publication status as public, while keeping bare
    # tombstone/test records without status out of the essay archive.
    if str(post.get("status") or "").strip():
        return "public"
    return ""


def is_public_essay_post(post: dict[str, Any]) -> bool:
    return post_site_visibility(post) == "public" and post_should_index(post)


def public_essay_posts(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [post for post in posts if is_public_essay_post(post)]


def post_topic_cluster(post: dict[str, Any]) -> str:
    if post.get("topic_cluster"):
        return str(post["topic_cluster"])
    text = " ".join(
        [
            str(post.get("slug", "")),
            str(post.get("title", "")),
            " ".join(str(topic) for topic in post.get("topics", [])),
            " ".join(str(tag) for tag in post.get("upstream_tags", [])),
        ]
    ).lower()
    for hub in TOPIC_HUBS:
        if any(keyword in text for keyword in hub["keywords"]):
            return str(hub["slug"])
    return "historical-epidemiology" if "history" in text else "epidemiologic-methods"


def topic_hub_title(slug: str) -> str:
    for hub in TOPIC_HUBS:
        if hub["slug"] == slug:
            return str(hub["title"])
    return slug.replace("-", " ").title()


def deduplicate_search_records(records):
    """Merge aliases by destination; explicit tool metadata takes precedence."""
    from urllib.parse import urlsplit, urlunsplit

    output = {}
    for record in records:
        parts = urlsplit(record["url"])
        path = re.sub(r"/index\.html$", "/", parts.path).rstrip("/") + "/"
        key = urlunsplit((parts.scheme.lower(), parts.netloc.lower(), path, "", ""))
        entry = dict(record)
        if entry.get("section") in {"Atlas", "Tool"}:
            entry["section"] = "Exhibit"
        if key in output:
            entry["keywords"] = " ".join(
                dict.fromkeys(
                    (
                        output[key].get("keywords", "")
                        + " "
                        + entry.get("keywords", "")
                    ).split()
                )
            )
        output[key] = entry
    return list(output.values())
