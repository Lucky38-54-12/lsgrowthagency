const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 1000]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const trust = await page.locator('section').filter({ hasText: 'Trusted by cleaning businesses' }).first();
    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await trust.screenshot({ path: `verify_logos_trust_${name}.png` });

    const badgeRow = await page.locator('img[alt="Queenstown Cleaning"]').nth(1).locator('..').locator('..');
    await badgeRow.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await badgeRow.screenshot({ path: `verify_logos_badges_${name}.png` });

    await page.close();
  }

  await browser.close();
})();
