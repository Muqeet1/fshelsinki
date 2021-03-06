import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import CountriesList from "./Components/CountriesList";
import CountriesDetails from "./Components/CountriesDetail";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [index, setIndex] = useState("");
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  const handleSearch = countries.filter((country) =>
    country.name.official.toLowerCase().includes(searchValue.toLowerCase())
  );

  const api_key = process.env.REACT_APP_API_KEY;
  const getCountries = () => {
    axios
      .get(`https://restcountries.com/v3.1/all?${api_key}`)
      .then((response) => {
        console.log("promise resolved");
        setCountries(response.data);
      });
  };
  const returnName = (i) => {
    setShowResults(true);
    setIndex(i);
    const country = handleSearch[i];
    return <div>{<CountriesDetails country={country[0]} i={index} />}</div>;
  };
  useEffect(getCountries, []);
  const displayCountry = () => {
    if (handleSearch) {
      if (handleSearch.length === 0) {
        return <p>No Data</p>;
      } else if (searchValue.length > 1 && handleSearch.length > 10) {
        return <p>Too many matches, Specify another filter</p>;
      } else if (handleSearch.length > 1 && handleSearch.length <= 10) {
        return (
          <div>
            {handleSearch.map((country, i) => (
              <>
                {!showResults ? (
                  <React.Fragment>
                    <div>
                      <CountriesList country={country} key={country.id} />
                      <button type="button" onClick={() => returnName(i)}>
                        Show
                      </button>
                    </div>
                  </React.Fragment>
                ) : showResults && handleSearch.length <= 6 ? (
                  <React.Fragment>
                    <CountriesDetails country={handleSearch[i]} />
                  </React.Fragment>
                ) : (
                  setShowResults(false)
                )}
              </>
            ))}
          </div>
        );
      } else if (handleSearch.length === 1) {
        return (
          <div>
            {handleSearch.map((country) => (
              <CountriesDetails
                country={country}
                i={index}
                key={country.latlng}
              />
            ))}
          </div>
        );
      }
    }
    return (
      <div>
        {countries.map((country) => (
          <CountriesList country={country} key={country.latlng} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Countries Directory</h2>
      <Filter value={searchValue} searchChange={handleSearchChange} />
      {displayCountry()}
    </div>
  );
};

export default App;
