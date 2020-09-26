const fs = require("fs");
const { exit } = require("process");
const client = require("./redisClient");

let writeStream = fs.createWriteStream("filtered-dump");

client
  .keys("pid*")
  .then((pidList) => {
    pidList.forEach((pid, index) => {
      client.get(pid).then((imageArray) => {
        const obj = { productId: pid, image: imageArray.split(",") };
        const data = JSON.stringify(obj);

        writeStream.write(data + "\n", (err) => {
          if (err) {
            throw err;
          }
          if (index === pidList.length - 1) {
            exit(1);
          }
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("exit", async function () {
  await client.quit();
});
