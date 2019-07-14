const mongoose = require("mongoose");
const expect = require("chai").expect;
// Test database for testing

const { User } = require("../../models/User");

describe("User model test", () => {
  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/gitanswer_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // Sanity check that User has been defined.
  it("Has a module", () => {
    expect(User).not.to.be.undefined;
  });

  describe("Get User", () => {
    it("Gets all users", async () => {
      // Setup dummy users
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      const foundUser = await User.findOne({ email: "test@hotmail.com" });

      const expectedUser1Email = "test@hotmail.com";
      const actualUser1Email = foundUser.email;
      expect(actualUser1Email).to.equal(expectedUser1Email);
    });
    it("GETs a user by ID", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      const foundUser = await User.findById(user._id);

      const expectedEmail = "test@hotmail.com";
      const actualEmail = foundUser.email;

      expect(actualEmail).to.equal(expectedEmail);
    });
    it("Test admin default setting", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      const foundUser = await user.save();

      const expectedUserAdmin = false;
      const actualUserAdmin = foundUser.admin;

      expect(actualUserAdmin).to.equal(expectedUserAdmin);
    });
    it("Test user email verified default", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      const foundUser = await user.save();

      const expectedEmailVerified = false;
      const actualEmailVerified = foundUser.emailVerified;

      expect(actualEmailVerified).to.equal(expectedEmailVerified);
    });
  });

  describe("Update user", () => {
    it("Updates a single user", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      user.password = "updatedpassword";

      const updatedUser = await user.save();

      const expectedpassword = "updatedpassword";
      const actualpassword = updatedUser.password;

      expect(actualpassword).to.equal(expectedpassword);
    });
  });

  describe("Save user", () => {
    it("Save a user", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      const expectedUserEmail = "test@hotmail.com";
      const actualUserEmail = user.email;

      expect(actualUserEmail).to.equals(expectedUserEmail);
    });
  });

  describe("Delete user", () => {
    it("Deletes a user", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      await user.save();

      await User.deleteOne({ email: "test@hotmail.com" });

      const deletedUser = await User.findOne({ email: "test@hotmail.com" });

      expect(deletedUser).to.be.null;
    });
    it("Deletes a user by ID", async () => {
      const user = new User({
        username: "test",
        email: "test@hotmail.com",
        password: "passwurd0"
      });

      const testUser = await user.save();

      await User.findByIdAndDelete(testUser._id);

      const deletedUser = await User.findById(testUser._id);

      expect(deletedUser).to.be.null;
    });
  });
});
