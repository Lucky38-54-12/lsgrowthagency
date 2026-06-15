const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  const targets = [
    { name: 'cleaning-desktop', url: 'http://localhost:3000/cleaning', width: 1440, height: 1000 },
    { name: 'cleaning-mobile', url: 'http://localhost:3000/cleaning', width: 390, height: 844 },
    { name: 'home-how-desktop', url: 'http://localhost:3000/#how', width: 1440, height: 1000 },
    { name: 'home-how-mobile', url: 'http://localhost:3000/#how', width: 390, height: 844 },
  ];

  for (const t of targets) {
    const page = await browser.newPage({ viewport: { width: t.width, height: t.height } });
    await page.goto(t.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // full page screenshot
    await page.screenshot({ path: `verify_${t.name}_top.png` });

    // scroll down to the Problem/Solution or How We Work section and screenshot mid-scroll
    if (t.name.startsWith('cleaning')) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.18));
    } else {
      const el = await page.$('#how');
      if (el) await el.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: `verify_${t.name}_mid.png` });

    // scroll further to see stacking
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.6));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `verify_${t.name}_stack.png` });

    await page.close();
  }

  await browser.close();
})();
