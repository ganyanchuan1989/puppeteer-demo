const puppeteer = require("puppeteer");

(async () => {
  // const browser = await puppeteer.launch({
  //   executablePath:
  //     "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  //   headless: false,
  //   devtools: true
  // });

  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  page.on("dialog", async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
    // await browser.close();
  });
  page.evaluate(() => alert("1"));
})();
