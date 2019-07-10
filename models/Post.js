const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  text: String,
  pageViews: Number,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }]
});

module.exports = Post = mongoose.model("post", PostSchema);
