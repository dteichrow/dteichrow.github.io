"""Publication shell for imported Newsdesk documents, isolated from their styles."""

import html
from .common import link_for
from .site_shell import PRIMARY_NAV


def shell_wrapper_css(base_url: str) -> str:
    return """<style id="eoe-shell-import-style">
body { padding-top:0 !important; margin:0; background:#f6f1e4 !important; color:#202127; }
.eoe-shell-nav { position:relative; background:#f6f1e4; color:#202127; border-bottom:3px solid #b84a3e; }
.eoe-shell-nav-inner { max-width:1320px; margin:auto; padding:20px 4vw; display:flex; align-items:center; justify-content:space-between; gap:24px; font-family:"Avenir Next","Helvetica Neue",Arial,sans-serif; }
.eoe-shell-brand { display:flex; align-items:center; gap:12px; color:#202127; text-decoration:none; font:700 20px/1.05 "Iowan Old Style",Palatino,Georgia,serif; flex-shrink:0; }
.eoe-shell-mark { border:1px solid #555561; padding:12px 8px; font-style:italic; }
.eoe-shell-byline { display:block; margin-top:8px; color:#555561; font:10px/1.4 "Avenir Next","Helvetica Neue",Arial,sans-serif; text-transform:uppercase; letter-spacing:.08em; }
.eoe-shell-links { display:flex; flex-wrap:wrap; align-items:center; gap:8px 24px; }
.eoe-shell-links a { display:inline-flex; align-items:center; min-height:44px; color:#202127; font-size:14px; text-decoration:none; border-bottom:2px solid transparent; }
.eoe-shell-links a:hover,.eoe-shell-links a.active { border-color:#414b82; }
.eoe-import-skip { position:absolute; top:12px; left:12px; z-index:20000; background:#202127; color:#fff; padding:12px; }
.eoe-import-skip:not(:focus) { clip-path:inset(50%); width:1px; height:1px; padding:0; overflow:hidden; }
:focus-visible { outline:3px solid #b84a3e !important; outline-offset:4px; }
.eoe-import-footer { max-width:1320px; margin:40px auto 0; padding:24px 4vw; border-top:1px solid #555561; font-family:"Avenir Next","Helvetica Neue",Arial,sans-serif; }
.eoe-import-footer nav { display:flex; flex-wrap:wrap; gap:12px 24px; }
.eoe-import-footer a { color:#414b82; padding:8px 0; }
.hero,.panel,.section-nav { background:transparent !important; border:0 !important; border-radius:0 !important; box-shadow:none !important; }
.hero { padding:0 0 6px !important; overflow:visible !important; }
.hero::before,.hero::after,.panel::before,.panel::after { display:none !important; }
.section-nav { display:none !important; }
.meta-row-plain { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:10px; }
.meta-inline,.card-meta-text { color:#555561; font:500 .86rem/1.55 "Avenir Next","Helvetica Neue",Arial,sans-serif; }
.card-meta-text { margin:0; }
.site-card .meta-row .badge { max-width:none; }
.badge.tone-major { color:#75540c !important; }
.link-pill { background:#fffdf7 !important; }
@media(max-width:800px) {
 .eoe-shell-nav-inner { align-items:flex-start; flex-direction:column; gap:14px; padding:16px 5vw; }
 .eoe-shell-links { gap:4px 20px; }
 .eoe-shell-links a { font-size:13px; }
}
@media(prefers-reduced-motion:reduce) { *,*::before,*::after { animation:none !important; transition:none !important; scroll-behavior:auto !important; } }
</style>"""


def imported_shell_nav(active: str, base_url: str) -> str:
    links = "".join(
        f'<a class="{"active" if key == active else ""}" href="{html.escape(link_for(base_url, route))}"'
        + (' aria-current="page"' if key == active else "")
        + f">{label}</a>"
        for label, route, key in PRIMARY_NAV
    )
    return (
        '<a class="eoe-import-skip" href="#eoe-import-main">Skip to content</a>'
        '<header class="eoe-shell-nav"><div class="eoe-shell-nav-inner">'
        f'<a class="eoe-shell-brand" href="{html.escape(link_for(base_url, ""))}" aria-label="The Edge of Epidemiology — home">'
        '<span class="eoe-shell-mark" aria-hidden="true">E∕E</span>'
        '<span>The Edge of<br>Epidemiology<small class="eoe-shell-byline">By Devin Teichrow</small></span></a>'
        f'<nav class="eoe-shell-links" aria-label="Primary navigation">{links}</nav></div></header>'
    )


def imported_shell_footer(base_url: str) -> str:
    links = "".join(
        f'<a href="{html.escape(link_for(base_url, route))}">{label}</a>'
        for label, route in [
            ("Topics", "topics/"),
            ("Historical", "historical/"),
            ("Reference", "reference/"),
            ("Methods", "methods/"),
            ("Image credits", "image-credits/"),
            ("Notebook", "notebook/"),
            ("Work with me", "opportunities/"),
        ]
    )
    return f'<footer class="eoe-import-footer"><p>The Edge of Epidemiology · The Pathogen Dispatch</p><nav aria-label="Further reading">{links}</nav></footer>'
