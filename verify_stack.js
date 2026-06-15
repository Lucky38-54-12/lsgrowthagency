const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const heading = await page.getByText('Sound familiar?').first();
  await heading.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -100));
  await page.waitForTimeout(500);

  for (let i = 0; i < 8; i++) {
    await page.screenshot({ path: `verify_stack_desktop_${String(i).padStart(2,'0')}.png` });
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(300);
  }

  await page.close();
  await browser.close();
})();
