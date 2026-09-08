import { defineConfig } from "@playwright/test";
import fs from "node:fs";
const localChrome =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 90000,
  expect: { timeout: 10000 },
  workers: 2,
  fullyParallel: true,
  reporter: [
    ["list"],
    ["json", { outputFile: "output/playwright/results.json" }],
    ["html", { open: "never" }],
  ],
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:8765",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath:
        process.env.CHROME_PATH ||
        (fs.existsSync(localChrome) ? localChrome : undefined),
    },
  },
  webServer: {
    command: process.env.CI
      ? "python -m http.server 8765 --bind 127.0.0.1 --directory docs"
      : ".venv/bin/python -m http.server 8765 --bind 127.0.0.1 --directory docs",
    url: "http://127.0.0.1:8765",
    reuseExistingServer: !process.env.CI,
  },
});
