const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const mongoURI = "mongodb://localhost/gitanswer";

mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
