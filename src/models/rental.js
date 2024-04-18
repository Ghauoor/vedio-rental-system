const mongoose = require("mongoose");
const joi = require("joi");

function validateRequest(rental) {
  const schema = joi.object({
    customerId: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "object Id"),
    movieId: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "object Id"),
    dateOut: joi.date(),
    rentalFee: joi.number().min(0),
  });
  return schema.validate(rental);
}

const customerSchema = new mongoose.Schema({
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
});

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },

  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: moviesSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

exports.Rental = Rental;
exports.validate = validateRequest;
