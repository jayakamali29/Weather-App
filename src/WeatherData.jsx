import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Weather() {
  const location = useLocation();
  const navigate = useNavigate();   
  const city = location.state?.city;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

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

  
        const previousData =
          JSON.parse(localStorage.getItem("weatherHistory")) || [];

        const filteredData = previousData.filter(
          (item) => item.name !== data.name
        );

        const updatedHistory = [data, ...filteredData];

        localStorage.setItem(
          "weatherHistory",
          JSON.stringify(updatedHistory)
        );

      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!city) {
    return <h2>Select a city first</h2>;
  }

  return (
    <div className="container">

      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>

      <h1>Weather Data</h1>

      {weather ? (
        <div>
          <p><strong>City:</strong> {weather.name}</p>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;