const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().max(50).required(),
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
