const jwt = require("jsonwebtoken");
const config = require("../config/config");

function auth(req, res, next) {
  console.log("inside auth");
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) return res.status(401).send("Access Denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (exeption) {
    res.status(400).send("Invalid Token.");
  }
}

module.exports = auth;
