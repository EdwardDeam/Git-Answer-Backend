const mongoose = require("mongoose");
const Joi = require("joi");
//const Joi.objectId = require("../lib/validateMongoID")(Joi);

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  text: String
});

const Comment = mongoose.model("comment", commentSchema);

const validateComment = comment => {
  const schema = Joi.object().keys({
    author: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/, "mongo object id")
      .required(),
    //author = Joi.objectID(),
    // Keep length minimum to reduce low value comments.
    text: Joi.string()
      .min(50)
      .required()
  });
  return Joi.validate(comment, schema);
};
module.exports = {
  Comment,
  validateComment
};
