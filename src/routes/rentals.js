const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validate } = require("../models/rental");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const rental = await Rental.find().select("-__v").sort("-dateOut");
  res.status(200).send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  // Transection

  const session = await Rental.startSession();
  if (!session)
    return res
      .status(500)
      .send("Internal Server Error: Unable to start a database session.");

  session.startTransaction();

  try {
    const rental = new Rental({
      customer: {
        _id: customer.id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie.id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
    await rental.save({ session });
    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();

    res.status(201).send(rental);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send(error.message);
  } finally {
    session.endSession();
  }
});

module.exports = router;
