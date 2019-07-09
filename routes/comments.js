const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/comment
// @desc    Create comment
// @access  Registered users

router.comment('/', (req, res) => {
  check('text', 'Comment must be at least 3 characters')
    .isLength({ min: 3 })
    .not()
    .isEmpty();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Returns an error if above conditions are not met
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('Comments route');
});

module.exports = router;
