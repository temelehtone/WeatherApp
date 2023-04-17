import React from 'react'

import helper from "../utils/helper";

import SelectBox from "../components/SelectBox";
import WeatherComponent from "../components/WeatherComponent";
import Loading from '../components/Loading';

const Home = ({ weatherData, selectedCity, setSelectedCity, favorites, user }) => {
  return (
    <div className="flex min-h-full gap-4 align-center flex-col justify-center px-6">
        <SelectBox cities={user && favorites?.length > 0 ?  favorites : helper.cities} setSelectedCity={setSelectedCity} />
        {weatherData && weatherData.length > 0 ? (
          weatherData.map((data) => {
            if (
                selectedCity !== "all" &&
                selectedCity.replaceAll("ä", "a") !== data.city.name.replaceAll("ä", "a")
            )
              return;
            return <WeatherComponent data={data} key={data.city.id} />;
          })
        ) : (
          <Loading />
        )}
      </div>
  )
}

export default Home