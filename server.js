const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const mongoURI = "mongodb://localhost/gitanswer";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch(error => {
    throw new Error(`Unable to connect to database: ${mongoURI}`);
  });

app.get('/', (req,res)=> {
  res.send("Accessed Endpoint!!");
})

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
