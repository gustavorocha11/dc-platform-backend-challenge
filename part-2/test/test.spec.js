const lineReader = require("line-reader");
const axios = require("axios");

const codes = [];
describe("Validate status code of images on filtered dump", () => {
  it("Should get 200 code on all images", () => {
    lineReader.eachLine("filtered-dump", async (line, last) => {
      const obj = JSON.parse(line);
      try {
        await Promise.all(
          obj.image.map(async (imageURL) => {
            try {
              await axios.get(imageURL);
              codes.push(200);
            } catch {
              codes.push(404);
            }
          })
        );
      } catch {
        codes.push(404);
      }
      if (last) {
        expect(codes).not.toContain(404);
      }
    });
  });
});
