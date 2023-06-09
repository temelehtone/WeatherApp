import axios from "axios";
axios.defaults.baseURL = "https://weatherapp-xrw3.onrender.com/"; 

const getWeatherData = async (coordinates) => {
  const promiseArray = coordinates.map((c) =>
    axios.get(`weather/getData/${c.lat}&${c.lon}`)
  );
  return await Promise.all(promiseArray);
};
const getCitiesData = async (cities) => {
  const promiseArray = cities.map((c) =>
    axios.get(`weather/getCity/${c.city}`)
  );
  return await Promise.all(promiseArray);
};

export default { getWeatherData, getCitiesData };
