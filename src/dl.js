const Fs = require("fs");
const Path = require("path");
// const Listr = require("listr");
const Axios = require("axios");
const moment = require("moment");
const saveFile = require("save-file");
const cmd = require("node-cmd");

module.exports = async function(url, descStr) {
  const dir = "c:/tmp/" + moment().format("YYYYMMDD") + "/";
  try {
    Fs.mkdirSync(dir);
  } catch (error) {}
  // const timeStamp = dir + new Date().getTime();
  const savePath = dir + descStr + ".mp4";

  // Fs.writeFile(timeStamp + ".txt", descStr, "utf8", err => {
  //   if (err) throw err;
  //   console.log("success done");
  // });

  // const path = Path.resolve("c:/tmp/", "video.mp4");
  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream"
  });
  response.data.pipe(Fs.createWriteStream(savePath));
  response.data.on("end", () => {
    // cmd.get(
    //   'youtube-upload --title="' +
    //     descStr +
    //     '" --description="' +
    //     descStr +
    //     '" --category="21" --tags="抖音,Tik Tok" --default-language="cn"  --default-audio-language="cn" ' +
    //     savePath,
    //   function(err, data, stderr) {
    //     console.log("the current dir contains these files :\n\n", data);
    //   }
    // );
  });
  response.data.on("error", err => {
    // reject(err);
  });

  // return new Promise((resolve, reject) => {
  //   response.data.on("end", () => {
  //     resolve();
  //   });
  //   response.data.on("error", err => {
  //     reject(err);
  //   });
  // });
};
