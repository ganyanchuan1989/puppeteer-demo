const Fs = require("fs");
const Path = require("path");
// const Listr = require("listr");
const Axios = require("axios");
const moment = require("moment");
const saveFile = require("save-file");

module.exports = async function(url, descStr) {
  const dir = "c:/tmp/" + moment().format("YYYYMMDD") + "/";
  try {
    Fs.mkdirSync(dir);
  } catch (error) {}
  const timeStamp = dir + new Date().getTime();
  const savePath = timeStamp + ".mp4";

  Fs.writeFile(timeStamp + ".txt", descStr, "utf8", err => {
    if (err) throw err;
    console.log("success done");
  });

  // const path = Path.resolve("c:/tmp/", "video.mp4");
  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream"
  });
  response.data.pipe(Fs.createWriteStream(savePath));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });
    response.data.on("error", err => {
      reject(err);
    });
  });
};
