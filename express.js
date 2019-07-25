const express = require('express');

const app = express();
const cors = require('cors');
const options = {
  origin: true,
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Headers": 'x-auth-token,content-type',
  "Access-Control-Expose-Headers": true
};


app.use(cors(options));
app.use(express.json());
app.use(require('./routes'));

module.exports = app;
