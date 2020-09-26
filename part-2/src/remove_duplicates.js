const lineReader = require("line-reader");
const { exit } = require("process");
const client = require("./redisClient");

lineReader.eachLine("../challenge/small-input-dump", async (line, last) => {
  const imageExists = await client.get(line);

  if (!imageExists) {
    await client.set(line, true);
  }

  if (last) {
    exit(1);
  }
});
