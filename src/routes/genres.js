const router = require("express").Router();
const { Genre, validate } = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.status(201).send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send("Genre with this id is not available");
  }

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) {
    return res.status(404).send("Genre with this id is not avaliable");
  }
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("Genre with this id is not avaliable");
  }
  res.send(genre);
});

module.exports = router;
