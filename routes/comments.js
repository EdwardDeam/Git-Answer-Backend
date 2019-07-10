const _ = require('lodash');
const { Comment, validateComment } = require('../models/Comment');
const express = require('express');
const router = express.Router();

// Return all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find({});
  res.send(comments);
});

// TODO: Only get comments related to a specific post

// Add comment to database
router.post('/', async (req, res) => {
  console.log('post comments');
  console.log(req.body);
  // Test against Joi validation and return the first error
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create and save the new comment
  const newComment = new Comment(_.pick(req.body, ['author', 'text']));
  try {
    await newComment.save();

    // Log and return new comment
    console.log(`Comment (${newComment._id}) saved.`);
    res.send(_.pick(newComment, ['author', 'text']));
  } catch (err) {
    console.log(`There has been an error ${err}`);
    res.send(err);
  }
});

module.exports = router;