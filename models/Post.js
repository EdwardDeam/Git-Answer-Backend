const mongoose = require("mongoose");

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

const Post = mongoose.model("post", PostSchema);

const validatePost = post => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(15)
      .max(150)
      .required(),
    author: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/, "mongo object id")
      .required(),
    text: Joi.string()
      .min(200)
      .required(),
    pageViews: Joi.number()
      .integer()
      .positive()
  });
};
module.exports = {
  Post,
  postSchema
};
