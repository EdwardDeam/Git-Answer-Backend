const config = {
  port: 5000 || process.env.PORT,
  mongoURI: process.env.DB_URL
  // jwtsecret: process.env.JWT_SECRET
};

module.exports = config;
