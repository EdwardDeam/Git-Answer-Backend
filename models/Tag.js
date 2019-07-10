const mongoose = require("mongoose");
const Joi = require("joi");

const tagSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model("Tag", tagSchema);

const validateTag = tag => {
  const schema = Joi.object().keys({
    // Stop uploading of long tags
    name: Joi.string()
      .max(30)
      .required()
  });
  return Joi.validate(tag, schema);
};

module.exports = {
  Tag,
  validateTag
};
