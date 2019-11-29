// youtube upload
const puppeteer = require("puppeteer");
const sleep = require("./sleep");

(async () => {
  const browser = await puppeteer.launch({
    args: [
      "--user-data-dir=C:\\Users\\yueyt\\AppData\\Local\\Chromium\\User Data\\Profile 3"
    ],
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 700 });
  await page.goto("http://127.0.0.1:5500/www/index.html");

  // click
  await page.click("#btn"); // id
  await page.click(".btn-cls"); // class

  // 列表中的某一项
  const mbtns = await page.$$(".multi-cls");
  await mbtns[0].click();

  // file
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#myfile") // some button that triggers file selection
  ]);
  await fileChooser.accept(["C:\\tmp\\1.txt"]);

  // 查找
  await page.click("#myid"); // find by id
  await page.click("[name='myname']"); // find by name [attribute='value']
  await page.click(".mycls"); // find by class

  // radio button
  await page.click("#pear");
  // await sleep(3000);
  // await page.click("#banana");

  // input
  // await page.type("#txtInput", "HelloWorld");
  // 多个ID
  const inputs = await page.$$("#txtInput");
  for (let i = 0; i < inputs.length; i++) {
    await inputs[i].type("HelloWorld");
  }

  // await page.type("#txtArea", "HelloWorld");
  const input_area = await page.$("#txtArea");
  await input_area.type("hello world");

  // parent 子节点点击
  const parent = await page.$("#parent");
  const childBtn = await parent.$("button");
  await childBtn.click();

  // screentshot
  // await page.screenshot({ path: "c:/tmp/ddd.png" });

  // wait network 等待所有请求结束
  // await page.waitForNavigation({ waitUntil: "networkidle0" });
})();
