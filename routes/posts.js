const _ = require("lodash");
const { Post, validatePost } = require("../models/Post");
const { Tag, validateTag } = require("../models/Tag");
const express = require("express");
const router = express.Router();

// Return all posts
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

// TODO: Only get comments related to a specific post

// Add post to database
router.post("/", async (req, res) => {
  // Test against Joi validation and return the first error
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find and add new tags
  if (req.body.tags) {
    const allTags = await Tag.find({});
    req.body.tags.foreach(tag => {
      if (!allTags.includes({ name: tag })) {
        const newTag = new Tag({ name: tag });
        await newTag.save();
      }
    });
  } else {
    // if no tags present set to empty array
    req.body.tags = [];
  }

  // Create and save the new post
  const newPost = new Post(_.pick(req.body, ["title", "author", "text"]));
  newPost.tags = postTags;
  await newPost.save();

  // Log and return new comment
  console.log(`Comment (${newComment._id}) saved.`);
  res.send(_.pick(newComment, ["author", "text"]));
});

module.exports = router;
