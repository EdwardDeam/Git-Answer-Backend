const mongoose = require("mongoose");
const expect = require("chai").expect;
// Test database for testing
const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
mongoose.connect(mongoDB, { useNewUrlParser: true });
const { Tag } = require("../../models/Tag");

describe("Tag model test", () => {
  before(async () => {
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

  describe("get Tags", () => {
    it("gets all tags", async () => {
      // Setup dummy tags
      const tag1 = new Tag({ name: "CSS" });
      const tag2 = new Tag({ name: "Javascript" });
      await tag1.save();
      await tag2.save();

      const foundTags = await Tag.find({});
      const expected1 = "CSS";
      const expected2 = "Javascript";

      const actual1 = foundTags[0].name;
      const actual2 = foundTags[1].name;

      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
    });
  });

  describe("update tag", () => {
    it("upadates a single tag", async () => {
      const testTag = new Tag({ name: "CSS" });
      await testTag.save();

      const foundTag = await Tag.findOne({ name: "CSS" });

      foundTag.name = "Javascript";
      const expected = "Javascript";
      const actual = foundTag.name;

      expect(actual).to.equal(expected);
    });
  });
});
