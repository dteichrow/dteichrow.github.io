"""Public CV: one reviewed record feeds the HTML page and downloadable PDF."""

import html
import json
from pathlib import Path

from .common import CONTENT_DIR, link_for, format_display_date
from .site_shell import base_html

PDF_ROUTE = 'assets/cv/devin-teichrow-cv.pdf'


def load_cv():
    return json.loads((CONTENT_DIR / 'cv.json').read_text())


def render_cv_actions(base_url, *, read_link=True):
    read = (f'<a class="button primary" href="{html.escape(link_for(base_url, "about/cv/"))}">Read my CV</a>' if read_link else '')
    return f'<div class="cv-actions">{read}<a class="button" href="{html.escape(link_for(base_url, PDF_ROUTE))}" download="Devin-Teichrow-CV.pdf">Download CV (PDF)</a></div>'


def render_cv_page(base_url):
    cv = load_cv()
    esc = html.escape
    experience = ''.join(
        f'<article class="cv-entry"><h3>{esc(role["title"])}</h3><p class="cv-organization">{esc(role["organization"])}</p><p class="cv-meta">{esc(role["dates"])} · {esc(role["location"])}</p><ul>'
        + ''.join(f'<li>{esc(b)}</li>' for b in role['bullets']) + '</ul></article>'
        for role in cv['experience']
    )
    education = ''.join(f'<article class="cv-entry"><h3>{esc(e["degree"])}</h3><p>{esc(e["institution"])}</p><p class="cv-meta">{esc(e["date"])}</p><p>{esc(e["detail"])}</p></article>' for e in cv['education'])
    publications = ''.join(f'<li><p>{esc(p["citation"])}</p><p class="cv-source">{esc(p["status"])} · <a href="{esc(p["url"])}">{esc(p["url"].removeprefix("https://"))}</a></p></li>' for p in cv['publications'])
    communication = ''.join('<li>' + esc(p['text']) + (f' <a href="{esc(p["url"])}" aria-label="View work: {esc(p["text"].split(":",1)[0])}">View work ↗</a>' if p.get('url') else '') + '</li>' for p in cv['communication'])
    nav = ''.join(f'<a href="#{key}">{label}</a>' for key,label in [('profile','Profile'),('experience','Experience'),('education','Education'),('skills','Methods & skills'),('publications','Publications'),('communication','Public communication')])
    return base_html(title='Devin Teichrow, MSc — Curriculum Vitae', description='Curriculum vitae of Devin Teichrow, MSc: epidemiology, clinical research, data analysis, publications, and science communication. Read online or download the PDF.', active='about', base_url=base_url, body=f'''
    <div class="cv-document">
      <section class="hero cv-hero"><p class="kicker">Curriculum vitae</p><h1 class="hero-title">{esc(cv['name'])}</h1><p class="subtitle">Epidemiology · Research · Science communication</p><p class="cv-meta">{esc(cv['location'])} · Updated <time datetime="{esc(cv['updated'])}">{format_display_date(cv['updated'])}</time></p><p class="cv-contact"><a href="mailto:{esc(cv['email'])}">{esc(cv['email'])}</a><a href="{esc(cv['linkedin'])}">LinkedIn ↗</a></p>{render_cv_actions(base_url,read_link=False)}<p class="cv-back"><a href="{esc(link_for(base_url,'about/'))}">About Devin and The Edge</a> · <a href="{esc(link_for(base_url,'hiring/'))}">For hiring teams</a></p></section>
      <nav class="cv-sections" aria-label="CV sections">{nav}</nav>
      <section class="cv-section" id="profile"><h2>Research profile</h2><p>{esc(cv['profile'])}</p></section>
      <section class="cv-section" id="experience"><h2>Professional experience</h2>{experience}</section>
      <section class="cv-section" id="education"><h2>Education</h2>{education}</section>
      <section class="cv-section" id="skills"><h2>Methods and research skills</h2><p>{esc('; '.join(cv['skills']))}.</p></section>
      <section class="cv-section" id="publications"><h2>Selected publications and research outputs</h2><ol class="cv-publications">{publications}</ol></section>
      <section class="cv-section" id="communication"><h2>Scientific, educational, and public communication</h2><ul>{communication}</ul><p><a href="{esc(link_for(base_url,'writing/'))}">More published writing</a> · <a href="{esc(link_for(base_url,'tools/'))}">Interactive research exhibits</a></p></section>
    </div>''')


def build_cv_pdf(destination):
    """Generate a selectable-text download without relying on a local DOCX or browser."""
    from reportlab.lib import colors
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

    cv = load_cv()
    destination = Path(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    ink = colors.HexColor('#202127')
    indigo = colors.HexColor('#414B82')
    styles = {
        'title': ParagraphStyle('title',fontName='Times-Bold',fontSize=26,leading=30,textColor=ink,spaceAfter=8),
        'heading': ParagraphStyle('heading',fontName='Helvetica-Bold',fontSize=12,leading=16,textColor=indigo,spaceBefore=12,spaceAfter=7,keepWithNext=True),
        'role': ParagraphStyle('role',fontName='Helvetica-Bold',fontSize=10.5,leading=14,textColor=ink,spaceBefore=8,spaceAfter=3,keepWithNext=True),
        'body': ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=13,textColor=ink,spaceAfter=5),
        'meta': ParagraphStyle('meta',fontName='Helvetica',fontSize=9,leading=11.5,textColor=ink,spaceAfter=3,keepWithNext=True),
        'bullet': ParagraphStyle('bullet',fontName='Helvetica',fontSize=10,leading=13,textColor=ink,leftIndent=10,firstLineIndent=-10,spaceAfter=4),
    }
    def clean(value):
        return html.escape(value).replace('–','-').replace('—','-').replace('’',"'")
    def p(text,style='body'):
        return Paragraph(text,styles[style])
    def link(text,url):
        return f'<a href="{html.escape(url,quote=True)}" color="#414B82">{clean(text)}</a>'
    def heading(title):
        return p(clean(title),'heading')
    def roles(records):
        flow=[]
        for r in records:
            flow.extend([p(clean(r['title']),'role'),p(clean(r['organization']),'meta'),p(clean(r['dates']+' | '+r['location']),'meta')])
            flow.extend(p('• '+clean(b),'bullet') for b in r['bullets'])
        return flow
    def footer(canvas,doc):
        canvas.saveState()
        canvas.setStrokeColor(indigo)
        canvas.line(48,42,564,42)
        canvas.setFont('Helvetica',8)
        canvas.setFillColor(ink)
        canvas.drawString(48,28,'Devin Teichrow, MSc | Curriculum vitae | '+cv['updated'])
        canvas.drawRightString(564,28,str(doc.page))
        canvas.restoreState()
    flow=[p(clean(cv['name']),'title'),p(clean(cv['location'])+' | '+link(cv['email'],'mailto:'+cv['email']),'meta'),p(link('LinkedIn',cv['linkedin'])+' | '+link('Online CV','https://dteichrow.github.io/about/cv/'),'meta'),heading('Research profile'),p(clean(cv['profile'])),heading('Professional experience')]
    flow += roles(cv['experience'][:2])
    flow += [PageBreak(),heading('Professional experience, continued')] + roles(cv['experience'][2:])
    flow += [heading('Education')]
    for e in cv['education']:
        flow += [p(clean(e['degree']),'role'),p(clean(e['institution']+' | '+e['date']),'meta'),p(clean(e['detail']))]
    flow += [PageBreak(),heading('Methods and research skills'),p(clean('; '.join(cv['skills'])+'.')),heading('Selected publications and research outputs')]
    for entry in cv['publications']:
        flow += [p(clean(entry['citation'])),p(link(entry['url'].removeprefix('https://'),entry['url']))]
    flow += [heading('Scientific, educational, and public communication')]
    for entry in cv['communication']:
        text=clean(entry['text'])
        if entry.get('url'):text+=' '+link('View work',entry['url'])
        flow.append(p('• '+text,'bullet'))
    doc=SimpleDocTemplate(str(destination),pagesize=(612,792),rightMargin=48,leftMargin=48,topMargin=40,bottomMargin=55,title='Devin Teichrow, MSc - Curriculum Vitae',author='Devin Teichrow',lang='en-US',invariant=1)
    doc.build(flow,onFirstPage=footer,onLaterPages=footer)
