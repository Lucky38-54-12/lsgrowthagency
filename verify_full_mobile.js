const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(height / 700);
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 700);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `verify_full_${String(i).padStart(2,'0')}.png` });
  }

  await page.close();
  await browser.close();
})();
