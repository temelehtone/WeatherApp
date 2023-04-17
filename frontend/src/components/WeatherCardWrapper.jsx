import React from "react";
import WeatherCard from "./WeatherCard";

const WeatherCardWrapper = ({ data }) => {
  return (
    <div className="flex gap-2">
      <WeatherCard data={data} />
    </div>
  );
};

export default WeatherCardWrapper;
