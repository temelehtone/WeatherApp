import axios from "axios";
axios.defaults.baseURL = "https://weatherapp-xrw3.onrender.com/";
const baseUrl = "favorites";

const getAll = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const addFavorite = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const deleteFavorite = async (username, city) => {
  const response = await axios.delete(`${baseUrl}/${username}&${city}`);
  return response.data;
};

export default { getAll, addFavorite, deleteFavorite };
