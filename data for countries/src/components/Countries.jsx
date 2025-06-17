import CountryDetails from "./CountryDetails";
function countries({ countriesToShow }) {
  return (
    <>
      {/* 如果countriesToShow的长度大于10，显示提示信息 */}
      {countriesToShow.length > 10 && (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )}
      {/* 前面两个条件都满足了才render，如果有三个条件，后面加 && 就可以了 */}
      {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countriesToShow.length === 1 && (
        <CountryDetails country={countriesToShow[0]} />
      )}
    </>
  );
}
export default countries;
