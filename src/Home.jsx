import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!city) {
      alert("Enter a city");
      return;
    }
    navigate("/weather", { state: { city } });
  };

  return (
<div className="container">
      <h1>Enter your city</h1>
      <input type="text" placeholder="City name" value={city}  onChange={(e) => setCity(e.target.value)}/>
      <br /><br />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
export default Home;