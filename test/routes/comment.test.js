const app = require("../../express");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Comment Routes", () => {
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

  describe("GET /comments", () => {
    it("can list comments", async () => {
      await request(server)
        .get("/comments")
        .expect(200);
    });
  });
  describe("POST /comments", () => {
    it("can post comments", async () => {
      await request(server)
        .post("/comments")
        .send({
          author: "507f1f77bcf86cd799439011",
          text:
            "To generate a new ObjectId using ObjectId() with a unique hexadecimal string:"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("fails if author is missing in body", async () => {
      await request(server)
        .post("/comments")
        .send({
          text:
            "To generate a new ObjectId using ObjectId() with a unique hexadecimal string:"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
    it("fails if text is missing in body", async () => {
      await request(server)
        .post("/comments")
        .send({
          author: "507f1f77bcf86cd799439011"
        })
        .set("Accept", "application/json")
        .expect(400);
    });
    it("fails if text  and author is missing in body", async () => {
      await request(server)
        .post("/comments")
        .set("Accept", "application/json")
        .expect(400);
    });
  });
});
