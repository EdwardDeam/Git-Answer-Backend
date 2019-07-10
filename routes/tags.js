const { Tag } = require("../models/Tag");
const express = require("express");
const router = express.Router();

// Get list of all tags
router.get("/", async (req, res) => {
  const tags = await Tag.find({});
  res.send(tags);
});
// Basic Seeding Endpoint
// TODO: Find / Create a list of Popular tags to start with.
router.get("/seed", async (req, res) => {
  const tagList = [
    "Javascript",
    "HTML",
    "CSS",
    "Ruby",
    "Ruby on Rails",
    "C++",
    "C",
    "C#"
  ];
  for (let index = 0; index < tagList.length; index++) {
    const newTag = new Tag({ name: tagList[index] });
    await newTag.save();
  }
  res.send("Tag List Sucessfully Seeded");
});

// TODO: Add endpoints for patch delete for admin use

module.exports = router;
