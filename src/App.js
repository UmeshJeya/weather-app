// React Modules
import { useState, useEffect } from 'react';
// Components

// Assets/Styling
import './App.css';

// TO ADD IN A USEEFFECT
// PERFORM A NETWORK
// I WANT TO GRAB MY CITY FROM A SUBMIT EVENT

const App = () => {
  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState("");
  const [temperature, setTemperature] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const controlledInput = city.trim();
    setQueryCity(controlledInput);
  }

  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({
      q: queryCity,
      appid: "b0ac25c4be51ba28bb37aa4ad7e64a33",
      units: "metric"
    })

    if (queryCity !== "") {
      fetch(url)
        .then(data => data.json())
        .then(response => setTemperature(response.main.temp))
    }




  }, [queryCity])

  return (
    <main>
      <h1>Weather App!</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="city">Enter a city:</label>
        <input
          type="text"
          id="city"
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>Submit</button>
      </form>

      {
        temperature ? (
          <div>
            <p>{temperature}</p>
          </div>
        ) : null
      }
    </main>
  )
}

export default App;