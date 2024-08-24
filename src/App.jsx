import React, { useEffect, useState } from 'react';
import "./App.css";
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState("mumbai");
  const [formdata, setformdata] = useState("mumbai");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&APPID=285d6d4d8bb5ae2425f001a8784e459b&`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [location]);

  function handleFormData(event) {
    setformdata(event.target.value);
  }

  function handlesubmit(event) {
    event.preventDefault();
    setLocation(formdata);
  }

  const weatherImage = () => {
    if (!weatherData) return "default";
    const weatherMain = weatherData.weather[0].main.toLowerCase();

    switch (weatherMain) {
      case "clear":
        return "clear";
      case "clouds":
        return "clouds";
      case "rain":
        return "rain";
      case "snow":
        return "snow";
      case "mist":
        return "mist";
      case "drizzle":
        return "drizzle";
      default:
        return "clear";
    }
  };

  console.log(weatherImage())

  return (<>    <h1>WEATHER FORECAST</h1>
    <div className="weather-app">

      <form onSubmit={handlesubmit} className="search-form">
        <input
          placeholder="MUMBAI"
          type="text"
          value={formdata}
          onChange={handleFormData}
          className="search-bar"
        />
        <button type="submit" className="search-button"><i style={{ color: "white", fontSize: "2.5rem" }} class="fa-solid fa-location-crosshairs"></i></button>
      </form>

      {weatherData && (
        <div className="weather-container">
          <img
            src={`/images/${weatherImage()}.png`}
            alt={weatherImage()}
            className="weather-icon"
          />
          <p className="temperature">{weatherData.main.temp} °C</p>
          <h2 className="city-name">{weatherData.name.toUpperCase()}</h2>
          <div className="additional-info">
            <div className="info-item">
              <img src="/images/humidity.png" alt="Humidity" className="info-icon" />
              <div><p>{weatherData.main.humidity} %</p>
                <span>HUMIDITY</span></div>
            </div>
            <div className="info-item">
              <img src="/images/wind.png" alt="Wind Speed" className="info-icon" />
              <div>
                <p>{weatherData.wind.speed} KM/H</p>
                <span>WIND SPEED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </>

  );
};

export default App;
