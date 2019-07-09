const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/posts
// @desc    Create post
// @access  Registered users

router.post('/', (req, res) => {
  check('title', 'Post title must be at least 6 characters')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
    check('text', 'Post body must be at least 20 characters')
      .isLength({ min: 20 })
      .not()
      .isEmpty();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Returns an error if above conditions are not met
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('Posts route');
});

module.exports = router;
