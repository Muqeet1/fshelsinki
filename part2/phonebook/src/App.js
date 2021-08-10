import React, { useState } from "react";

const App = () => {
  
  const [persons, setPersons] =  useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
 
  const addPerson = event => {
    event.preventDefault();
    const personName = persons.map((person) => person.name);
    personName.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };
  
  const handleSearch = event => {
    event.preventDefault();
    const filterNames = persons.every(person => person.name == searchValue)
    console.log(filterNames)
  }
  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleSearchChange = event => setSearchValue(event.target.value);
  const NamesList = ({ person }) => <li>{person.name} {person.number}</li>
  return (
    <div>
      <div>
      <input value={searchValue} onChange={handleSearchChange}/>
      <button onClick={handleSearch}>Search</button>
      </div>
    <h2>Phonebook</h2>
    <form>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit" onClick={addPerson}> add </button></div>
    </form>
    <h2>Numbers</h2>
    <ul>{persons.map((person) => <NamesList person={person} />)}</ul>
  </div>
  );
};

export default App;