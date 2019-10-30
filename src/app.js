const puppeteer = require("puppeteer");

const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone 6"];
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  const _browser = browser;
  await page.goto("http://127.0.0.1:5500/pp/index.html");
  page.on("response", async function(response) {
    // const items = await page.$$(".item");
    // const itemA = await items[0].$("a");
    // console.log(itemA);
    // itemA.click();
    // const handle = await page.evaluateHandle(() => ({ window, document }));
    // const properties = await handle.getProperties();
    // const windowHandle = properties.get("window");
    // const documentHandle = properties.get("document");
    // console.log(windowHandle);
    // await handle.dispose();
  });

  // await page.click("#username");
  // page.keyboard.sendCharacter("ganxz");
  // await page.click("#password");
  // page.keyboard.sendCharacter("111");
  // waitForResponse = new Promise(getResponseBody);
  // await page.click("#btnSubmit");
})();
