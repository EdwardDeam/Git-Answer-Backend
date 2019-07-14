const { Post, validatePost } = require("../models/Post");
const { Tag, validateTag } = require("../models/Tag");
const express = require("express");
const router = express.Router();

// Return all posts
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

// Get a single post by _id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });
    res.send(post);
  } catch (error) {
    res.status(400).send(`Post with ID ${id} not found.`);
  }
});

// Add post to database
router.post("/", async (req, res) => {
  // Test against Joi validation and return the first error
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, author, text } = req.body;
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
    //)};
  }

  // Create and save the new post
  const newPost = new Post({ title, author, text, tags: newTags });
  await newPost.save();

  // Return new post
  res.send(newPost);
});

// Update a post by its _id
router.put("/:id", async (req, res) => {
  // Check that new updated post is valid.
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find and add new tags
  // TODO: Move this to helper function
  const newTags = [];
  if (req.body.tags) {
    for (let i = 0; i < req.body.tags.length; i++) {
      let tag = req.body.tags[i];

      let newTag = await Tag.findOne({ name: tag });
      if (newTag) {
        newTags.push(newTag);
      } else {
        newTag = new Tag({ name: tag });
        await newTag.save();
        newTags.push(newTag);
      }
    }
  }
  req.body.tags = newTags;
  try {
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      }
    );
    res.status(200).send("Updated Successfully");
  } catch (error) {
    return res.status(400).send(`Post updating error: ${error}`);
  }
});

// Delete post from database
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundPost = await Post.findOneAndDelete({ _id: id });
    return res.status(200).send(`Post deleted: ${foundPost.title}`);
  } catch (error) {
    return res.status(400).send(`Post deletion error: ${error}`);
  }
});

module.exports = router;
