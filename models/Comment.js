const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: {},
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
