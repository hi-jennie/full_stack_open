import Weather from "./Weather";
function CountryDetails({ country }) {
  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2> {country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags["png"]} alt={country.flags["alt"]}></img>
      <Weather country={country} />
    </div>
  );
}
export default CountryDetails;
