// https://www.iesdouyin.com/share/video/6754544689606577422/?region=CN&mid=6754538211722267396&u_code=0&titleType=title

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.iesdouyin.com/share/video/6754544689606577422/?region=CN&mid=6754538211722267396&u_code=0&titleType=title"
  );

  // page.on("response", async res => {
  //   const aurls = await page.$$eval(".item", items => {
  //     const urls = items.map(item => {
  //       return item.firstElementChild.href;
  //     });
  //     return urls;
  //   });
  //   aurls.forEach(async url => {
  //     // const subPage = await browser.newPage();
  //     // await subPage.goto("http://www.baidu.com");
  //     childPage(url);
  //   });
  // });

  const content = await page.content();
  console.log(content);
})();
