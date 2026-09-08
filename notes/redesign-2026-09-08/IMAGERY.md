# Archival imagery and palette update — September 8, 2026

The six generic exhibit diagrams are replaced with locally hosted, responsive archival and scientific images. Each image has a caption and credit link; `/image-credits/` supplies the uncropped image, creator, source record, reuse rights, and context. The collection heading is shorter so images appear sooner on mobile.

Sources: Wellcome's 1826 quarantine regulations and 1870 Dreadnought engraving; Library of Congress Walter Reed influenza photograph and c. 1775 Boston map; CDC PHIL 1849; Carolina Bertilsson's Varnhem examination photograph, licensed CC BY 4.0 through PLOS. Full metadata and hashes are in `assets/exhibits/image-credits.json`. Historical image colours are preserved. The photos introduce the exhibits; they are not substituted for the exhibits' underlying data or the schematic ship model.

The publication palette is paper, charcoal, indigo, rust, gold, and neutral slate. Map land/coastlines, scientific category colours, evidence labels, navigation, the SVG/Three ship, service materials, and Newsdesk styles no longer use forest green or teal. The artifact gate checks generated styles and owned vector/script assets. Upstream epi-dossier PR #3 also refreshes embedded colours in archived reports without changing their dates or reporting.

Verification before deployment:

- 88 website Python tests pass; source validation, tool smoke checks, and repository health checks pass.
- 181 epi-dossier Python tests and its GitHub quality gate pass.
- Full 55-case Playwright run passes: six exhibits, primary interactions, shareable state, three viewport widths, no third-party geography dependency, no WebGL requirement, and WCAG A/AA scans. The permalink test now waits for the native details-toggle event to update the URL before reloading.
- New image checks exercise all six covers, credits navigation, 390/768/1440px layouts, original-image credits, and availability when external collection servers fail.
- Mobile Lighthouse: all four ordinary-page scores 100. LCP 0.90–1.65 seconds; CLS 0–0.051. Configuration: 390×844 mobile, 150ms RTT, 1,638.4Kbps, 4× CPU slowdown, simulated throttling.
- Before/after screenshots at the same three widths are in `output/playwright/imagery/`; `output/imagery-review.html` provides a comparison viewer.

Deployment rebuilds once and runs the same validation suite before uploading that exact artifact. The production deployment run and live verification are recorded in the handoff after release.
