import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function Weather({ country }) {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  console.log("API Key:", apiKey);
  const getWeather = () => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    console.log("Latitude:", lat, "Longitude:", lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        console.log("Weather data:", response.data);
        setWeatherData(response.data);
        console.log("Weather data set:", weatherData);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      {weatherData && (
        <div>
          <p>Temperatures {weatherData.main["temp"]} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]["icon"]}@2x.png`}
          />
          <p>Wind {weatherData.wind["speed"]} m/s</p>
        </div>
      )}
    </div>
  );
}
export default Weather;
