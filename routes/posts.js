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
      // const { error } = validateTag(tag);
      // if (error) return res.status(400).send(error.details[0].message);
      let newTag = await Tag.findOne({ name: tag });
      if (newTag) {
        newTags.push(newTag);
      } else {
        newTag = new Tag({ name: tag });
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
    _.pick(req.body, ["_id", "title", "author", "text", "tags"])
  );
  await newPost.save();

  // Return new post
  res.send(newPost);
});

// Delete post from database
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID: ", id);
  try {
    const foundPost = await Post.findOneAndDelete({ _id: id });
    return res.status(200).send(`Post deleted: ${foundPost.title}`);
  } catch (err) {
    return res.status(400).send(`Post deletion error: ${err}`);
  }
});

module.exports = router;
