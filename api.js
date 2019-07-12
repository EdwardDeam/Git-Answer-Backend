require("dotenv").config();
const app = require("./express");

const mongoose = require("mongoose");
const config = require("./config/config");

const PORT = config.port;

// IIFE To Connect to database and catch any errors
(async function dbconnect() {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error(errror);
    throw new Error(`Unable to connect to database: ${localMongo}`);
  }
})();

app.get("/test", (req, res) => {
  res.status(200).send("Accessed Endpoint!!");
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
