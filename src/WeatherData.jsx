import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    const data = {
      chennai: { lat: 13.08, lon: 80.27 },
      coimbatore: { lat: 11.01, lon: 76.96 },
      mumbai: { lat: 19.07, lon: 72.87 },
      delhi: { lat: 28.61, lon: 77.20 },
      bangalore: { lat: 12.97, lon: 77.59 }
    };
const c = data[city.trim().toLowerCase()];
    if (!c) {
      alert("City not found");
      return;
    }
    const fetchWeather = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data.current_weather);
    };

    fetchWeather();
  }, [city]);
  return (
<div className="container">
      <h1>Weather Data</h1>
      {weather ? (
        <div>
          <p>🌡 Temp: {weather.temperature} °C</p>
          <p>🌬 Wind Speed: {weather.windspeed} km/h</p>
          <p>🧭 Wind Direction: {weather.winddirection}°</p>
          <p>🌤 Weather Code: {weather.weathercode}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Weather;