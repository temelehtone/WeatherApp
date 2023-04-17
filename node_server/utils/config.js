require("dotenv").config();

const PORT = process.env.PORT || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const WEB_TOKEN_SECRET = process.env.WEB_TOKEN_SECRET;

module.exports = {
    PORT,
    WEATHER_API_KEY,
    MONGODB_URI,
    WEB_TOKEN_SECRET
  };