const assert = require("assert");
const defaultMessage = "valid mongo id";

// Validates that the value is an alphanumeric string of 24 characters in length.
module.exports = function joiObjectId(Joi, message) {
  assert(Joi && Joi.isJoi, "you must pass Joi as an argument");
  if (message == undefined) {
    message = defaultMessage;
  }
  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
  };
};
