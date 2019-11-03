const puppeteer = require("puppeteer");
const dl = require("./dl");

(async () => {
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   dumpio: true,
  //   executablePath:
  //     "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
  // });

  // const page = await browser.newPage();
  // page.goto("http://www.baidu.com");
  const url =
    "http://v9-dy-z.ixigua.com/694c1c27dbfb1c9ec07e041f2c057880/5dbbdd9f/video/m/220814b7438e3b941cfbd3e950f748f0646116407db8000006a81e84da1f/?a=1128&br=437&cr=0&cs=0&dr=0&ds=3&er=&l=20191101142400010016050082161CF0&lr=aweme&qs=0&rc=M3I3OzdpZmpkcDMzOmkzM0ApZzwzMzRkODtmNzs3N2dmOmdsNjVkMGQuX3FfLS0xLS9zc14vXjE2Li02YTFiLWMyYjY6Yw%3D%3D";
  await dl(url);
  console.log("download complete");
})();
