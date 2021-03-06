import React from "react";

const Weather = ({ weather }) => (
  <div>
    <h3>Weather in {weather.location.name}</h3>
    <p>Temperature: {weather.current.temperature} Celsius</p>
    <p>Feels Like: {weather.current.feelslike} Celsius</p>
    <img src={weather.current.weather_icons} alt="weather" />
    <p>Humidity: {weather.current.humidity}</p>
    <p>
      Wind: {weather.current.wind_speed} mph direction 
      {weather.current.wind_dir}
    </p>
  </div>
);

export default Weather;
