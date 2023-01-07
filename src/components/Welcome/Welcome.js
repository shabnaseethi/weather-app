import React, { useState, useEffect } from "react";
import "../Welcome/Welcome.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
const api = {
  key: "f57b929bbc2d684f15fd9b48e4629b6a",
  base: "https://api.openweathermap.org/data/2.5/weather?",
};

function Welcome() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const getWeatherData = async (e, city) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(api.base + `q=${city}&appid=${api.key}`);
      setWeatherData({ data });
      setTemp(Math.round(data.main.temp - 273));
      setCity("");
    } catch (error) {
      throw error;
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };
  useEffect((e) => {
    getWeatherData(e, city);
  }, []);
  return (
    <div>
      <div className="home-container">
        <div className="box-container">
          <div className="city-card">
            <h3>Enter the city name....</h3>
          </div>
          <form onSubmit={(event) => getWeatherData(event, city)}>
            {" "}
            <div className="search-box">
              <input
                type="text"
                autoFocus
                onChange={(e) => setCity(e.target.value)}
                value={city}
              ></input>
              <button type="submit" className="submit-btn">
                {" "}
                <SearchIcon className="search-icon" />
              </button>
            </div>
          </form>
          {weatherData !== null ? (
            <div className="weather-details">
              <div className="city-name">
                <h3>{weatherData.data.name}</h3>
              </div>
              <div className="date">
                <h3>{dateBuilder(new Date())}</h3>
              </div>
              <div className="temp-details">
                <h3>{weatherData.data.weather[0].description}</h3>
              </div>
              <div className="temp">
                <h3>
                  {temp}
                  <span>&#8451;</span>
                </h3>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
