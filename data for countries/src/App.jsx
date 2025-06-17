import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  console.log(countriesToShow);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountriesToShow(filteredCountries);
    }
  }, [searchTerm]);

  if (!countries) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Filter>
      <Countries countriesToShow={countriesToShow}></Countries>
    </div>
  );
}

export default App;
