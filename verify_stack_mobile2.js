const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/cleaning', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const heading = await page.getByText("Here's what changes").first();
  await heading.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -80));
  await page.waitForTimeout(800);

  for (let i = 0; i < 12; i++) {
    await page.screenshot({ path: `verify_stack_mobile2_${String(i).padStart(2,'0')}.png` });
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(400);
  }

  await page.close();
  await browser.close();
})();
