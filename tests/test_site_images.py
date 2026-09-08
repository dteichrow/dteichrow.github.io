import hashlib
from pathlib import Path

from bs4 import BeautifulSoup
from PIL import Image

from src.common import load_tool_registry
from src.site_images import image_records, render_exhibit_image, render_image_credits
from scripts.validate_artifact import green_palette_values

ROOT = Path(__file__).resolve().parents[1]


def test_every_exhibit_has_a_local_image_with_traceable_rights():
    tools = load_tool_registry(ROOT / "content/tools.yml", ROOT / "content/atlases.yml")
    records = image_records()
    assert set(records) == {tool["tool_id"] for tool in tools}
    for record in records.values():
        for field in [
            "creator",
            "collection",
            "source",
            "license",
            "license_url",
            "rights_note",
            "alt",
            "changes",
        ]:
            assert record[field]
        for variant in record["variants"]:
            path = ROOT / variant["path"]
            assert hashlib.sha256(path.read_bytes()).hexdigest() == variant["sha256"]
            assert Image.open(path).size == (variant["width"], variant["height"])
            assert variant["width"] <= record["original_dimensions"][0]


def test_cover_captions_and_full_images_are_accessible_under_a_base_path():
    for image_id in image_records():
        soup = BeautifulSoup(
            render_exhibit_image(image_id, "/preview/", "/preview/tools/"),
            "html.parser",
        )
        assert soup.img["alt"]
        assert soup.img["src"].startswith("/preview/assets/")
        assert "w" in soup.img["srcset"]
        assert soup.figcaption.a["href"] == "/preview/image-credits/#" + image_id
    credits = BeautifulSoup(render_image_credits("/preview/"), "html.parser")
    assert len(credits.select(".image-credit-record")) == 6
    viking = credits.select_one("#viking-health-atlas")
    assert "Carolina Bertilsson" in viking.get_text()
    assert viking.select_one('a[href="https://creativecommons.org/licenses/by/4.0/"]')
    assert "object-position" not in str(viking.img)


def test_palette_gate_detects_hex_rgba_and_named_green_without_rejecting_rust():
    assert (
        len(green_palette_values("#155d66; rgba(60,88,48,.12); forestgreen; #142126"))
        == 4
    )
    assert green_palette_values("#202127; #414b82; #B84A3E; #B28B3E; #F6F1E4") == []
