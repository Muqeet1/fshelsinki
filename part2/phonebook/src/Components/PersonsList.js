import React from "react";

const PersonsList = ({ person }) => (
  <li>
    {person.name} {person.number}
  </li>
);

export default PersonsList;
