const app = require("../../express");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Post Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    await mongoose.connect(mongoDB, { useNewUrlParser: true });
    await mongoose.connection.db.dropDatabase();
    server = app.listen(3001);
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /posts", () => {
    it("can list posts", async () => {
      await request(server)
        .get("/posts")
        .expect(200);
    });
  });
  describe("POST /posts", () => {
    it("can post new posts", async () => {
      await request(server)
        .post("/posts")
        .send({
          title: "Test Posting",
          author: "507f1f77bcf86cd799439011",
          text:
            "To generate a new ObjectId using ObjectId() with a unique hexadecimal string: sal;kdfj;aslkfjl;a s;lkfdas;d ;l sad;flksa elaeir;mviiew s;lfaeij;dslkfm;lezifnz;sd vief;lkzmsdl/vkmzsd lsdkf;ei;zsdlkn;zlsefizds",
          tags: ["CSS", "Test Tag"]
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
