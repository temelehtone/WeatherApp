import React, { useState } from "react";
import cities from "../utils/cities.json";
import { FaTrashAlt, FaStar } from "react-icons/fa"
import Search from "../components/Search";
import favoriteService from "../services/favorite"

const Favorites = ({ newMessage, favorites, user, setFavorites, setCurrentPage }) => {
  const [searchText, setSearchText] = useState("");

  let id = -1;
  const items = cities.map((c) => {
    id++;
    return { name: `${c.city}, ${c.admin_name}`, id, city: c.city };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (favorites.some((f) => f.city === searchText)) {
      newMessage("error", `${searchText} already added to your favorites!`)
      return;
    }
    if (items.some((item) => item.city === searchText)) {
      favoriteService.addFavorite({ city: searchText, username: user.username })
      setFavorites(favorites.concat(cities.find(c => c.city === searchText)))
      newMessage("success", `${searchText} added to favorites!`);
    } else {
      newMessage("error", "Selected city not found!");
    }
  };

  const deleteFavorite = (e) => {
    e.preventDefault();
    favoriteService.deleteFavorite(user.username, e.target.value);
    setFavorites(favorites.filter(f => f.city !== e.target.value))
    newMessage("success", `${e.target.value} deleted from favorites!`);

  }
  if (!user) return (
    <div className="flex items-center flex-col">
      <h2 className="text-center my-6 text-2xl
      ">Login if you want to add favorite cities!</h2>
      <button
          onClick={() => setCurrentPage("auth")}
          className="bg-bg-blue text-white px-5 py-3 rounded-lg"
        >
          Login
        </button>
    </div>
  )
  return (
    <>
      <div className="flex gap-4 justify-center">
        <Search items={items} setSearchText={setSearchText} />
        <button
          onClick={handleSubmit}
          className="bg-bg-blue text-white px-5 py-3 rounded-lg"
        >
          Add to favorites
        </button>
      </div>
      <h2
        className="text-center my-6 text-2xl
      "
      >
        Favorites
      </h2>
      <div className="flex flex-col gap-3 items-center">
        {favorites && favorites.map((item) => {
          return <div className="flex justify-evenly w-full sm:w-1/2 border-2 p-3 border-gray-300 rounded-xl" key={item.city}>
            <FaStar className="my-auto text-3xl mr-auto text-yellow-500" />
            <span className="text-lg m-auto">{item.city}, {item.admin_name}</span>
            <button className="flex gap-5 px-6 py-3 bg-red-300 text-white rounded-xl" onClick={deleteFavorite} value={item.city}>
              Remove
              <FaTrashAlt className="my-auto" />
            </button>
          </div>;
        })}
      </div>
    </>
  );
};

export default Favorites;
