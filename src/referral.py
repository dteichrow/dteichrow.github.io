"""Generate the public referral guide from the same registry as the services page."""

from pathlib import Path
import html
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from .site_services import load_services, inquiry_url
from .common import PROJECT_ROOT

PAPER = colors.HexColor("#F6F1E4")
INK = colors.HexColor("#142126")
TEAL = colors.HexColor("#155D66")


def build_referral(destination=None):
    destination = Path(destination or PROJECT_ROOT / "assets/referral")
    destination.mkdir(parents=True, exist_ok=True)
    from reportlab import rl_config

    rl_config.invariant = 1
    registry = load_services()
    packages = registry["packages"]
    contact = registry["contact"]
    styles = {
        "title": ParagraphStyle(
            "title",
            fontName="Times-Roman",
            fontSize=33,
            leading=35,
            textColor=INK,
            spaceAfter=18,
        ),
        "h2": ParagraphStyle(
            "h2",
            fontName="Times-Roman",
            fontSize=20,
            leading=23,
            textColor=INK,
            spaceAfter=8,
        ),
        "body": ParagraphStyle(
            "body",
            fontName="Helvetica",
            fontSize=10.5,
            leading=15.5,
            textColor=INK,
            spaceAfter=9,
        ),
        "small": ParagraphStyle(
            "small",
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=INK,
            spaceAfter=6,
        ),
        "kicker": ParagraphStyle(
            "kicker",
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=13,
            textColor=TEAL,
            spaceAfter=13,
        ),
    }

    def para(text, style="body"):
        return Paragraph(text, styles[style])

    def esc(text):
        return html.escape(text).replace("–", "-").replace("’", "'")

    def link(text, url):
        return (
            f'<a color="#155D66" href="{html.escape(url, quote=True)}">{esc(text)}</a>'
        )

    def page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, 612, 792, fill=1, stroke=0)
        canvas.setStrokeColor(TEAL)
        canvas.line(44, 752, 568, 752)
        canvas.line(44, 42, 568, 42)
        canvas.setFillColor(INK)
        canvas.setFont("Helvetica", 8)
        canvas.drawString(44, 27, "DEVIN TEICHROW / THE EDGE OF EPIDEMIOLOGY")
        canvas.drawRightString(568, 27, f"{doc.page}")
        canvas.restoreState()

    flow = [
        para("RESEARCH / WRITING / PUBLIC EXHIBITS", "kicker"),
        para("Make your research<br/>easier to use.", "title"),
        para(
            "Devin Teichrow, MSc<br/>UCLA-trained epidemiologist working in neurology at UC Irvine; writer and builder behind The Edge of Epidemiology."
        ),
        para(
            "I help researchers, labs, health teams, and editors turn technical work into clear writing, useful analysis, and public websites."
        ),
        Spacer(1, 12),
    ]
    rows = []
    for package in packages:
        rows.append(
            [
                para(
                    link(
                        package["name"],
                        "https://devinteichrow.com/opportunities/#" + package["id"],
                    ),
                    "body",
                ),
                para(esc(package["price"]), "body"),
            ]
        )
    table = Table(rows, colWidths=[390, 134], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#BAC0B2")),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    flow += [
        table,
        Spacer(1, 20),
        para(
            "Define the deliverable → build and review → hand over the work".replace(
                "→", " / "
            ),
            "h2",
        ),
        para(
            "We agree on the audience, source material, output, scope, and review points. You receive the finished artifact, relevant source files, and instructions for using or updating it."
        ),
        para(f"<b>Maintenance: {esc(registry['maintenance'])}</b>, separately scoped."),
        para(
            "To start, send the problem, audience, existing materials, deadline, and budget range."
        ),
        para(link(contact, inquiry_url("Research project", contact))),
        para(
            link(
                "View current packages and examples",
                "https://devinteichrow.com/opportunities/",
            ),
            "small",
        ),
        PageBreak(),
    ]
    for index, package in enumerate(packages):
        if index == 3:
            flow.append(PageBreak())
        flow.extend(
            [
                para(f"{index + 1:02} / {esc(package['price'])}", "kicker"),
                para(esc(package["name"]), "h2"),
                para(esc(package["problem"]), "small"),
                para(
                    "<b>What you receive</b><br/>"
                    + "<br/>".join("• " + esc(t) for t in package["deliverables"]),
                    "small",
                ),
                para("<b>To begin:</b> " + esc(package["materials"]), "small"),
                para("<b>Scope:</b> " + esc(package["scope"]), "small"),
                para(
                    "Example from my own work: "
                    + link(
                        package["example"],
                        "https://devinteichrow.com/" + package["route"],
                    ),
                    "small",
                ),
                Spacer(1, 15),
            ]
        )
    doc = SimpleDocTemplate(
        str(destination / "devin-teichrow-referral-packet.pdf"),
        pagesize=(612, 792),
        rightMargin=44,
        leftMargin=44,
        topMargin=57,
        bottomMargin=57,
        title="Work with Devin Teichrow - Research services",
        author="Devin Teichrow",
    )
    doc.build(flow, onFirstPage=page, onLaterPages=page)
    from .site_services import render_opportunities_page

    from bs4 import BeautifulSoup

    portable = BeautifulSoup(render_opportunities_page("/"), "html.parser")
    stylesheet = portable.select_one('link[rel="stylesheet"]')
    style = portable.new_tag("style")
    style.string = (PROJECT_ROOT / "assets/site.css").read_text()
    stylesheet.replace_with(style)
    for script in portable.select("script"):
        script.decompose()
    for node in portable.select('[href^="/"]'):
        node["href"] = "https://dteichrow.github.io" + node["href"]
    (destination / "devin-teichrow-referral-packet.html").write_text(str(portable))

    return destination / "devin-teichrow-referral-packet.pdf"


if __name__ == "__main__":
    print(build_referral())
