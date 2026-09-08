import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    ((await fs.stat(chrome).catch(() => null)) ? chrome : undefined),
  args: ["--remote-debugging-port=9223"],
});
await fs.mkdir("output/lighthouse", { recursive: true });
const results = [];
try {
  for (const route of [
    "/",
    "/opportunities/",
    "/essays/",
    "/essays/project-sunshines-supply-of-human/",
  ]) {
    const result = await lighthouse(
      (process.env.TEST_BASE_URL || "http://127.0.0.1:8765") + route,
      {
        port: 9223,
        output: "html",
        logLevel: "error",
        onlyCategories: ["performance"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttlingMethod: "simulate",
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
        },
      },
    );
    const slug = route.replaceAll("/", "-") || "home";
    await fs.writeFile(`output/lighthouse/${slug}.html`, result.report);
    await fs.writeFile(
      `output/lighthouse/${slug}.json`,
      JSON.stringify(result.lhr, null, 2),
    );
    const a = result.lhr.audits;
    const row = {
      route,
      score: Math.round(result.lhr.categories.performance.score * 100),
      lcp: a["largest-contentful-paint"].numericValue,
      cls: a["cumulative-layout-shift"].numericValue,
      fcp: a["first-contentful-paint"].numericValue,
    };
    results.push(row);
    console.log(JSON.stringify(row));
  }
  await fs.writeFile(
    "output/lighthouse/summary.json",
    JSON.stringify(
      {
        configuration: {
          width: 390,
          height: 844,
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          method: "simulate",
        },
        results,
      },
      null,
      2,
    ),
  );
  if (results.some((r) => r.score < 90 || r.lcp > 2500 || r.cls > 0.1))
    process.exitCode = 1;
} finally {
  await browser.close();
}
