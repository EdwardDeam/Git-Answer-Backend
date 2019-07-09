const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: {
    type: Number
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
