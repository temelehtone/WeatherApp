import { useEffect, useState } from "react";
import weatherService from "./services/weather";
import favoriteService from "./services/favorite";
import helper from "./utils/helper";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Auth from "./pages/Auth";
import { SuccessAlert, ErrorAlert } from "./components/Notification";
import cities from "./utils/cities.json"


function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState("all");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    let cities = [];
    if (user && favorites?.length > 0) {
      cities = favorites.map(f => {
        return {city: f.city}
      })
    } else {
      cities = helper.cities;
    }
    weatherService
      .getCitiesData(cities)
      .then((data) => {
        setWeatherData(data.map((d) => d.data));
      })
      .catch((error) => {
        newMessage("error", error.response.data.message);
      });
  }, [user, favorites]);

  useEffect(() => {
    if (!user?.token) return;
    favoriteService
      .getAll(user.username)
      .then((data) => {
        const result = [];
        data.forEach(d => {
          const city = cities.find(c => c.city === d);
          result.push(city)
        })
        setFavorites(result);
      })
      .catch((error) => {
        console.log(error);
        newMessage("error", error.response.data.message);
      });
  }, [user])



  const newMessage = (type, message) => {
    if (type === "success") {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }

    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 4000);
  };

  return (
  <BrowserRouter>
    <Header user={user} setUser={setUser} newMessage={newMessage} />
    {errorMessage && <ErrorAlert message={errorMessage} />}
    {successMessage && <SuccessAlert message={successMessage} />}
    <div className="my-6">    
      <Routes>
        <Route path="/" element={<Home weatherData={weatherData} selectedCity={selectedCity} setSelectedCity={setSelectedCity} favorites={favorites} user={user} />} />
        <Route path="/favorites" element={<Favorites newMessage={newMessage} favorites={favorites} user={user} setFavorites={setFavorites} />} />
        <Route path="/auth" element={<Auth newMessage={newMessage} setUser={setUser} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
