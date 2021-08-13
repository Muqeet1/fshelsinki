import React, { useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import PersonsList from "./Components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personName = persons.map((person) => person.name.toLowerCase());
    personName.includes(newName.toLowerCase())
      ? alert(`${newName} is already added to phonebook`)
      : newName === ""
      ? alert("Name cannot be empty!")
      : setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  const handleSearch = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

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
        <PersonsList person={person} key={person.number} />
      ))}
    </div>
  );
};

export default App;
