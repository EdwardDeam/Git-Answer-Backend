const { Comment, validateComment } = require("../models/Comment");
const express = require("express");
const router = express.Router();

// Return all comments
router.get("/", async (req, res) => {
  const comments = await Comment.find({});
  res.send(comments);
});

// TODO: Only get comments related to a specific post

// Add comment to database
router.post("/", async (req, res) => {
  // Test against Joi validation and return the first error
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { author, text } = req.body;
  // Create and save the new comment
  const newComment = new Comment({ author, text });
  try {
    await newComment.save();
    // return new comment
    res.send(_.pick(newComment, ["author", "text"]));
  } catch (err) {
    console.log(`There has been an error ${err}`);
    res.send(err);
  }
});

module.exports = router;
