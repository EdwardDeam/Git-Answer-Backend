const _ = require("lodash");
const { Comment, validateComment } = require("../models/Comment");
const express = require("express");
const router = express.Router();

// @route   POST api/comment
// @desc    Create comment
// @access  Registered users

// router.comment('/', (req, res) => {
//   check('text', 'Comment must be at least 3 characters')
//     .isLength({ min: 3 })
//     .not()
//     .isEmpty();
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Returns an error if above conditions are not met
//     return res.status(400).json({ errors: errors.array() });
//   }
//   res.send('Comments route');
// });

router.get("/", async (req, res) => {
  const comments = await Comment.find({});
});

router.post("/", async (req, res) => {
  // Test against Joi validation and return the first error
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newComment = new Comment(_.pick(req.body, ["author", "text"]));
  await newComment.save();

  console.log(`Comment (${newComment._id}) saved.`);
  res.send(_.pick(newComment, ["author", "text"]));
});

module.exports = router;
