import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function CityCard(props) {
  return (
    <div>
      <div id="city-name">{props.cityName}</div>
      <div id="temperature">{props.temperature}</div>
      <div id="weather">{props.weatherDescription}</div>
      <img src={props.weatherIcone} alt={props.weatherAlt} />
    </div>
  );
}

function App() {
  // const cityID = "2660717"; // Canton de Fribourg
  // const cityID = "6690660"; // Fort de France
  // const cityID = "2643741"; // London
  const cityID = "6455273"; // Amiens
  const apiKey = "ea8f83de16f4055af09a920d88e05ccd";

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
    <CityCard
      cityName={cityName}
      temperature={temperature}
      weatherDescription={weatherDescription}
      weatherIcone={weatherIcone}
      weatherAlt={weatherAlt}
    />
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
