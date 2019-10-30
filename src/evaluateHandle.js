const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/www/index.html");
  const aHandle = await page.evaluateHandle(() => document.body);
  const resultHandle = await page.evaluateHandle(
    body => body.innerHTML,
    aHandle
  );
  console.log(await resultHandle.jsonValue());
  await resultHandle.dispose();
})();
