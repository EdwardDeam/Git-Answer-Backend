require("dotenv").config();
const app = require("./express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const localMongo = "mongodb://localhost:27017/GitAnswerDev";

// IIFE To Connect to database and catch any errors
(async function dbconnect() {
  try {
    await mongoose.connect(localMongo, {
      useNewUrlParser: true,
      useCreateIndex: true
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
