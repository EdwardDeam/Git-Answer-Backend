const app = require("../../express");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Post Users", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;
  let testUserID;
  const testUser = {
    username: "testsdfjkl",
    email: "tfjklt@hotmail.com",
    password: "passwurd0"
  };

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    // Make sure we have a clear database
    await mongoose.connection.db.dropDatabase();
    server = app.listen(3001);
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("POST /users", () => {
    it("can create a new user", async () => {
      await request(server)
        .post("/users")
        .send(testUser)
        .set("Accept", "application/json")
        .expect(200)
        .then(response => {
          // Save the post _ID for use in other tests
          testUserID = response.body._id;
        });
    });
    it("fails if body is empty", async () => {
      await request(server)
        .post("/users")
        .send({})
        .set("Accept", "application/json")
        .expect(400);
    });
  });
});
