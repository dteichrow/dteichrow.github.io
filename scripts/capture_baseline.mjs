import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.EOE_BROWSER ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const routes = [
  "",
  "opportunities/",
  "tools/",
  "tools/american-epidemic-timeline/",
  "atlases/pathogen/",
  "atlases/maritime/",
  "atlases/revolutionary-war/",
  "atlases/viking/",
  "tools/histsearch/",
];
const output = "output/playwright/baseline";
await fs.mkdir(output, { recursive: true });
const results = [];
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  for (const route of routes) {
    await page.goto("http://127.0.0.1:8766/" + route, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(250);
    results.push({
      route,
      width,
      ...(await page.evaluate(() => ({
        actualWidth: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.title,
      }))),
    });
    await page.screenshot({
      path: `${output}/${width}-${route.replaceAll("/", "-") || "home"}.png`,
      fullPage: false,
    });
  }
  await page.close();
}
await fs.writeFile(output + "/baseline.json", JSON.stringify(results, null, 2));
await browser.close();
console.log(
  `Captured ${results.length} baseline screenshots at real viewport widths.`,
);
