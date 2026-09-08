import json
from pathlib import Path
from bs4 import BeautifulSoup
from src.common import merge_post_record
from src.substack_sync import reader_markdown_excerpt, article_text_and_caption
from src.site_content import deduplicate_search_records
from src.curated_exhibits import count
from src.site_seo import ensure_head_element
from src.site_services import load_services, render_opportunities_page

ROOT = Path(__file__).resolve().parents[1]


def test_captions_and_curated_editorial_fields_survive_sync():
    text, caption = article_text_and_caption(
        '<figure><img src="a.png"><figcaption>Human bones from an archive. Source: institution.</figcaption></figure><p>The article begins with a documented exchange.</p>'
    )
    assert text == "The article begins with a documented exchange."
    assert caption == "Human bones from an archive. Source: institution."
    assert (
        reader_markdown_excerpt(
            "![Archive](https://example.org/a.png)\n\nSource: National Archives.\n\nThe article begins here."
        )
        == "The article begins here."
    )
    curated = {
        "slug": "sunshine",
        "title": "Original title",
        "editorial_summary": "Edited introduction",
        "image_caption": "Credited image",
        "related_posts": ["historical-essay"],
        "related_atlases": ["maritime-atlas"],
        "search_excerpt": "Search prose",
        "display_title": "Curated title",
    }
    merged = merge_post_record(
        curated,
        {
            "title": "New upstream title",
            "excerpt": "Upstream image caption",
            "image_caption": "Different caption",
        },
    )
    for key in [
        "editorial_summary",
        "image_caption",
        "related_posts",
        "related_atlases",
        "search_excerpt",
        "display_title",
    ]:
        assert merged[key] == curated[key]


def test_unknown_missing_and_zero_are_not_interchangeable():
    assert count(0, "documented") == "0"
    assert count(None, "unknown") == "Unknown"
    assert count(None, "missing") == "Not recorded in this dataset"
    assert count(None, "not_applicable") == "Not applicable"
    assert count(2000, "estimated") == "Estimated: 2,000"
    records = json.loads((ROOT / "data/exhibits/revolutionary.json").read_text())[
        "records"
    ]
    morristown = next(r for r in records if r["total_deaths"] == 100)
    assert morristown["disease_deaths"] is None
    assert morristown["total_deaths_status"] == "estimated"


def test_revolutionary_search_destination_is_unique():
    records = json.loads((ROOT / "docs/app_exports/search-index.json").read_text())
    records = (
        records.get("records", records.get("entries", []))
        if isinstance(records, dict)
        else records
    )
    urls = [r.get("url") or r.get("href") for r in records]
    matches = [url for url in urls if url and "/atlases/revolutionary-war" in url]
    assert len(matches) == 1


def test_curated_site_samples_are_not_population_estimates():
    records = json.loads((ROOT / "data/exhibits/viking.json").read_text())["records"]
    ribe = next(r for r in records if r["id"] == "ribe")
    assert ribe["sample_size"] == 943
    assert "1800" in ribe["date"]
    assert ribe["limitations"]
    sources = {
        s["id"] for s in json.loads((ROOT / "data/exhibits/sources.json").read_text())
    }
    for kind in ["viking", "revolutionary"]:
        for record in json.loads((ROOT / f"data/exhibits/{kind}.json").read_text())[
            "records"
        ]:
            assert record["source_ids"] and set(record["source_ids"]) <= sources
            assert record["finding"] and record["limitations"]


def test_services_show_each_price_once_with_honest_examples():
    soup = BeautifulSoup(render_opportunities_page("/"), "html.parser")
    registry = load_services()
    assert [node.get_text(strip=True) for node in soup.select(".package-price")] == [
        p["price"] for p in registry["packages"]
    ]
    assert len(soup.select(".service-package-card .work-example")) == 5
    assert "DNS" not in soup.get_text()


def test_header_does_not_masquerade_as_html_head():
    assert "<head></head>" in ensure_head_element(
        "<html><body><header>Title</header></body></html>"
    )


def test_article_links_repair_bare_dois_and_reject_paragraphs_as_urls():
    from src.substack_sync import sanitize_post_body_html

    text = sanitize_post_body_html(
        '<p><a href="10.1016/j.earscirev.2020.103196">Source</a> <a href="A%20whole%20paragraph%20was%20pasted%20here.">Historical explanation</a></p>'
    )
    soup = BeautifulSoup(text, "html.parser")
    assert (
        soup.find("a", string="Source")["href"]
        == "https://doi.org/10.1016/j.earscirev.2020.103196"
    )
    assert "href" not in soup.find("a", string="Historical explanation").attrs
