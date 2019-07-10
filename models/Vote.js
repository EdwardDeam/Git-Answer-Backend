const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vote: Number
});

const Vote = mongoose.model("Vote", voteSchema);

const validateVote = vote => {
  const schema = Joi.object().keys({
    vote: Joi.Number.min(-1).max(1)
  });
  return Joi.validate(vote, schema);
};

module.exports = {
  Vote,
  validateVote
};
