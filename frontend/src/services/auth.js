import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";
const baseUrl = "auth/";

const login = async (body) => {
  const response = await axios.post(baseUrl + "login", body);
  return response.data;
};

const signUp = async (body) => {
  const response = await axios.post(baseUrl + "createUser", body);
  return response.data;
};

export default { login, signUp };
