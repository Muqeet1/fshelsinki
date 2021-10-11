import React from "react";

const CountriesList = ({ country }) => (
  <div>
    <li>
      Country:{country.name.common} -- Region:{country.region}
    </li>
  </div>
);

export default CountriesList;
