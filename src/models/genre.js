const Joi = require("joi");
const mongoose = require("mongoose");

function validateRequest(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });

  return schema.validate(genre);
}

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);
const Genre = mongoose.model("Genre", genreSchema);

exports.Genre = Genre;
exports.validate = validateRequest;
exports.genreSchema = genreSchema;
