# September 2026 publication and exhibit redesign

## Implementation scope

The work began from website commit `42f6c794116554d8fe62c76066db20386d21a6b4` and upstream `epi-dossier` commit `8b17f418a053a6fdc405fcc5babe4716ff0dbdac`, in isolated fresh checkouts. The original website working tree contained 191 modified files, one deletion and 46 untracked files; it was not used as an implementation checkout. Its presentation/recording material was inventoried before preserving the applicable public controls. Automated GitHub content refreshes are incorporated before publication.

## Issue inventory

| Issue | Resolution and verification |
|---|---|
| CARTO key-required watermarks in four maps | All four use bundled Natural Earth land geometry and local Leaflet. Third-party-failure browser tests verify usable records and geography. |
| Overlong opening and competing navigation | Short headline, introductory prose, featured essay and ship preview; six primary navigation destinations. Secondary URLs remain in the footer. |
| Repeated generic cover badges | Original, purposeful diagrams for all six exhibits; actual essay cover media retained. |
| Viking navigation collision and missing Revolution navigation | Shared flow-based exhibit navigation; all six tested at 390, 768 and 1440 pixels. |
| Pathogen rotation during reading | Stable default selection, explicit start/stop; collapsible supporting sections, expandable evidence panel and selectable exposure diagram. |
| Duplicate Revolutionary atlas search result | Canonical destination normalization and an exact-one-record regression test. |
| SUNSHINE caption used as synopsis | Curated editorial synopsis, separately stored caption; ingestion strips figure captions from prose. Curated fields survive sync. |
| Repeated essay introduction / empty related-work shells | Full bodies read on-site when present; external essays have one introduction and a reading link. Related-work sections require real links. |
| Repeated services, distant examples, public DNS note | One structured registry renders five packages and the referral guide. Each has deliverables, scope/materials, an honest own-work example and a package-specific inquiry. Prices preserved. |
| Weak timeline entry and comparison | Three guided paths, collapsed advanced filters, retained timeline/table/evidence views, context/response/denominator comparison, shareable filters/events and print support. |
| Pathogen evidence lanes compete visually | Distinct map modes and evidence labels, concise profile with supporting sections collapsed, direct source access. |
| Maritime spatial explanation | Original SVG and optional procedural 3D cutaway; five selectable spaces, source-linked cases, manual rotation and deck separation. No WebGL dependency for the explanatory content. |
| Typhus treated as respiratory crowding | Its category is vector-borne; berth/clothing explanation identifies body lice. Smallpox/COVID retain respiratory categories. |
| Revolutionary “impact” scale and battle-led story | Six disease-led records with chronological navigation, explicit count/status fields and citations. Battle casualties, disease deaths and all-cause deaths are separate. |
| Viking evidence-density ranking | Removed the unsupported ordinal ranking. Cited sample records and documented evidence categories replace it. |
| Viking mixed-period and denominator claims | Ribe's 943 adults span 800–1800; Birka is one individual; Varnhem reports individuals and permanent teeth separately. Later Norse Greenland is labeled separately. |
| Public localhost-dependent Histsearch form | Three static, searchable dossiers with source links, search strategies, review status, dates and CSV/JSON downloads. Local setup is a separate page. |
| Newsdesk publication/retrieval conflation | Fixed in upstream fetching/export/render contracts. Cached re-rendering preserves collection times and unknown publication dates. |
| Inconsistent story country/region | Both derive from the same selected source records; multiple regions and inference basis are explicit. |
| Public processing summaries | Source generation emits monitoring summaries; nested exports and retained public pages remove baseline-processing notices. |
| Builder mixed responsibilities | Rendering, shell, cards, normalization, SEO, curated exhibits and services are separate modules. Public build command retained; source payloads are not overwritten by imports. |
| Invisible focus / unnamed map controls / hidden keyboard targets | Found by real browser tests, fixed, and included in the regression suite. |
| Deployment independent of validation | Shared validation workflow gates exact-artifact upload and deployment. It checks Python, sources, smoke behavior, real mobile layouts, accessibility, interactions and performance. |
| Operational trigger drift | Documentation now matches :23/:53 UTC plus manual Pages delivery, :27 Substack sync, and the actual upstream import contract. |

## Evidence review and limits

The retained records identify what their samples and sources support. Historical diagnoses, estimates, and schematic locations remain qualified. The dataset does not convert skeletal findings into population prevalence, infer a combat history from genomic sex, date a settlement's entire duration from three pieces of wood, or label an environmental model as an observed epidemic.

The new curated exhibits use six Viking records and six Revolutionary disease records. Uncited legacy markers and battle totals were removed from the public dataset rather than carrying their unsupported precision into a new interface. `removed-viking-records.csv` records the legacy material not carried forward. The original versions remain in Git history. Timeline and pathogen coverage is retained (45 timeline entries and 16 pathogen profiles); their claim/source registries and uncertainty fields remain attached. Maritime retains its 16 cited cases and presentation material.

Histsearch source entries explicitly distinguish full-text, methods/discussion, abstract-only review and retrieved metadata. The two metadata-only maritime books are discovery leads, not reviewed evidence. This is a targeted curated collection, not a systematic review or a claim to have freshly re-read every text cited by the older exhibits.

Notable corrected distinctions:

- Ribe's combined-period sample is not a Viking-only denominator or a population life-expectancy estimate.
- Varnhem's 83/171 individuals and 424/3,293 permanent teeth answer different questions.
- The Canada-campaign Adams letter is dated July 2, 1776; the secondary-source date was not retained.
- The February 6, 1777 Shippen order is distinguished from a copyist's misdated transcription.
- Valley Forge's approximately 2,000 disease deaths and Morristown's approximately 100 all-cause deaths are not interchangeable.
- Epidemic typhus, respiratory disease, enteric infection, nutritional deficiency and wound infection remain different mechanisms.

## Design precedents and assets

See [ASSET_CREDITS.md](../../ASSET_CREDITS.md) for the Astra precedents, source links, software licenses, Natural Earth terms, and limits of the ship schematic. The design borrows inspectable layers and procedural geometry; it does not reuse the creators' anatomical models or train assets.

## Verification artifacts

- Before screenshots: `output/playwright/baseline/` (three viewport widths; archived baseline served separately).
- After screenshots and browser results: `output/playwright/after/` and `output/playwright/results.json`.
- Optional ship interaction: `output/playwright/preview/ship-3d.png`.
- Lighthouse HTML/JSON reports: `output/lighthouse/`.
- Referral guide render checks: `output/pdf/referral-1.png` through `referral-3.png`.
- Artifact hash report: `output/validation/artifact.json`; deployed file manifest: `docs/build-manifest.json`.

The first complete browser run found 10 failures; the targeted rerun passed all 10 after fixing marker names, contrast, hidden-drawer focus, publication skip focus, and the evidence-link test. The first mobile Lighthouse pass scored 100 on all four ordinary pages tested, with LCP 0.90–1.20 seconds and CLS 0–0.05. These are local measurements, not production measurements.

Final full-suite and production results are recorded in `VERIFICATION.md` after the final build and deployment.
