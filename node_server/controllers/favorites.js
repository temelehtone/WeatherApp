const User = require("../models/User.js");
const favoriteRouter = require("express").Router();

favoriteRouter.get("/:username", async (request, response) => {
  const user = await User.findOne({ username: request.params.username });
  response.json(user.favorites);
});

favoriteRouter.post("/", async (request, response) => {
  const user = await User.findOne({ username: request.body.username });

  user.favorites = user.favorites.concat(request.body.city);
  await user.save();
  response.status(201).json(user.favorites);
});

favoriteRouter.delete("/:username&:city", async (request, response) => {
  const user = await User.findOne({ username: request.params.username });

  user.favorites = user.favorites.filter((city) => city !== request.params.city);
  await user.save();
  response.status(204).end();
});

module.exports = favoriteRouter;
