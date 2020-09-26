const request = require("supertest");
const { app, client } = require("../src/app");

afterAll(() => {
  client.quit();
});

describe("POST /", () => {
  it("Should get 200 code on first request", (done) => {
    request(app)
      .post("/")
      .send([
        { id: "test-id", name: "test-name" },
        { id: "test-id", name: "test-name" },
      ])
      .set("Accept", "application/json")
      .expect(200)
      .end(done);
  });

  it("Should get 403 code on same request after", (done) => {
    request(app)
      .post("/")
      .send([
        { id: "test-id", name: "test-name" },
        { id: "test-id", name: "test-name" },
      ])
      .set("Accept", "application/json")
      .expect(403)
      .end(done);
  });

  it("Should get 200 code again after time passed", (done) => {
    setTimeout(() => {
      request(app)
        .post("/")
        .send([
          { id: "test-id", name: "test-name" },
          { id: "test-id", name: "test-name" },
        ])
        .set("Accept", "application/json")
        .expect(200)
        .end(done);
    }, 3000);
  });
});
