const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user_id: {},
  votes: {} // should we tally this individually instead of having a seperate schema? OS
});

module.exports = Post = mongoose.model('post', PostSchema);
