const puppeteer = require("puppeteer");
const dl = require("./dl");
(async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--profile-directory=Profile 3"
      // '--proxy-server=10.24.51.125:8411',
      // '--ignore-certificate-errors',
      // '--window-size=375,812',
      // '--remote-debugging-port=9222'
    ],
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

  const sleep = async time => {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  };

  const downloadByPage = async url => {
    await page.goto(url);

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
        const descStr = await dyPage.$eval(".desc", descP => {
          return descP.innerHTML;
        });
        // console.log("descStr", descStr);
        const dyContent = await dyPage.content();
        const dyIdex = dyContent.indexOf("playAddr:");

        // console.log(dyIdex);
        if (dyIdex > -1) {
          const tempStr = dyContent.substr(dyIdex + 11);
          // console.log("tempStr:", tempStr);
          const dyVUrl = tempStr.substr(0, tempStr.indexOf('"'));
          // console.log("dyVUrl:", dyVUrl);
          await dl(dyVUrl, descStr);
          try {
            dyPage.close();
            subPage.close();
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
      await childPage(url);
      await sleep(5000);
    });
  };

  for (let i = 1; i <= 2; i++) {
    await downloadByPage(
      "https://www.doudada.com/hot/video?keyword=&page=" +
        i +
        "&interval=1&existGoods=false&sort=0"
    );

    await sleep(5000);
  }
})();
