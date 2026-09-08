import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [],
  requests = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("request", (r) => requests.push(r.url()));
await page.goto("http://127.0.0.1:8765/atlases/maritime/");
console.log(
  "three before open",
  requests.filter((u) => u.includes("/three/")),
);
await page.locator("#ship-reveal>summary").click();
await page.locator("[data-space=water]").click();
console.log("selected", await page.locator("#ship-detail-title").innerText());
await page.locator("#ship-3d-toggle").click();
await page.waitForTimeout(1200);
console.log("status", await page.locator("#ship-status").innerText());
console.log("canvas", await page.locator("#ship-3d-stage canvas").count());
console.log(
  "three after open",
  requests.filter((u) => u.includes("/three/")),
);
if (await page.locator("[data-explode]").count()) {
  await page.locator("[data-explode]").click();
  console.log(
    "separation",
    await page.locator("[data-separation]").inputValue(),
  );
}
await page
  .locator("#ship-lab")
  .screenshot({ path: "output/playwright/preview/ship-3d.png" });
console.log("errors", errors);
await browser.close();
