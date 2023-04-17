const authRouter = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");

authRouter.post("/createUser", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || /^\s*$/.test(username)) {
    return response.status(400).json({
      message: "Username missing!",
    });
  }
  if (!password || /^\s*$/.test(password)) {
    return response.status(400).json({
      message: "Password missing!",
    });
  }
  if (!name || /^\s*$/.test(name)) {
    return response.status(400).json({
      message: "Name missing!",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser.id,
  };

  const token = jwt.sign(userForToken, config.WEB_TOKEN_SECRET);

  response
    .status(201)
    .json({ token, name: savedUser.name, username: savedUser.username });
});

authRouter.post("/login", async (request, response) => {
    const { username, password } = request.body;
    if (!username || /^\s*$/.test(username)) {
      return response.status(400).json({
        message: "Username missing!",
      });
    }
    if (!password || /^\s*$/.test(password)) {
      return response.status(400).json({
        message: "Password missing!",
      });
    }
  
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        message: "Invalid username or password",
      });
    }
  
    const userForToken = {
      username: user.username,
      id: user.id,
    };
  
    const token = jwt.sign(userForToken, config.WEB_TOKEN_SECRET);
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  });

module.exports = authRouter;
