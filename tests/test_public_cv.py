from bs4 import BeautifulSoup
from pypdf import PdfReader

from src.build_site import render_about_page
from src.site_cv import load_cv, render_cv_page, build_cv_pdf
from src.site_pages import render_hiring_page
from src.site_seo import seo_profile_for_route


def test_public_cv_is_readable_without_scripts_or_an_embedded_pdf():
    cv = load_cv()
    page = BeautifulSoup(render_cv_page('/preview/'), 'html.parser')
    assert len(page.select('h1')) == 1
    assert not page.select('iframe, embed, object')
    assert len(page.select('#experience article')) == len(cv['experience'])
    for entry in cv['experience']:
        for bullet in entry['bullets']:
            assert bullet in page.get_text()
    for entry in cv['publications']:
        assert entry['citation'] in page.get_text()
        assert page.select_one(f'a[href="{entry["url"]}"]')
    for link in page.select('.cv-sections a'):
        assert page.select_one(link['href'])
    assert page.select_one('a[download]')['href'] == '/preview/assets/cv/devin-teichrow-cv.pdf'


def test_cv_download_is_complete_current_selectable_and_deterministic(tmp_path):
    pdf = tmp_path / 'cv.pdf'
    build_cv_pdf(pdf)
    first = pdf.read_bytes()
    reader = PdfReader(pdf)
    assert len(reader.pages) == 3
    text = '\n'.join(p.extract_text() for p in reader.pages)
    assert all(len(p.extract_text()) > 1500 for p in reader.pages)
    for title in ['Assistant Specialist', 'Clinical Research Data Manager',
                  "Food Rx and Related Research Master's Intern", 'Graduate Student Researcher',
                  'Undergraduate Research Assistant', 'Undergraduate Student Researcher and Thesis Advisee',
                  'Bachelor of Arts', 'Master of Science', '10.1111/head.70113', 'not peer reviewed']:
        assert title in text
    assert 'Present' not in text
    assert '(909)' not in text
    assert reader.metadata.author == 'Devin Teichrow'
    build_cv_pdf(pdf)
    assert pdf.read_bytes() == first


def test_public_cv_is_discoverable_from_about_hiring_and_search_metadata():
    for render in [render_about_page, render_hiring_page]:
        page = BeautifulSoup(render('/preview/'), 'html.parser')
        assert page.select_one('a[href="/preview/about/cv/"]')
        assert page.select_one('a[href="/preview/assets/cv/devin-teichrow-cv.pdf"][download]')
    profile = seo_profile_for_route('about/cv/', render_cv_page('/'), {})
    assert profile['schema_type'] == 'ProfilePage'
    assert profile['noindex'] is False
    assert 'Curriculum Vitae' in profile['title']


def test_publication_status_does_not_conflate_pubmed_indexing_with_peer_review():
    papers = {p['url']: p for p in load_cv()['publications']}
    assert papers['https://doi.org/10.1111/head.70113']['status'] == 'Journal article'
    assert papers['https://doi.org/10.64898/2026.04.14.26350866']['status'] == 'Preprint'
