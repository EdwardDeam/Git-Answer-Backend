const app = require("../../express");
const request = require("supertest");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Post Routes", () => {
  it("has a module", () => {
    expect(app).not.to.be.undefined;
  });

  let server;
  let testPostID;
  const testPost = {
    title: "Testing Post",
    author: "507f1f77bcf86cd799439011",
    text:
      "To generate a new ObjectId using ObjectId() with a unique hexadecimal string: sal;kdfj;aslkfjl;a s;lkfdas;d ;l sad;flksa elaeir;mviiew s;lfaeij;dslkfm;lezifnz;sd vief;lkzmsdl/vkmzsd lsdkf;ei;zsdlkn;zlsefizds",
    tags: ["CSS", "Test Tag"]
  };
  const testPostNoTags = {
    title: "Testing Post",
    author: "507f1f77bcf86cd799439011",
    text:
      "To generate a new ObjectId using ObjectId() with a unique hexadecimal string: sal;kdfj;aslkfjl;a s;lkfdas;d ;l sad;flksa elaeir;mviiew s;lfaeij;dslkfm;lezifnz;sd vief;lkzmsdl/vkmzsd lsdkf;ei;zsdlkn;zlsefizds"
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

  describe("POST /posts", () => {
    it("can create a new post", async () => {
      await request(server)
        .post("/posts")
        .send(testPost)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(response => {
          // Save the post _ID for use in other tests
          testPostID = response.body._id;
        });
    });
    it("can create a post with no tags", async () => {
      await request(server)
        .post("/posts")
        .send(testPostNoTags)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("fails if body is empty", async () => {
      await request(server)
        .post("/posts")
        .send({})
        .set("Accept", "application/json")
        .expect(400);
    });
  });

  describe("GET /posts", () => {
    it("can get a list of posts", async () => {
      await request(server)
        .get("/posts")
        .expect(200);
    });
    it("can get a single post by _id", async () => {
      await request(server)
        .get(`/posts/${testPostID}`)
        .expect(200)
        .then(response => {
          expect(response.body.title).to.equal(testPost.title);
        });
    });
    it("sends 400 if a post id doesnt exist", async () => {
      await request(server)
        .get("/posts/asdasd")
        .expect(400);
    });
  });

  describe("PUT /posts", () => {
    it("can update a single post by _id", async () => {
      const updatedPost = {
        title: "Updated Post Title",
        author: "507f1f77bcf86cd799439011",
        text:
          "This Text Has Been Updated !!!!g ObjectId() with a unique hexadecimal string: sal;kdfj;aslkfjl;a s;lkfdas;d ;l sad;flksa elaeir;mviiew s;lfaeij;dslkfm;lezifnz;sd vief;lkzmsdl/vkmzsd lsdkf;ei;zsdlkn;zlsefizds",
        tags: ["CSS", "New Tag"]
      };
      await request(server)
        .put(`/posts/${testPostID}`)
        .send(updatedPost)
        .expect(200);
    });
    it("fails if updated value is invalid", async () => {
      const updatedPost = {
        title: "Short",
        author: "507f1f77bcf86cd799439011",
        text: "k",
        tags: ["CSS", "New Tag"]
      };
      await request(server)
        .put(`/posts/${testPostID}`)
        .send(updatedPost)
        .expect(400);
    });
  });

  describe("DELETE /posts", () => {
    it("can delete a post by _id param", async () => {
      await request(server)
        .delete(`/posts/${testPostID}`)
        .set("Accept", "application/json")
        .expect(200);
    });
    it("fails if _id is not found", async () => {
      await request(server)
        .delete("/posts/1")
        .set("Accept", "application/json")
        .expect(400);
    });
  });
});
