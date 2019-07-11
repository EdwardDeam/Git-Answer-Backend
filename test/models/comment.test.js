const mongoose = require("mongoose");
const expect = require("chai").expect;
// Test database for testing

const { Comment } = require("../../models/Comment");

describe("Comment model test", () => {
  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Comment.deleteMany({});
  });
  afterEach(async () => {
    await Comment.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // Sanity check that comment has been defined.
  it("Has a module", () => {
    expect(Comment).not.to.be.undefined;
  });

  describe("get comments", () => {
    it("gets all comments", async () => {
      // Setup dummy comments
      const comment1 = new Comment({
        author: "507f191e810c19729de860ea",
        text: "This is a comment which contains exactly 55 characters."
      });
      const comment2 = new Comment({
        author: "507f191e810c19729de860ea",
        text:
          "This is a second comment to confirm the test a second time; this comment contains exactly 105 characters!"
      });
      await comment1.save();
      await comment2.save();

      const foundComments = await Comment.find({});
      const expected1 =
        "This is a comment which contains exactly 55 characters.";
      const expected2 =
        "This is a second comment to confirm the test a second time; this comment contains exactly 105 characters!";

      const actual1 = foundComments[0].text;
      const actual2 = foundComments[1].text;

      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
    });
  });

  describe("update comment", () => {
    it("update single comment", async () => {
      const testComment = new Comment({
        text: "This is a comment which contains exactly 55 characters."
      });
      await testComment.save();

      const foundComment = await Comment.findOne({
        text: "This is a comment which contains exactly 55 characters."
      });

      foundComment.text =
        "This is a comment which contains exactly 55 characters.";
      const expected =
        "This is a comment which contains exactly 55 characters.";
      const actual = foundComment.text;

      expect(actual).to.equal(expected);
    });
  });

  describe("save comment", () => {
    it("save comment", async () => {
      const comment = new Comment({
        author: "507f191e810c19729de860ea",
        text: "This is a test to ensure that comments are being saved properly."
      });
      const savedComment = await comment.save();
      const expected =
        "This is a test to ensure that comments are being saved properly.";
      const actual = savedComment.text;
      expect(actual).to.equal(expected);
    });
  });
  describe("delete comment", () => {
    it("deletes a comment using its text content", async () => {
      // Setup dummy comment
      const testComment = new Comment({
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      await testComment.save();
      await Comment.deleteOne({
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      const deletedComment = await Comment.findOne({
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });

      expect(deletedComment).to.be.null;
    });

    it("deletes a comment using its _id", async () => {
      // Setup dummy post
      const post = new Comment({
        author: "507f1f77bcf86cd799439011",
        text:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage"
      });
      const testComment = await post.save();
      await Comment.findByIdAndDelete(testComment._id);
      const deletedComment = await Comment.findById(testComment._id);

      expect(deletedComment).to.be.null;
    });
  });
});
