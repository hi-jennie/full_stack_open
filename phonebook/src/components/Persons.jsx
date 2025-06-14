function Persons({ personsToShow }) {
  return (
    <ol>
      {personsToShow.map((person, index) => (
        <li key={index}>
          <strong>
            {person.name} {person.number}
          </strong>
        </li>
      ))}
    </ol>
  );
}
export default Persons;
