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
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find and add new tags
  const newTags = [];
  if (req.body.tags) {
    // req.body.tags.forEach(tag => {
    for (let i = 0; i < req.body.tags.length; i++) {
      let tag = req.body.tags[i];
      let newTag = await Tag.findOne({ name: tag });
      if (newTag) {
        newTags.push(newTag);
      } else {
        newTag = new Tag({ name: tag });
        console.log(`NewTag: ${newTag.name}`);
        await newTag.save();
        newTags.push(newTag);
      }
    }
    req.body.tags = newTags;
    //)};
  } else {
    // if no tags present set to empty array
    req.body.tags = newTags;
  }

  // Create and save the new post
  const newPost = new Post(
    _.pick(req.body, ["title", "author", "text", "tags"])
  );
  await newPost.save();

  // Log and return new post
  console.log(newPost);
  res.send(newPost);
});

module.exports = router;