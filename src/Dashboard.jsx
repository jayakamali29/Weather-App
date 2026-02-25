import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("weatherHistory");
    setHistory([]);
  };

  return (
    <div className="container">
      <h1>Previous Searches</h1>

      {history.length === 0 ? (
        <p>No previous searches found.</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/weather", { state: { city: item.name } })
            }
          >
            <h3>{item.name}</h3>
            <p>Temperature: {item.main.temp} °C</p>
            <p>Humidity: {item.main.humidity}%</p>
          </div>
        ))
      )}

      <br />
      {history.length > 0 && (
        <button onClick={clearHistory}>Clear All</button>
      )}
    </div>
  );
}

export default Dashboard;