const mongoose = require("mongoose");
const joi = require("joi");

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(5).email().required(),
    password: joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
