import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import phonebookService from "./services/phonebookService.js";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber, // Simple ID generation
    };
    const existPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existPerson) {
      const confirmReplacement = window.confirm(
        `${newName} is already added to phonebook`
      );
      if (confirmReplacement) {
        phonebookService
          .updatePerson(existPerson.id, newPerson)
          .then((returnedData) => {
            setPersons(
              persons.map((person) =>
                person.id !== existPerson.id ? person : returnedData
              )
            );
            console.log("updated person", returnedData);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            alert("Error updating person. Please try again.");
          });
      }
      console.log(confirmReplacement);
    } else {
      phonebookService
        .createPerson(newPerson)
        .then((returnedData) => {
          setPersons(persons.concat(returnedData));
          console.log("added person", returnedData);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          alert("Error adding person. Please try again.");
        });
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDeletion = window.confirm(
      `are you sure you want to delete ${personToDelete.name}?`
    );
    if (confirmDeletion) {
      phonebookService
        .deletePerson(id)
        .then((returnedData) => {
          setPersons(persons.filter((person) => person.id !== id));
          console.log("deleted person", returnedData);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert("Error deleting person. Please try again.");
        });
    }
  };

  useEffect(() => {
    // Fetch initial data from the server
    phonebookService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
