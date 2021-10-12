import React from "react";

const PersonsList = ({ person, removePerson }) =>
  person.map((oneperson) => (
    <li key={oneperson.name}>
      {oneperson.name} {oneperson.number}{" "}
      <button onClick={() => removePerson(oneperson)}>delete</button>
    </li>
  ));

export default PersonsList;
