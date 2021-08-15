import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import CountriesList from "./Components/CountriesList";
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personName = countries.map((person) => person.name.toLowerCase());
    personName.includes(newName.toLowerCase())
      ? alert(`${newName} is already added to phonebook`)
      : newName === ""
      ? alert("Name cannot be empty!")
      : setCountries(countries.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  const handleSearch = countries.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  handleSearch.length === 1 
  ? console.log(handleSearch.map(country => country.area))
   : console.log('false')

  const getCountries = () => {
    console.log('effect')
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      console.log('promise resolved')
      setCountries(response.data)
      console.log(response.data, "the data from server")
    })
  }

useEffect(getCountries, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} searchChange={handleSearchChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        handleAdd={addPerson}
      />
      <h2>Numbers</h2>
      {/* Added key={person.number} so react can track each list element => 
     Each child in a list should have a unique "key" prop  */}
      {handleSearch.map((person) => (
        <CountriesList person={person} key={person.number} />
      ))}
     
    </div>
  );
};

export default App;