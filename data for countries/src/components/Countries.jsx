import CountryDetails from "./CountryDetails";
import { useState } from "react";
function Countries({ countries }) {
  const [shownCountryIds, setShownCountryIds] = useState([]);
  if (!countries || countries.length === 0) {
    return null;
  }
  const handleShownCountryIds = (countryId) => {
    // 如果点击的国家已经是显示状态，则隐藏它
    if (shownCountryIds.includes(countryId)) {
      const newShownCountryIds = shownCountryIds.filter(
        (id) => id !== countryId
      );
      setShownCountryIds(newShownCountryIds);
    } else {
      setShownCountryIds(shownCountryIds.concat(countryId));
    }
  };

  return (
    <>
      {/* 如果countriesToShow的长度大于10，显示提示信息 */}
      {countries.length > 10 && (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )}
      {/* 前面两个条件都满足了才render，如果有三个条件，后面加 && 就可以了 */}
      {countries.length <= 10 && countries.length > 1 && (
        <div>
          {countries.map((country) => (
            <div key={country.cca3}>
              <p>
                {country.name.common}{" "}
                <button onClick={() => handleShownCountryIds(country.cca3)}>
                  {shownCountryIds.includes(country.cca3) ? "Hide" : "Show"}
                </button>
              </p>
              {shownCountryIds.includes(country.cca3) && (
                <CountryDetails country={country} />
              )}
            </div>
          ))}
        </div>
      )}
      {countries.length === 1 && <CountryDetails country={countries[0]} />}
    </>
  );
}
export default Countries;
