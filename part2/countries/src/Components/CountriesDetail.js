import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountriesDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const api_key = "732bc70ca860384aa6cd19e0d691c11c";

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
        <img height="100" src={country.flags.svg} />
      </li>
      {weather ? <Weather weather={weather} /> : ""}
    </div>
  );
};

export default CountriesDetails;
