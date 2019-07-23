const mongoose = require("mongoose");
const { Tag, tagSchema } = require("./Tag");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  text: String,
  pageViews: Number,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }]
});

const Post = mongoose.model("Post", postSchema);

const validatePost = post => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(10)
      .max(150)
      .required(),
    author: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/, "mongo object id")
      .required(),
    text: Joi.string()
      .min(5)
      .required(),
    pageViews: Joi.number()
      .integer()
      .positive(),
    tags: Joi.array().items(Joi.string())
  });
  console.log(post)
  return Joi.validate(post, schema);
};

module.exports = {
  Post,
  validatePost
};
