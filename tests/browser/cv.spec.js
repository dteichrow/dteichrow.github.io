import { test, expect } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`${width}px About portrait and CV reading path work without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce', viewport: { width, height: 1000 }, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/about/');
    const portrait = page.getByRole('img', { name: 'Devin Teichrow', exact: true });
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveJSProperty('naturalWidth', 292);
    await page.screenshot({ path: `output/playwright/cv/about-${width}.png`, fullPage: true });
    await page.getByRole('link', { name: 'Read my CV', exact: true }).click({ noWaitAfter: true });
    await expect(page).toHaveURL(/\/about\/cv\//);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Devin Teichrow, MSc');
    await expect(page.locator('#experience article')).toHaveCount(6);
    await page.getByRole('navigation', { name: 'CV sections' }).getByRole('link', { name: 'Publications', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#publications$/);
    await expect(page.getByRole('heading', { name: 'Selected publications and research outputs' })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download CV (PDF)', exact: true }).focus();
    await page.keyboard.press('Enter');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('Devin-Teichrow-CV.pdf');
    expect(await download.failure()).toBeNull();
    const response = await context.request.get('/assets/cv/devin-teichrow-cv.pdf');
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
    await page.screenshot({ path: `output/playwright/cv/cv-${width}.png`, fullPage: true });
    await context.close();
  });
}

test('site search includes a single public CV record', async ({ request }) => {
  const response = await request.get('/app_exports/search-index.json');
  const records = await response.json();
  expect(records.filter(r => r.url === '/about/cv/')).toHaveLength(1);
});
