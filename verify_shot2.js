const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.13));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'verify_cleaning-badge.png' });

  const page2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page2.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);
  await page2.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.13));
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: 'verify_cleaning-badge-mobile.png' });

  await browser.close();
})();
