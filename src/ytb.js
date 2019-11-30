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
  await fileChooser.accept(["C:\\tmp\\12.mp4"]);
  await sleep(5000);
  const desc = "HelloWorld";
  const txts = await page.$$("#textbox");
  for (let i = 0; i < txts.length; i++) {
    const elementHandle = txts[i];
    await elementHandle.click();
    await elementHandle.focus();
    // click three times to select all
    await elementHandle.click({ clickCount: 3 });
    await elementHandle.press("Backspace");
    await elementHandle.type("HelloWorld");

    // await txts[i].type("HelloWorld");
  }
  await page.click("[name='NOT_MADE_FOR_KIDS']");
  await page.click(".advanced-button.style-scope.ytcp-uploads-details");
  // const tagsTextInput = await page.$("#text-input");
  // await tagsTextInput.type("XXXXXXXXXXX");
  // await page.type("#text-input", "xxxx");
  // await page.type(".text-input.style-scope.ytcp-chip-bar", "hello");
  // await tagsTextInput.press("Enter");

  await page.click("#next-button");
  await page.click("#next-button");
  await page.click(
    ".button-area.remove-default-style.style-scope.ytcp-expansion-panel"
  );
  // await sleep(2000);
  await page.click("[name='PUBLIC']");
  await sleep(10000);
  // await page.click("#done-button");

  let donBtnClickOk = false;
  let uploadOk = false;
  const uplaodComplete = async () => {
    if (donBtnClickOk && uploadOk) {
      console.log("上传完成");
      // await page.close();
    }
  };

  const doneBtnSID = setInterval(async function() {
    const doneBtn = await page.$('[id="done-button"][disabled]');
    if (doneBtn) {
      clearInterval(doneBtnSID);
      console.log("已经点击完成按钮");
      donBtnClickOk = true;
      uplaodComplete();
    } else {
      console.log("点击完成按钮");
      await page.click("#done-button");
    }
  }, 10000);

  const sId = setInterval(async function() {
    console.log("检测是否上传完成");
    const fallback = await page.$(`[alt='视频缩略图：${desc}']`);
    if (fallback) {
      clearInterval(sId);
      console.log("upload 上传完成");
      uploadOk = true;
      uplaodComplete();
    }
  }, 20000);

  // await page.waitForNavigation({ waitUntil: "networkidle0" });
})();
