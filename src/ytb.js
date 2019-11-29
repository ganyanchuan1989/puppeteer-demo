// youtube upload
const puppeteer = require("puppeteer");
const sleep = require("./sleep");
(async () => {
  const browser = await puppeteer.launch({
    args: [
      // "--disable-setuid-sandbox",
      // "--no-sandbox",
      // '--profile-directory="Profile 3"'
      "--user-data-dir=C:\\Users\\yueyt\\AppData\\Local\\Chromium\\User Data\\Profile 3"
      // '--proxy-server=10.24.51.125:8411',
      // '--ignore-certificate-errors',
      // '--window-size=375,812',
      // '--remote-debugging-port=9222'
    ],
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1300, height: 700 });
  await page.goto(
    "https://studio.youtube.com/channel/UCd7wt76fJPmSmhLcnhMHbiA/videos?d=ud"
  );
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#select-files-button") // some button that triggers file selection
  ]);
  await fileChooser.accept(["C:\\tmp\\22.mp4"]);
  await sleep(5000);
  const txts = await page.$$("#textbox");
  for (let i = 0; i < txts.length; i++) {
    await txts[i].type("HelloWorld");
  }
  await page.click("[name='NOT_MADE_FOR_KIDS']");
  await page.click(".advanced-button.style-scope.ytcp-uploads-details");
  // const tagsTextInput = await page.$("#text-input");
  // await tagsTextInput.type("XXXXXXXXXXX");
  // await page.type("#text-input", "xxxx");
  await page.type(".text-input.style-scope.ytcp-chip-bar", "hello");
  // await tagsTextInput.press("Enter");

  // await page.click("#next-button");
  // await page.click("#next-button");
  // await sleep(2000);
  // await page.click("[name='PUBLIC']");
})();
