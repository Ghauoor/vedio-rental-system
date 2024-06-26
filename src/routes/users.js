const router = require("express").Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already exist");
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bycrypt.genSalt(10);
  user.password = await bycrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res
    .status(201)
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
