import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const cities = ["2660717", "6690660", "2643741", "6455273"];

  return (
    <div className="App">
      {cities.map((city, index) => (
        <CityCard key={index} cityID={city} />
      ))}
    </div>
  );
}

function CityCard({ cityID }) {
  // const cityID = "2660717"; // Canton de Fribourg
  // const cityID = "6690660"; // Fort de France
  // const cityID = "2643741"; // London
  //const cityID = "6455273"; // Amiens

  //const cityID = props.cityID;

  const apiKey = process.env.WEATHER_API_KEY;

  const units = {
    celsius: {
      code: "metric",
      label: "Celsisus",
      abbr: "°C"
    },
    fahrenheit: {
      code: "imperial",
      label: "Fahrenheit",
      abbr: "°F"
    }
  };

  const temperatureCode = "celsius";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?id=" +
    cityID +
    "&units=" +
    units.celsius.code +
    "&APPID=" +
    apiKey;

  const response = useFetch(url, {});

  if (response === null) {
    return <div>Loading ...</div>;
  }

  const cityName = `${response.name}, ${response.sys.country}`;

  const temperature = `${response.main.temp} ${units[temperatureCode].abbr}`;

  const weather = response.weather[0];
  const weatherDescription = `${weather.main} - ${weather.description}`;
  const weatherIcone =
    "http://openweathermap.org/img/w/" + weather.icon + ".png";
  const weatherAlt = weather.description;

  return (
    <div className="city-card">
      <div id="city-name">{cityName}</div>
      <div id="temperature">{temperature}</div>
      <div id="weather">{weatherDescription}</div>
      <img src={weatherIcone} alt={weatherAlt} />
    </div>
  );
}

function useFetch(url, options) {
  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(url, options);
      const json = await response.json();

      setResponse(json);
    }
    fetchData();
  }, []);

  return response;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
