const mongoose = require("mongoose");
const Joi = require("joi");

function validateRequest(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(customer);
}

const customer = new mongoose.Schema(
  {
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customer);

exports.Customer = Customer;
exports.validate = validateRequest;
