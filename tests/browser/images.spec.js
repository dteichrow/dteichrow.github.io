import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 768, 1440]) {
  test(`${width}px archival covers and image credits`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/tools/");
    const covers = page.locator(".exhibit-image img");
    await expect(covers).toHaveCount(6);
    await covers.evaluateAll(async (images) => {
      images.forEach((image) => (image.loading = "eager"));
      await Promise.all(images.map((image) => image.decode()));
    });
    for (const cover of await covers.all()) {
      await expect(cover).toHaveAttribute("alt", /\S/);
      expect(await cover.evaluate((image) => image.currentSrc)).toMatch(
        /-(640|700|1204|1280)\.webp$/,
      );
      expect(
        await cover.evaluate((image) => image.naturalWidth),
      ).toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `output/playwright/imagery/${width}-exhibits.png`,
      fullPage: true,
    });
    await page
      .getByRole("link", {
        name: "Image credit: Examination of Viking jaw and teeth",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(/image-credits\/#viking-health-atlas/);
    await expect(page.locator("#viking-health-atlas")).toContainText(
      "Carolina Bertilsson",
    );
    await expect(page.locator("#viking-health-atlas")).toContainText(
      "CC BY 4.0",
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.goto("/image-credits/");
    await page
      .locator(".image-credit-record img")
      .evaluateAll(async (images) => {
        images.forEach((image) => (image.loading = "eager"));
        await Promise.all(images.map((image) => image.decode()));
      });
    await page.screenshot({
      path: `output/playwright/imagery/${width}-credits.png`,
      fullPage: true,
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("archival covers remain available when collection servers cannot be reached", async ({
  page,
}) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1"
      ? route.continue()
      : route.abort(),
  );
  await page.goto("/tools/");
  const loaded = await page
    .locator(".exhibit-image img")
    .evaluateAll(async (images) => {
      images.forEach((image) => (image.loading = "eager"));
      await Promise.all(images.map((image) => image.decode()));
      return images.every((image) => image.complete && image.naturalWidth > 0);
    });
  expect(loaded).toBe(true);
});
