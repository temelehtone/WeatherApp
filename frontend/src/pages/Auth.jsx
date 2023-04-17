import React, { useState } from "react";
import Input from "../components/Input";
import authService from "../services/auth";

const Auth = ({ setUser, newMessage, setCurrentPage }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;
    try {
      if (!validateForm()) return;
      if (showLogin) {
        user = await authService.login({ username, password });
      } else {
        user = await authService.signUp({ name, username, password });
      }
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      newMessage(
        "success",
        showLogin
          ? "Login successful!"
          : "Account created successfully! Welcome " + name
      );
      setName("");
      setUsername("");
      setPassword("");
      setCurrentPage("home");
    } catch (error) {
      newMessage("error", error.response.data.message);
    }
  };

  function validateForm() {
    if ((!username || /^\s*$/.test(username))) {
      newMessage("error", "Username required!");
      return false;
    }
    if ((!password || /^\s*$/.test(password))) {
      newMessage("error", "Password required!");
      return false;
    }
    if (!showLogin && (!name || /^\s*$/.test(name))) {
      newMessage("error", "Name required!");
      return false;
    }

    return true;
  }

  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-96 bg-dark-blue-bg p-5 rounded-lg">
      <h2 className="text-center text-lg text-white">Welcome</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full my-5">
        {!showLogin && (
          <Input
            name="Name"
            type="text"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        )}

        <Input
          name="Username"
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <Input
          name="Password"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="cursor-pointer bg-bg-blue px-3 py-4 text-center text-white my-4 w-full rounded-lg text-lg"
          >
            {!showLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
      <span
        className="cursor-pointer text-gray-400"
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin ? "Not account yet? Sign Up" : "Already account? Login"}
      </span>
    </div>
  );
};

export default Auth;
