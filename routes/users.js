const bcrtpt = require("bcrypt");
const { User, validateUser } = require("../models/User");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  req.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;
  try {
    let newUser = await User.findOne({ email: email });
    if (newUser) return res.status(400).send("Email already registered");
  } catch (err) {
    res.status(400).send(`There has been an error: ${err}`);
  }

  try {
    newUser = await User.findOne({ username: username });
    if (newUser) return res.status(400).send("Username taken");

    newUser = new User({ username, email, password });

    const salt = await bcrtpt.genSalt(10);
    newUser.password = await bcrtpt.hash(newUser.password, salt);
    await newUser.save();

    const token = newUser.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(newUser, ["_id", "username", "email"]));
  } catch (err) {
    res.status(400).send(`There has been an error: ${err}`);
  }
});

module.exports = router;
