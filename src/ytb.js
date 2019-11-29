// youtube upload
const puppeteer = require("puppeteer");
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
    headless: false
    // devtools: true
  });

  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 700 });
  await page.goto(
    "https://studio.youtube.com/channel/UCd7wt76fJPmSmhLcnhMHbiA/videos?d=ud"
  );
  // await page.click("#select-files-button");
  // // const input = await page.$('input[type="file"]');
  // // await input.uploadFile("./content.csv");
  // page.on("filedialog", async input => {
  //   await input.uploadFile("C:\\tmp\\111.mp4");
  // });

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#select-files-button") // some button that triggers file selection
  ]);
  await fileChooser.accept(["C:\\tmp\\22.mp4"]);
  const input_area = await page.$("#textbox");
  await input_area.type("hello world");
  await page.click("#next-button");

  // await page.click(".remove-defaults");
  // await page.screenshot({ path: "c:/tmp/ddd.png" });
  // await page.waitForNavigation({ waitUntil: "networkidle0" });

  const sleep = async time => {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  };
})();
