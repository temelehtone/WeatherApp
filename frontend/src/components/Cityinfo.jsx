import React from "react";

const Cityinfo = ({data}) => {
    const firstData = data.list[0];
    const currentDate = new Date()
    let precipiation;
    if(firstData.rain) {
        precipiation = firstData.rain["3h"]
    } else if(firstData.snow) {
        precipiation = firstData.snow["3h"]
    } 
    // Change "n" to "d" to get images with colors
    const imageUrl = `https://openweathermap.org/img/wn/${firstData.weather[0].icon.slice(0, -1) + "d"}.png`
    const time = currentDate.toLocaleTimeString("fi").split(".");
  return (
    <div className="p-4 border-2 bg-white border-l-gray-border rounded-md grid city-grid gap-y-5">
      <div>
        <p className="text-2xl text-main-text">{data.city.name}</p>
        <p className="text-base text-gray-text">{firstData.weather[0].main}</p>
      </div>
      <div className="mt-100 flex gap-2 justify-end">
        <img src={imageUrl} />
        <p className="my-auto text-3xl align-middle">{Math.round(firstData.main.temp)} °C</p>
      </div>

      <div className="flex flex-col">
        <p className="mt-auto text-xl">{currentDate.toLocaleDateString("fi")}</p>
        <p className="text-base text-gray-text">{time[0]}:{time[1]}</p>
      </div>
      <div className="mt-100 text-end ">
        <p className="text-base text-gray-text">Wind: {firstData.wind.speed} m/s</p>
        <p className="text-base text-gray-text">Humidity: {firstData.main.humidity} %</p>
        {precipiation && <p className="text-base text-gray-text">Precipitation (3h): {Math.round(precipiation)} mm</p>}
      </div>
    </div>
  );
};

export default Cityinfo;
