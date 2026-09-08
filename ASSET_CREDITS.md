# Asset and interaction credits

The publication's mark, six exhibit cover diagrams, SVG ship section, and procedural Three.js ship geometry are original work for The Edge of Epidemiology. They are explanatory illustrations. The ship combines features to make mechanisms inspectable; it is not a named vessel, scale reconstruction, or airflow simulation.

## Bundled geography and software

- **Natural Earth, 1:50m land polygons**, public domain. [Data terms](https://www.naturalearthdata.com/about/terms-of-use/). The bundled dataset omits feature properties and rounds coordinates to four decimal places. This is geographic context, not historical political geography. Ocean labels are curated separately and appear at appropriate zoom levels.
- **Leaflet 1.9.4**, BSD 2-Clause. Local JavaScript, styles, marker images, and license are under `assets/vendor/leaflet/`.
- **Three.js 0.180.0**, MIT. Local ES modules and license are under `assets/vendor/three/`. The module's import was rewritten to reference the local core file. It loads only when a visitor opens the 3D cutaway.
- `assets/vendor/manifest.json` records source URLs, downloaded hashes when applicable, and hashes of the actual bundled files. No CARTO tiles, API key, or third-party map request is required.

## Ship references

The spatial treatment was informed by the [Royal Museums Greenwich ship-plan collection](https://www.rmg.co.uk/collections/our-collections-ship-plans-collection) and its [ventilation-opening drawing](https://prints.rmg.co.uk/collections/ship-plans/products/ventilation-openings-for-three-deck-ships-of-war-j7328). No museum model or drawing is reproduced. Each ship-space panel links to the maritime cases and historical or public-health sources supporting its mechanism explanation.

## Interaction research

The approved design research identified these useful precedents:

- Brian Pridgen's [Anatomy, unfolded.](https://anatomy-unfolded.brianp.chatgpt.site/) and [creator attribution to Astra](https://x.com/HandEManAI/status/2096253408009486619): separate an object into inspectable layers. Its credited anatomical assets were not reused.
- Tom Krcha's [procedural train demonstration](https://x.com/tomkrcha/status/2096082580554777041): editable geometry and mechanical relationships constructed in code. Creator-reported production/performance claims were not treated as independently verified benchmarks.
- OpenAI's [Playco case study](https://openai.com/index/playco-game-prototyping-with-astra/): reuse a foundation across related experiences and verify the interactions in a browser.

## Historical images and source records

Existing archival images retain their per-image credit and rights statements in the timeline and maritime data. Essay cover images retain their upstream source URLs. No new archival photograph, historical observation, client, testimonial, or commercial result has been invented.

The curated record exhibits and Histsearch share `data/exhibits/sources.json`. Each entry distinguishes source publication date, review date, review status, and an editorial note. “Retrieved metadata” is not a claim that the underlying text was reviewed.
