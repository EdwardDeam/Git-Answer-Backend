const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  signupDate: {
    type: Date,
    default: Date.now
  },
  savedPosts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  ownPosts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  admin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.jwtSecret);
};

const User = mongoose.model("User", userSchema);

const validateUser = user => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(20)
      .alphanum()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    emailVerified: Joi.boolean(),
    admin: Joi.boolean()
  });
  return Joi.validate(user, schema);
};

module.exports = {
  User,
  validateUser
};
