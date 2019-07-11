const mongoose = require("mongoose");
const expect = require("chai").expect;
// Test database for testing

const { Post } = require("../../models/Post");

describe("Post model test", () => {
  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Post.deleteMany({});
  });
  afterEach(async () => {
    await Post.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  // Sanity check that Post has been defined.
  it("Has a module", () => {
    expect(Post).not.to.be.undefined;
  });

  describe("Get Post", () => {
    it("gets a post by its title", async () => {
      // Setup dummy post
      const testPost = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      await testPost.save();

      const foundPost = await Post.findOne({ title: "Testing Post" });

      const expectedTitle = "Testing Post";
      const actualTitle = foundPost.title;

      expect(actualTitle).to.equal(expectedTitle);
    });

    it("gets a post by its _id", async () => {
      // Setup dummy post
      const post = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      const testPost = await post.save();

      const foundPost = await Post.findById(testPost._id);

      const expectedTitle = "Testing Post";
      const actualTitle = foundPost.title;

      expect(actualTitle).to.equal(expectedTitle);
    });
  });

  describe("Save Post", () => {
    it("saves a Post", async () => {
      // Setup dummy post
      const testPost = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      const savedPost = await testPost.save();

      const expectedTitle = "Testing Post";
      const actualTitle = savedPost.title;
      expect(actualTitle).to.equal(expectedTitle);
    });
  });

  describe("Update Post", () => {
    it("updates a posts title", async () => {
      // Setup dummy post
      const testPost = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });

      await testPost.save();
      testPost.title = "Updated Title";
      const updatedPost = await testPost.save();
      const expectedTitle = "Updated Title";
      const actualTitle = updatedPost.title;

      expect(actualTitle).to.equal(expectedTitle);
    });
  });

  describe("Delete Post", () => {
    it("deletes a post using it's title", async () => {
      // Setup dummy post
      const testPost = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      await testPost.save();
      await Post.deleteOne({ title: "Testing Post" });
      const deletedPost = await Post.findOne({ title: "Testing Post" });

      expect(deletedPost).to.be.null;
    });

    it("deletes a post using it's _id", async () => {
      // Setup dummy post
      const post = new Post({
        title: "Testing Post",
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      const testPost = await post.save();
      await Post.findByIdAndDelete(testPost._id);
      const deletedPost = await Post.findById(testPost._id);

      expect(deletedPost).to.be.null;
    });
  });
});
