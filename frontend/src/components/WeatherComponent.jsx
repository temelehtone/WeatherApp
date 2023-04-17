import React from "react";
import Cityinfo from "./Cityinfo";
import WeatherCardWrapper from "./WeatherCardWrapper";

const WeatherComponent = ({ data }) => {
  return (
    <div
      key={data.city.id}
      className="flex gap-4 align-center flex-col justify-center px-0"
    >
      <Cityinfo data={data} />
      <WeatherCardWrapper data={data} />
    </div>
  );
};

export default WeatherComponent;
