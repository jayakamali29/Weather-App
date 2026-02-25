import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FaCity } from "react-icons/fa";
function Weather() {
  const location = useLocation();
  const city = location.state?.city;
  const [weather, setWeather] = useState(null);

  if (!city) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Select the City...</h2>
      </div>
    );
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "9ecf123b4b865c96b34bb39e0b3f86dd";   

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
          alert("City not found");
          return;
        }

        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="container">
      <h1>Weather Data</h1>

      {weather ? (
        <div style={{ fontSize: "20px", lineHeight: "2" }}>
          <p><WiThermometer size={30} /> Temperature: {weather.main.temp} °C</p>
          <p><WiHumidity size={30} /> Humidity: {weather.main.humidity}%</p>
          <p><WiStrongWind size={30} /> Wind Speed: {weather.wind.speed} m/s</p>
          <p><WiBarometer size={30} /> Pressure: {weather.main.pressure} hPa</p>
          <p><FaCity size={25} /> City: {weather.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;