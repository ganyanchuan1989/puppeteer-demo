const Fs = require("fs");
const Path = require("path");
// const Listr = require("listr");
const Axios = require("axios");
const moment = require("moment");

module.exports = async function(url) {
  const dir = "c:/tmp/" + moment().format("YYYYMMDD") + "/";
  try {
    Fs.mkdirSync(dir);
  } catch (error) {}
  const savePath = dir + new Date().getTime() + ".mp4";
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
