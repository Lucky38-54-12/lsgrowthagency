const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 1000]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // trust strip
    const trust = await page.getByText('Trusted by cleaning businesses').first();
    await trust.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `verify_qtown_trust_${name}.png` });

    // testimonial badges
    const badge = await page.locator('img[alt="Queenstown Cleaning"]').nth(1);
    await badge.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -200));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `verify_qtown_badges_${name}.png` });

    await page.close();
  }

  await browser.close();
})();
