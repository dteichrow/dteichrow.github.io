"""Create a portable local comparison page from the captured browser evidence."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
routes = {
    "Homepage": "",
    "Work with me": "opportunities/",
    "American Epidemic Timeline": "tools/american-epidemic-timeline/",
    "Pathogen Atlas": "atlases/pathogen/",
    "Maritime Disease Atlas": "atlases/maritime/",
    "Viking Health Atlas": "atlases/viking/",
    "Revolutionary War Disease Atlas": "atlases/revolutionary-war/",
    "Histsearch": "tools/histsearch/",
}
page = """<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Edge of Epidemiology — before and after</title>
<style>body{margin:0;padding:4vw;background:#f6f1e4;color:#142126;font:17px/1.5 system-ui}h1,h2{font-family:Georgia,serif}header{max-width:850px}select{padding:12px;font:inherit;margin:0 15px 20px 0}main{display:grid;grid-template-columns:1fr 1fr;gap:24px}figure{margin:0}img{width:100%;height:70vh;object-fit:cover;object-position:top;border:1px solid #46545b}a{color:#155d66}:focus-visible{outline:3px solid #b84a3e}small{display:block} @media(max-width:650px){main{grid-template-columns:1fr}}</style>
<header><p>THE EDGE OF EPIDEMIOLOGY · SEPTEMBER 2026</p><h1>Publication and exhibits, rebuilt.</h1><p>Compare the archived original with the tested redesign. The previews show the top of each page; open an image to inspect its full capture.</p></header>
<label>Page <select id="route"></select></label><label>Viewport <select id="width"><option>1440</option><option>768</option><option>390</option></select> pixels</label>
<main><figure><h2>Before</h2><a id="before-link"><img id="before" alt="Original page screenshot"></a><small>Original source commit 42f6c794.</small></figure><figure><h2>After</h2><a id="after-link"><img id="after" alt="Redesigned page screenshot"></a><small>Final local browser capture; full page available.</small></figure></main>
<script>const routes=ROUTES;const choice=document.querySelector('#route');for(const [name,value] of Object.entries(routes)){const option=new Option(name,value);choice.add(option)}function render(){const route=choice.value,width=document.querySelector('#width').value;for(const which of ['before','after']){const name=which==='before'?(route.replaceAll('/','-')||'home'):('/'+route).replaceAll('/','-');const path=`playwright/${which==='before'?'baseline':'after'}/${width}-${name}.png`;document.getElementById(which).src=path;document.getElementById(which+'-link').href=path}}choice.onchange=render;document.querySelector('#width').onchange=render;render();</script></html>"""
(ROOT / "output").mkdir(exist_ok=True)
(ROOT / "output/redesign-review.html").write_text(page.replace("ROUTES", json.dumps(routes)))
