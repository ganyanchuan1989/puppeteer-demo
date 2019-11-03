const Fs = require("fs");
const Path = require("path");
const Listr = require("listr");
const Axios = require("axios");

const tasks = new Listr([
  {
    title: "Downloading",
    task: async (ctx, task) => {
      const url =
        'http://v6-dy.ixiguavideo.com/d63580b9e4f9e8ba5c2e259885295bea/5dbbaf91/video/m/2207d2534b05afe4c679603334873d6b1bc1163fa9cd000036b4f46ce6cf/?a=1128&br=2113&cr=0&cs=0&dr=0&ds=3&er=&l=201911011107270100110190387769F8&lr=aweme&qs=0&rc=anZxNW50ZjM7cDMzNGkzM0ApNWlnZ2ZnaTtpN2U2OWQ3aGdscS0yX2g1bnFfLS0vLS9zczM2NTBgMjVfY2EzL2BiYjE6Yw%3D%3D"';
      const path = Path.resolve(__dirname, "media", "video.mp4");

      const response = await Axios({
        method: "GET",
        url: url,
        responseType: "stream"
      });

      response.data.pipe(Fs.createWriteStream(path));

      return new Promise((resolve, reject) => {
        response.data.on("end", () => {
          resolve();
        });

        response.data.on("error", err => {
          reject(err);
        });
      });
    }
  }
]);

tasks.run().catch(err => {
  console.error(err);
});
