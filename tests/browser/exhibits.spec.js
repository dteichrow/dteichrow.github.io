import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/opportunities/",
  "/tools/american-epidemic-timeline/",
  "/atlases/pathogen/",
  "/atlases/maritime/",
  "/atlases/viking/",
  "/atlases/revolutionary-war/",
  "/tools/histsearch/",
];
test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.__errors = errors;
});
test.afterEach(async ({ page }) => expect(page.__errors).toEqual([]));
for (const width of [390, 768, 1440])
  for (const route of routes)
    test(`${width}px layout ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
      expect(await page.evaluate(() => innerWidth)).toBe(width);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const nav = page.locator(".site-header,.eoe-exhibit-nav").first(),
        title = page.locator("h1").first();
      expect(
        (await nav.boundingBox()).y + (await nav.boundingBox()).height,
      ).toBeLessThanOrEqual((await title.boundingBox()).y + 1);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link,.eoe-skip").first()).toBeFocused();
      await page.keyboard.press("Enter");
      expect(
        await page.evaluate(
          () => getComputedStyle(document.activeElement).outlineStyle,
        ),
      ).not.toBe("none");
      await page.locator(".essay-card-media img,.atlas-card-visual img").evaluateAll(async (images) => {
        images.forEach(image => image.loading = "eager");
        await Promise.race([
          Promise.allSettled(images.map(image => image.decode())),
          new Promise(resolve => setTimeout(resolve, 5000)),
        ]);
      });
      await page.screenshot({
        path: `output/playwright/after/${width}-${route.replaceAll("/", "-") || "home"}.png`,
        fullPage: true,
      });
    });
test("timeline guided paths, evidence, comparison, permalink and reset", async ({
  page,
}) => {
  await page.goto("/tools/american-epidemic-timeline/");
  for (const path of ["water", "military", "vaccination"]) {
    await page.locator(`[data-path=${path}]`).click();
    await expect(page).toHaveURL(new RegExp(`path=${path}`));
    expect(
      await page.locator("#timelineList .timeline-event").count(),
    ).toBeGreaterThan(0);
  }
  await page.locator("#searchInput").fill("zzzz-not-present");
  await expect(page.locator("#timelineList .timeline-event")).toHaveCount(0);
  await page.locator("#clearFilters").click();
  await expect(page.locator("#timelineList .timeline-event")).toHaveCount(45);
  await page.locator("#timelineList [data-open-event]").first().click();
  await expect(page.locator("#detailDrawer")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(page).toHaveURL(/event=/);
  expect(
    await page.locator('#drawerBody a[href^="https"]').count(),
  ).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator("#detailDrawer")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#detailDrawer")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await page.locator("[data-mode=compare]").click();
  await page.locator("#compareA").selectOption({ index: 1 });
  await page.locator("#compareB").selectOption({ index: 3 });
  await expect(page.locator("#compareGrid")).toContainText("Denominator");
  await expect(page).toHaveURL(/compareB=/);
  await page.reload();
  await expect(page.locator("#compareView")).toBeVisible();
  await page.locator("[data-mode=table]").click();
  expect(await page.locator("#tableWrap tbody tr").count()).toBeGreaterThan(0);
});
test("pathogen stable profile, filters, evidence diagram and reset", async ({
  page,
}) => {
  await page.goto("/atlases/pathogen/");
  await expect(page.locator("#pause-btn")).toHaveText("Start rotation");
  const initial = await page.locator("#story-title").innerText();
  await page.waitForTimeout(700);
  await expect(page.locator("#story-title")).toHaveText(initial);
  await page.locator("#pathogen-select").selectOption({ index: 3 });
  const selected = await page.locator("#story-title").innerText();
  expect(selected).not.toBe(initial);
  await page.reload();
  await expect(page.locator("#story-title")).toHaveText(selected);
  await page.locator("#host-chain button").first().click();
  await page.locator(".chain-source").click();
  await expect(page.locator("#evidence-panel")).toHaveAttribute("open", "");
  expect(
    await page.locator('#evidence-panel a[href^="https"]').count(),
  ).toBeGreaterThan(0);
  await page.locator("#pathogen-search").fill("zzzz-not-present");
  await expect(page.locator("#filter-count")).toContainText("0");
  await page.locator("#reset-btn").click();
  await expect(page.locator("#pathogen-search")).toHaveValue("");
  await expect(page.locator("#story-title")).toHaveText(initial);
});
test("maritime optional 3D, separation, sources, permalink and reset", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/atlases/maritime/");
  expect(requests.filter((u) => u.includes("/three/"))).toEqual([]);
  await page.locator("#ship-reveal>summary").click();
  await page.locator("[data-space=water]").click();
  await expect(page.locator("#ship-detail-title")).toHaveText("Water storage");
  await page.locator("#ship-cases summary").first().click();
  expect(
    await page.locator('#ship-cases a[href^="https"]').count(),
  ).toBeGreaterThan(0);
  await page.locator("#ship-3d-toggle").click();
  await expect(page.locator("#ship-3d-stage canvas")).toBeVisible();
  await expect(page.locator("#ship-svg")).toBeHidden();
  await page.locator("[data-explode]").click();
  await expect(page.locator("[data-separation]")).toHaveValue("100");
  await page.locator("[data-space=provisions]").click();
  await expect(page.locator("#ship-mechanism")).toContainText("vitamin C");
  await page.locator("#ship-reset").click();
  await expect(page.locator("[data-separation]")).toHaveValue("0");
  await expect(page.locator("[data-space=berths]")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator("#ship-3d-toggle").click();
  await expect(page.locator("#ship-svg")).toBeVisible();
  await expect(page.locator("#ship-3d-stage")).toBeHidden();
  await page.locator("#module-condition-filter").selectOption({ index: 1 });
  await expect(page).toHaveURL(/module-condition-filter=/);
  await page.locator("#reset-btn").click();
  await expect(page.locator("#module-condition-filter")).toHaveValue("");
  await page.locator("#ship-3d-stage canvas").evaluate((canvas) => {
    canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
  });
  await expect(page.locator("#ship-svg")).toBeVisible();
  await expect(page.locator("#ship-3d-toggle")).toBeDisabled();
  await page.locator("[data-space=water]").click();
  await expect(page.locator("#ship-detail-title")).toHaveText("Water storage");
});
test("ship survives unavailable WebGL and all external services", async ({
  page,
}) => {
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl")
        ? null
        : original.call(this, type, ...args);
    };
  });
  await page.goto("/atlases/maritime/");
  await page.locator("#ship-reveal>summary").click();
  await page.locator("#ship-3d-toggle").click();
  await expect(page.locator("#ship-status")).toContainText(
    "illustrated cutaway",
  );
  await expect(page.locator("#ship-svg")).toBeVisible();
  await page.locator("[data-space=ventilation]").click();
  await expect(page.locator("#ship-mechanism")).toContainText("Air exchange");
  expect(
    await page.locator(".leaflet-overlay-pane path").count(),
  ).toBeGreaterThan(0);
});
for (const kind of ["viking", "revolutionary-war"])
  test(`${kind} cited records, filters, share and reset`, async ({ page }) => {
    await page.route("**/*", (r) =>
      new URL(r.request().url()).hostname === "127.0.0.1"
        ? r.continue()
        : r.abort(),
    );
    await page.goto(`/atlases/${kind}/`);
    await page.locator("#record-list button").nth(2).click();
    const title = await page.locator("#selected-title").innerText();
    await expect(page.locator("#selected-content")).toContainText(
      "Limits of interpretation",
    );
    expect(await page.locator("#selected-content a").count()).toBeGreaterThan(
      0,
    );
    await page.reload();
    await expect(page.locator("#selected-title")).toHaveText(title);
    await page.locator("#record-search").fill("zzzz-not-present");
    await expect(page.locator("#record-count")).toContainText("0 of");
    await page.locator("#record-reset").click();
    await expect(page.locator("#record-list button")).toHaveCount(6);
    if (kind === "viking") {
      await page.locator("#compare-sites").click();
      await expect(page.locator("#comparison")).toBeVisible();
      await expect(page.locator("#comparison")).toContainText("Ribe");
      await expect(page.locator("#comparison")).toContainText("Varnhem");
      await page.reload();
      await expect(page.locator("#comparison")).toBeVisible();
    } else {
      await expect(page.locator("#selected-content")).toContainText(
        "Disease deaths",
      );
      await expect(page.locator("#selected-content")).toContainText("Unknown");
      await page.locator("[data-chapter]").first().click();
      await expect(page).toHaveURL(/period=/);
    }
  });
test("Histsearch curated dossiers and valid downloads", async ({
  page,
  request,
}) => {
  await page.goto("/tools/histsearch/");
  await page.locator("#dossier-filter").selectOption("revolutionary-smallpox");
  await expect(page.locator("[data-dossier]:visible")).toHaveCount(1);
  await page.reload();
  await expect(page.locator("#dossier-filter")).toHaveValue(
    "revolutionary-smallpox",
  );
  await page.locator(".search-log:visible summary").click();
  await expect(page.locator(".search-log:visible")).toContainText(
    "Targeted web discovery",
  );
  await page.locator("#dossier-reset").click();
  await page.locator("#review-filter").selectOption("metadata");
  await expect(page.locator(".dossier-source:visible")).toHaveCount(2);
  await page.locator("#dossier-search").fill("zzzz-not-present");
  await expect(page.locator("#dossier-count")).toHaveText(
    "0 sources in 0 dossiers",
  );
  await page.locator("#dossier-reset").click();
  await expect(page.locator("[data-dossier]:visible")).toHaveCount(3);
  for (const slug of [
    "maritime-quarantine",
    "revolutionary-smallpox",
    "viking-paleodemography",
  ]) {
    const response = await request.get(
      `/tools/histsearch/downloads/${slug}.json`,
    );
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.sources.length).toBeGreaterThan(0);
    expect(data.search_date).toBe("2026-09-08");
  }
});
test("ordinary pages never request 3D; service inquiry fields and prices agree", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/opportunities/");
  await expect(page.locator(".service-package-card")).toHaveCount(5);
  await expect(page.locator(".package-price")).toHaveText([
    "$650–$1,500",
    "$500–$1,500",
    "$400–$1,500",
    "$500–$1,500",
    "$1,000–$3,000",
  ]);
  for (const href of await page
    .locator('.service-package-card a[href^="mailto:"]')
    .evaluateAll((nodes) => nodes.map((n) => n.href))) {
    expect(decodeURIComponent(href).replaceAll("+", " ")).toContain(
      "Deadline:",
    );
    expect(decodeURIComponent(href).replaceAll("+", " ")).toContain(
      "Budget range:",
    );
  }
  expect(
    requests.filter((u) => u.includes("/three/") || u.includes("ship3d")),
  ).toEqual([]);
});

test("every pathogen has a named profile and source-bearing evidence", async ({
  page,
}) => {
  await page.goto("/atlases/pathogen/");
  const values = await page
    .locator("#pathogen-select option")
    .evaluateAll((nodes) => nodes.map((n) => n.value));
  expect(values.length).toBe(16);
  for (const value of values) {
    await page.locator("#pathogen-select").selectOption(value);
    await expect(page.locator("#story-title")).not.toBeEmpty();
    expect(
      await page.locator('#evidence-panel a[href^="https"]').count(),
    ).toBeGreaterThan(0);
    expect(await page.locator("#chain-note").innerText()).not.toContain(
      "[object Object]",
    );
  }
});

test("shareable ship and case views reopen without loading 3D", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/atlases/maritime/?space=water");
  await expect(page.locator("#ship-reveal")).toHaveAttribute("open", "");
  await expect(page.locator("#ship-detail-title")).toHaveText("Water storage");
  expect(requests.filter((u) => u.includes("/three/"))).toEqual([]);
  await page.locator("[data-case-detail]").first().locator("summary").click();
  const selected = await page
    .locator("[data-case-detail][open]")
    .first()
    .getAttribute("data-case-detail");
  await page.reload();
  await expect(
    page.locator(`[data-case-detail="${selected}"]`),
  ).toHaveAttribute("open", "");
});

test("normal motion preference does not start exhibit playback", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/tools/american-epidemic-timeline/");
  await expect(page.locator("body")).toHaveClass(/no-motion/);
  await expect(page.locator("#motionToggle")).not.toBeChecked();
  await page.goto("/atlases/pathogen/");
  await expect(page.locator("#pause-btn")).toHaveText("Start rotation");
  await page.goto("/atlases/maritime/");
  await expect(page.locator("html")).not.toHaveClass(/scenario-playing/);
  await page.goto("/atlases/revolutionary-war/");
  await page.locator("#sequence-play").click();
  await expect(page.locator("#sequence-play")).toHaveText("Pause sequence");
  await page.locator("#record-reset").click();
  await expect(page.locator("#sequence-play")).toHaveText("Play sequence");
});

test("timeline modal traps keyboard focus and returns it to the opener", async ({
  page,
}) => {
  await page.goto("/tools/american-epidemic-timeline/");
  const open = page.locator("#timelineList [data-open-event]").first();
  await open.click();
  await expect(page.locator("#closeDrawer")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await page.evaluate(() =>
      Boolean(document.activeElement.closest("#detailDrawer")),
    ),
  ).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.locator("#closeDrawer")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();
});

test("presentation links remain functional", async ({ page }) => {
  await page.goto("/atlases/revolutionary-war/?recording=1");
  await expect(page.locator("body")).toHaveClass(/presentation-mode/);
  await page.locator("#sequence-next").click();
  await expect(page).toHaveURL(/event=siege-quebec/);
  await page.keyboard.press("Escape");
  await expect(page.locator("body")).not.toHaveClass(/presentation-mode/);
  await page.goto("/atlases/maritime/?video=1");
  await expect(page.locator("html")).toHaveClass(/recording-mode/);
  await page.evaluate(() => window.MARITIME_ATLAS_CONTROLS.resetAtlas());
  await expect(page.locator("#brand h1")).toBeVisible();
});
