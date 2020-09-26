const axios = require("axios");
const client = require("./redisClient");
const { exit } = require("process");

const pidCount = {};
client
  .keys('{"productId":"pid*')
  .then(async (productList) => {
    await Promise.all(
      productList.map(async (product) => {
        const obj = JSON.parse(product);
        if (!pidCount[obj.productId] || pidCount[obj.productId] < 3) {
          try {
            await axios.get(obj.image);

            if (!pidCount[obj.productId]) {
              await client.set(obj.productId, obj.image);
              pidCount[obj.productId] = 1;
            } else {
              await client.append(obj.productId, `,${obj.image}`);
              pidCount[obj.productId]++;
            }
          } catch {}
        }
      })
    );
    exit(1);
  })
  .catch((err) => {
    console.log(err);
  });
