const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 1000]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const heading = await page.getByText('Most cleaning ads get you enquiries').first();
    await heading.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.4));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `verify_why2_${name}.png` });

    await page.close();
  }

  await browser.close();
})();
