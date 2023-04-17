const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware.js");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const authRouter = require("./controllers/auth.js");
const weatherRouter = require("./controllers/weather.js");
const favoriteRouter = require("./controllers/favorites.js");
require("express-async-errors");

const app = express();
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
// app.use(express.static("dist"));
app.use(middleware.requestLogger);

app.use("/auth", authRouter);
app.use("/weather", weatherRouter);
app.use("/favorites", favoriteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
