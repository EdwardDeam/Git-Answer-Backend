const mongoose = require("mongoose");
const expect = require("chai").expect;
// Test database for testing

const { Tag } = require("../../models/Tag");

describe("Tag model test", () => {
  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Tag.deleteMany({});
  });
  afterEach(async () => {
    await Tag.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // Sanity check that Tag has been defined.
  it("Has a module", () => {
    expect(Tag).not.to.be.undefined;
  });

  describe("Get Tags", () => {
    it("gets all tags", async () => {
      // Setup dummy tags
      const tag1 = new Tag({ name: "CSS" });
      const tag2 = new Tag({ name: "Javascript" });
      await tag1.save();
      await tag2.save();

      const foundTags = await Tag.find({});
      const expectedName1 = "CSS";
      const expectedName2 = "Javascript";

      const actualName1 = foundTags[0].name;
      const actualName2 = foundTags[1].name;

      expect(actualName1).to.equal(expectedName1);
      expect(actualName2).to.equal(expectedName2);
    });
    it("gets a single tag by _id", async () => {
      const testTag = new Tag({ name: "Rust" });
      const savedTag = await testTag.save();

      const foundTag = await Tag.findById(savedTag._id);
      const expectedName = "Rust";
      const actualName = foundTag.name;

      expect(actualName).to.equal(expectedName);
    });
    it("gets a single tag by name", async () => {
      const testTag = new Tag({ name: "Rust" });
      await testTag.save();

      const foundTag = await Tag.findOne({ name: "Rust" });
      const expectedName = "Rust";
      const actualName = foundTag.name;

      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Save tag", () => {
    it("saves a single tag", async () => {
      const testTag = new Tag({ name: "React" });
      const savedTag = await testTag.save();

      const expectedName = "React";
      const actualName = savedTag.name;

      expect(actualName).to.equal(expectedName);
    });
  });

  describe("Update tag", () => {
    it("upadates a tags name", async () => {
      const testTag = new Tag({ name: "CSS" });
      await testTag.save();

      const foundTag = await Tag.findOne({ name: "CSS" });

      foundTag.name = "Javascript";
      const expected = "Javascript";
      const actual = foundTag.name;

      expect(actual).to.equal(expected);
    });
  });

  describe("Delete tag", () => {
    it("deletes a single tag by name", async () => {
      const testTag = new Tag({ name: "CSS" });
      await testTag.save();

      await Tag.deleteOne({ name: "CSS" });
      const deletedTag = await Tag.findOne({ name: "CSS" });

      expect(deletedTag).to.be.null;
    });

    it("deletes a single tag by _id", async () => {
      const testTag = new Tag({ name: "CSS" });
      const savedTag = await testTag.save();

      await Tag.findByIdAndDelete(savedTag._id);
      const deletedTag = await Tag.findById(savedTag._id);

      expect(deletedTag).to.be.null;
    });
  });
});
