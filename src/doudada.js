const puppeteer = require("puppeteer");
const dl = require("./dl");
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false
    // devtools: true
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1800, height: 1000 });
  await page.goto("https://www.doudada.com/");
  await page.click(".login-btn");
  await page.screenshot({ path: "c:/tmp/ddd.png" });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  await page.goto("https://www.doudada.com/hot/video");

  const childPage = async url => {
    const subPage = await browser.newPage();
    await subPage.goto(url);
    const content = await subPage.content();
    const idex = content.indexOf(',url:"');
    if (idex > 0) {
      let url = content.substring(
        idex + 6,
        content.indexOf(",collectionTime:") - 1
      );

      url = url.replace(/u002f/gi, "");
      // console.log(url);
      const dyPage = await browser.newPage();
      await dyPage.goto(url);
      const dyContent = await dyPage.content();
      const dyIdex = dyContent.indexOf("playAddr:");
      // console.log(dyIdex);
      if (dyIdex > -1) {
        const tempStr = dyContent.substr(dyIdex + 11);
        // console.log("tempStr:", tempStr);
        const dyVUrl = tempStr.substr(0, tempStr.indexOf('"'));
        // console.log("dyVUrl:", dyVUrl);
        dl(dyVUrl);
        try {
          // dyPage.close();
          // subPage.close();
        } catch (error) {}
      }
    }
  };

  const aurls = await page.$$eval(".video-box", items => {
    const urls = items.map(item => {
      return item.firstElementChild.href;
    });
    return urls;
  });

  aurls.forEach(async url => {
    childPage(url);
  });
  // childPage(aurls[0]);
})();
