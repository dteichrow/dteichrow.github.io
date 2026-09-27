from bs4 import BeautifulSoup

from src.referral import build_referral
from src.site_seo import apply_seo_profile, seo_profile_for_route


def test_portable_referral_html_canonicalizes_to_opportunities(tmp_path):
    build_referral(tmp_path)

    page = BeautifulSoup(
        (tmp_path / "devin-teichrow-referral-packet.html").read_text(), "html.parser"
    )
    assert page.select_one('meta[name="robots"][content="noindex,follow"]')
    assert page.select_one(
        'link[rel="canonical"][href="https://devinteichrow.com/opportunities/"]'
    )

    profile = seo_profile_for_route(
        "assets/referral/devin-teichrow-referral-packet.html",
        str(page),
        {},
    )
    finalized = BeautifulSoup(apply_seo_profile(str(page), profile), "html.parser")
    assert finalized.select_one('meta[name="robots"][content="noindex,follow"]')
    assert finalized.select_one(
        'link[rel="canonical"][href="https://devinteichrow.com/opportunities/"]'
    )
