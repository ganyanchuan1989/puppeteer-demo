const puppeteer = require("puppeteer");

puppeteer
  .launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false
    // devtools: true
  })
  .then(async browser => {
    const page = await browser.newPage();
    await page.goto("https://example.com");
    await page.screenshot({ path: "screenshot.png" });
    await browser.close();
  });
