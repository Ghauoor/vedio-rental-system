const router = require("express").Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bycrypt = require("bcrypt");
const joi = require("joi");

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User or Password");

  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid User or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
