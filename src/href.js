const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    devtools: true
  });

  const childPage = async url => {
    const subPage = await browser.newPage();
    await subPage.goto(url);
    const child = subPage.$$(".child");
    subPage.$eval(".child", child => {
      child.firstElementChild.click();
    });
  };

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/www/href/index.html");
  page.on("response", async res => {
    const aurls = await page.$$eval(".item", items => {
      const urls = items.map(item => {
        return item.firstElementChild.href;
      });
      return urls;
    });
    aurls.forEach(async url => {
      // const subPage = await browser.newPage();
      // await subPage.goto("http://www.baidu.com");
      childPage(url);
    });
  });
})();
