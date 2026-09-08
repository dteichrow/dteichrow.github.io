# Redesign verification

## Local acceptance run — September 8, 2026

The isolated implementation incorporates upstream website content through `0745f64e0cd46515c2fc9eebd82146238d7977d5`. The original checkouts were left untouched.

| Check | Result |
|---|---|
| Website Python regression suite | 85 passed |
| Upstream Newsdesk Python regression suite | 177 passed locally and on GitHub |
| Evidence/source validator | Passed |
| Public tool smoke tests | Passed |
| Built artifact and internal destination checks | Passed; 679 files in the recorded local artifact |
| Real Chromium browser suite | 45 original cases passed, plus six added Newsdesk/story cases (51 total): 30 viewport/layout cases, ten automated WCAG scans across the suite, and 13 interaction/fallback cases |
| Viewport widths | Actual 390, 768 and 1440 pixels; no page-level horizontal overflow or navigation/heading collisions in the tested pages |
| Keyboard and motion | Visible skip/focus, timeline modal focus/return, named markers, visitor-controlled motion and reduced-motion alternatives passed |
| Third-party/WebGL failure | Local geography and record controls remain usable; illustrated ship and supporting evidence remain accessible |
| Referral guide | Three rendered PDF pages visually inspected; generated from the same five packages and prices as the webpage |

Automated accessibility scans are complemented by the explicit keyboard tests; they are not a claim that every possible assistive-technology combination was tested.

## Mobile performance

Lighthouse 12.8.2, Chrome, 390×844 viewport, simulated mobile throttling: 150 ms RTT, 1,638.4 Kbps throughput and 4× CPU slowdown. Results below are local preview measurements; GitHub repeats the performance gate on the artifact it deploys.

| Page | Performance | LCP | CLS |
|---|---:|---:|---:|
| Homepage | 100 | 1.20 s | 0 |
| Work with me | 100 | 0.95 s | 0 |
| Essays | 100 | 1.20 s | 0 |
| Project SUNSHINE essay | 100 | 0.94 s | 0.0505 |

Ordinary pages never request the Three.js payload. It is imported only after opening the optional 3D cutaway.

## Artifacts and deployment

- `output/playwright/baseline/`: archived baseline screenshots at three real viewport widths.
- `output/playwright/after/`: final full-page screenshots; card images are decoded before capture.
- `output/redesign-review.html`: local before/after comparison gallery with viewport selector.
- `output/playwright/results.json`: complete browser results.
- `output/lighthouse/`: machine-readable and HTML performance reports.
- `output/validation/artifact.json`: artifact validation and hash.
- `/build-manifest.json`: the deployed commit and SHA-256 hashes of its tested files.

Newsdesk contract fix: [epi-dossier PR #1](https://github.com/dteichrow/epi-dossier/pull/1), merged as `707df3ad72a5671515b8192e9e227618b0e57106`. Both its quality gate and public publisher succeeded.

The website delivery uses `deploy_pages → validated-artifact → deploy`. The reusable validation job builds once, runs the checks above, records the file hashes, then uploads that exact directory. The deploy job consumes the uploaded artifact without rebuilding. GitHub retains verification reports for 30 days.

Production verification, the website PR and deployment run are recorded in the final handoff after delivery. GitHub Pages hosting, existing URLs and service prices are preserved; no DNS migration is part of this change.

## Production review follow-up

The initial deployment at `0ed03961e3e87d7567ac3a5b0cf2820e66f7a2d5` passed its GitHub gate and all 45 live-browser cases. All 678 publicly served files matched the deployed manifest; `.nojekyll` is a deployment control file and is not publicly served by Pages. The broader live review then identified the old imported Newsdesk header. The follow-up extracts the imported shell, reuses the same primary navigation registry, adds a flowing mobile header and skip link, corrects source-badge contrast, and expands the gate to Newsdesk and an outbreak story at three widths.
