from pathlib import Path

from bs4 import BeautifulSoup
from PIL import Image

from src.build_site import render_essays_index
from src.site_cards import render_post_card
from src.site_images import ESSAY_COVERS
from src.site_pages import render_home


def test_plymouth_cover_uses_local_responsive_images_and_only_leads_load_early():
    slug = "disease-and-survival-in-early-plymouth"
    post = {"slug": slug, "title": "Disease and Survival in Early Plymouth",
            "cover_image": "https://example.com/full-size.png"}
    for page in (render_home([post], [], {}, "/preview/"), render_essays_index([post], "/preview/")):
        doc = BeautifulSoup(page, "html.parser")
        card = doc.select_one(".essay-card-media img")
        assert card["loading"] == "eager"
        assert card["fetchpriority"] == "high"
        assert card["src"].startswith("/preview/assets/essays/")
        assert "480w" in card["srcset"] and "960w" in card["srcset"]
        assert "example.com/full-size.png" not in page

    card = BeautifulSoup(render_post_card(post, "/"), "html.parser").img
    assert card["loading"] == "lazy"
    assert not card.has_attr("fetchpriority")

    for width, asset in ESSAY_COVERS[slug]["variants"]:
        with Image.open(Path(__file__).resolve().parents[1] / asset) as image:
            assert image.format == "WEBP"
            assert image.size == (width, width * 3 // 4)
