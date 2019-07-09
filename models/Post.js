const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    user_id, // difficulty reading
    required: true
  },
  text: {
    type: String,
    required: true
  },
  page_views: {
    type: Number
  },
  tags: {},
  date: {
    type: Date,
    default: Date.now
  },
  comments: {},
  votes: {}
});

module.exports = Post = mongoose.model('post', PostSchema);
