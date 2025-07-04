function Persons({ personsToShow, handleDelete }) {
  return (
    <ol>
      {personsToShow.map((person, index) => (
        <li key={index}>
          <strong>
            {person.name} {person.number}
          </strong>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ol>
  );
}
export default Persons;
