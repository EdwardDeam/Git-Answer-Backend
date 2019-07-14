const app = require("../../express");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Tag Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    await mongoose.connection.db.dropDatabase();

    server = app.listen(3001);
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /tags", () => {
    it("can seed tag list", async () => {
      await request(server)
        .get("/tags/seed")
        .expect(200);
    });
  });
  it("can get a list of tags", async () => {
    await request(server)
      .get("/tags")
      .expect(200)
      .expect(res => {
        res.body.length = 8;
      });
  });
});
