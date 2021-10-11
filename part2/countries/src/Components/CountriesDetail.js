import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountriesDetails = ({ country, i }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const api_key = "";

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log("promise resolved");
        setWeather(response.data);
      });
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <li>Capital: {country.capital}</li>
      <li>Population: {country.population}</li>
      <h3> Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <li>
        <img height="100" src={country.flags.svg} alt="country flag" />
      </li>
      {weather ? <Weather weather={weather} /> : ""}
    </div>
  );
};

export default CountriesDetails;
