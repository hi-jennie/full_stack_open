import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import phonebookService from "./services/phonebookService.js";
import Notification from "./components/Notification.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
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
        `${newName} is already added to phonebook, do you want to replace the old number with a new one?`
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
            setMessage({
              type: "success",
              content: `Updated ${returnedData.name}'s number`,
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            console.log("updated person", returnedData);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setMessage({
              type: "error",
              content: "Error updating person. Please try again.",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      console.log(confirmReplacement);
    } else {
      phonebookService
        .createPerson(newPerson)
        .then((returnedData) => {
          setPersons(persons.concat(returnedData));
          setMessage({
            type: "success",
            content: `Added ${returnedData.name}`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          console.log("added person", returnedData);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.log(error.response.data.error);
            setMessage({
              type: "error",
              content: error.response.data.error,
            });
          } else {
            console.error("Unknown error:", error.message || error);
            setMessage({
              type: "error",
              content: "Error adding person. Please try again.",
            });
          }

          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
          setMessage({
            type: "success",
            content: `Deleted ${personToDelete.name}`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          console.log("deleted person", returnedData);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setMessage({
            type: "error",
            content: `Error deleting ${personToDelete.name}. It may have already been removed.`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    // Fetch initial data from the server
    phonebookService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
        console.log("!!!!", initialData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}></Notification>
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
