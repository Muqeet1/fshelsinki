import React from "react";

const CountriesList = ({ person }) => (
  <div>
  <li>
    Country:{person.name} Region:{person.region}
  </li>
  <img src={person.flag} style={{width: 100}} />
  </div>
);

export default CountriesList;
