const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
