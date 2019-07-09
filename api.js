const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const mongoLOCAL = "mongodb://localhost/gitanswer";

const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch(error => {
    throw new Error(`Unable to connect to database: ${process.env.DB_URL}`);
  });

app.get('/test', (req,res)=> {
  res.status(200).send("Accessed Endpoint!!");
})

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
