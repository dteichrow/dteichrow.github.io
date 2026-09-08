import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
await fs.mkdir("output/playwright/preview", { recursive: true });
for (const route of [
  "",
  "opportunities/",
  "tools/american-epidemic-timeline/",
  "atlases/pathogen/",
  "atlases/maritime/",
  "atlases/viking/",
  "atlases/revolutionary-war/",
  "tools/histsearch/",
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().includes("127.0.0.1"))
      errors.push(r.status() + " " + r.url());
  });
  await page.goto("http://127.0.0.1:8765/" + route, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(300);
  console.log(
    JSON.stringify({
      route,
      errors,
      ...(await page.evaluate(() => ({
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        title: document.title,
        h1: document.querySelector("h1")?.textContent,
      }))),
    }),
  );
  await page.screenshot({
    path:
      "output/playwright/preview/" +
      (route.replaceAll("/", "-") || "home") +
      ".png",
    fullPage: false,
  });
  await page.close();
}
await browser.close();
