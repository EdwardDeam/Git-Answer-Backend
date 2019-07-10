const mongoose = require("mongoose");
const Joi = require("joi");

const tagMongoSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model("Tag", tagMongoSchema);

const tagSchema = Joi.object().keys({
  // Stop uploading of long tags
  name: Joi.string()
    .max(30)
    .required()
});

const validateTag = tag => {
  return Joi.validate(tag, tagSchema);
};

module.exports = {
  Tag,
  validateTag,
  tagSchema
};
