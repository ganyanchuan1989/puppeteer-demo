// (async function() {
//   const sleep = async time => {
//     return new Promise(function(resolve) {
//       setTimeout(resolve, time);
//     });
//   };

//   await sleep(5000);
//   console.log(">>>");
// })();

for (let i = 1; i <= 5; i++) {
  console.log(
    `https://www.doudada.com/hot/video?keyword=&page=${i}&interval=1&existGoods=false&sort=0`
  );
}
