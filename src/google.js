const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      // "--disable-extensions-except=/path/to/my/extension",
      // "--load-extension=/path/to/my/extension",
      "--user-data-dir=C:\\Users\\yueyt\\AppData\\Local\\Chromium\\User Data\\Profile 3"
      //'--profile-directory=Profile 1'
    ]
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1800, height: 1000 });
  await page.goto("http://www.google.com");
  await page.waitFor(5000);
  // await browser.close();
})();
