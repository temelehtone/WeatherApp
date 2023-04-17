const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User.js");

const api = supertest(app);
let savedUser;

beforeAll(async () => {
  const foundUser = await User.findOne({ username: "testuser" });
  if (foundUser) {
    savedUser = foundUser;
  } else {
    const user = new User({
      name: "testuser",
      username: "testuser",
      password: "testuser1",
    });
    savedUser = await user.save();
  }
});
describe("favorite api", () => {
  test("add favorite adds one favorite", async () => {
    const lengthBefore = savedUser.favorites.length;

    const favorites = await api.post("/favorites", { username: "testuser", city: "Tampere" });
    expect(favorites).toHaveLength(lengthBefore + 1);
  });
});

afterAll(() => {
  mongoose.connections.forEach(c => {
    c.close();
  });
});
