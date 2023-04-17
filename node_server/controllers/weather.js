const weatherRouter = require("express").Router();
const config = require("../utils/config.js");
const fetch = require("node-fetch");

const baseURL = "https://api.openweathermap.org/data/2.5/forecast?";



weatherRouter.get("/getData/:lat&:lon", (req, res, next) => {
  fetch(
    `${baseURL}lat=${req.params.lat}&lon=${req.params.lon}&appid=${config.WEATHER_API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

weatherRouter.get("/getCity/:city", (req, res, next) => {
  fetch(
    `${baseURL}q=${req.params.city},FI&appid=${config.WEATHER_API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

module.exports = weatherRouter;
