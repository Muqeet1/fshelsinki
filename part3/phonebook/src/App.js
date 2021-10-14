import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import PersonsList from "./Components/PersonsList";
import phonedirectory from "./Services/phonedirectory";
import Customnotification from "./Components/CustomNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonedirectory.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const personObject = {
    name: newName,
    number: newNumber,
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const customNotifications = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personName = persons.map((person) => person.name.toLowerCase());
    const personExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (newName === "" || newNumber === "") {
      alert("Input fields cannot be empty!");
    } else if (!personName.includes(newName.toLowerCase())) {
      phonedirectory.create(personObject).then((res) => {
        console.log("Successfully Created!");
        customNotifications(
          `Information of ${newName} is successfully added to the server!`,
          "success"
        );
        setPersons(persons.concat(personObject));
        resetForm();
      })
      .catch((error) => {
        customNotifications(error.response.data.error, 'error');
        console.error("Request Unsuccessful");
      });
    } else if (personExist) {
      const alertConfirmation = window.confirm(
        `${personExist.name} is already added to phonebook! Do you want to update the PhoneNumber?`
      );
      if (alertConfirmation) {
        const personObject = {
          ...personExist,
          number: newNumber,
        };
        phonedirectory
          .update(personExist.id, personObject)
          .then((updatedPerson) => {
            console.log("Successfully Updated");
            customNotifications(
              `Information of ${personExist.name} is successfully updated to the server!`,
              "success"
            );
            setPersons(
              persons.map((person) =>
                person.id !== personExist.id ? person : updatedPerson
              )
            );
            resetForm();
          })
          .catch((error) => {
            customNotifications(error.response.data.error, 'error');
            console.error("Request Unsuccessful");
          });
      }
    }
  };

  const removePerson = (delPerson) => {
    const alertConfirmation = window.confirm(
      `Are you sure you want to delete ${delPerson.name}?`
    );
    if (alertConfirmation)
      phonedirectory
        .del(delPerson.id)

        .then((res) => {
          console.log("Successfully Deleted!");
          customNotifications(
            `Information of ${delPerson.name} is successfully deleted from the server!`,
            "success"
          );
          setPersons(persons.filter((person) => person.id !== delPerson.id));
        })
        .catch((error) => {
          customNotifications(error.response.data.error, 'error');
          console.error("Request Unsuccessful");
          setPersons(persons.filter((person) => person.id !== delPerson.id));
        });
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
      <Customnotification notification={notification} />
      <PersonForm
        name={newName}
        number={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        handleAdd={addPerson}
      />
      <h2>Numbers</h2>
      <div>
        <PersonsList person={handleSearch} removePerson={removePerson} />
      </div>
    </div>
  );
};

export default App;
