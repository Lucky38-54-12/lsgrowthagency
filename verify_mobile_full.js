const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const viewport = 844;
  const steps = Math.ceil(height / viewport);

  for (let i = 0; i < steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * viewport);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `verify_mobile_full_${String(i).padStart(2, '0')}.png` });
  }

  await page.close();
  await browser.close();
})();
