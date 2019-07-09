const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  signup_date: {
    type: Date,
    default: Date.now
  },
  saved_posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  authenticated: {
    type: Boolean
  },
  own_posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = User = mongoose.model('user', UserSchema);
