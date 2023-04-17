import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="overflow-x-scroll weather-card-wrapper flex gap-3">
      {data.list.map((item) => {
        let precipiation;
        if (item.rain) {
          precipiation = item.rain["3h"];
        } else if (item.snow) {
          precipiation = item.snow["3h"];
        }
        const time = item.dt_txt.split(" ")[1].split(":");
        return (
          <div
            key={item.dt}
            className="border-2 text-center w-40 bg-white border-l-gray-border rounded-md"
          >
            <div className=" px-6 py-2">
              <p className="text-gray-text text-base">
                {time[0]}:{time[1]}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${
                  item.weather[0].icon.slice(0, -1) + "d"
                }.png`}
              />
              <p className="text-gray-text text-xl">
                {Math.round(item.main.temp)}°C
              </p>
            </div>
            <div className=" bg-bg-light-blue py-2">
              <p className="text-gray-text text-sm">{item.wind.speed} m/s</p>
              <p className="text-gray-text text-sm">{item.main.humidity} %</p>
              {
                <p className="text-sm text-gray-text">
                  {precipiation ? Math.round(precipiation) : 0} mm
                </p>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherCard;
