
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);

  const celsius = weather.main?.temp - 273.15;
  let fahrenheit = (1.8 * celsius);

  fahrenheit = Math.trunc(fahrenheit) + 32;

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5f6830bc94a92b5b52bdf8c626cde505`)
        .then(res => setWeather(res.data));
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(weather);

  return (
    <div className="App">
      <div className='card'>
        <h1>Weather App</h1>
        <div className='location'>
          <i class="fa-solid fa-magnifying-glass-location"></i>
          <h2>{weather.name}</h2>
        </div>
        <div className='weather'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        </div>
        <div className='temp'>
          {/*  ºC = ºK-273.15*/}
          <p>
            {isCelsius ? Math.trunc(weather.main?.temp - 273.15) : fahrenheit} {""}
            {isCelsius ? " ºC" : " ºF"}
          </p>
          <br />
          <p>"{weather.weather?.[0].description}"</p>
        </div>

        <section>
          <article className=''>
            <div className='container'>
              <i class="fa-solid fa-wind"></i>
              <p><samp>Wind speed:</samp> {weather.wind?.speed} m/s</p>
            </div>
            <div className='container'>
              <i class="fa-brands fa-cloudflare"></i>
              <p><samp>Clouds:</samp> {weather.clouds?.all}%</p>
            </div>
            <div className='container'>
              <i class="fa-solid fa-droplet"></i>
              <p><samp>Humidity:</samp> {weather.main?.humidity}</p>
            </div>
          </article>
          <article className=''>
            <div className='container'>
              <i class="fa-solid fa-temperature-full"></i>
              <p><samp>Pressure:</samp> {weather.main?.pressure} mb</p>
            </div>
            <div className='container'>
              <p>
                <i class="fa-solid fa-temperature-arrow-up"></i>
                <samp>Temp_max:</samp>
                {isCelsius ? Math.trunc(weather.main?.temp_max - 273.15) : fahrenheit} {""}
                {isCelsius ? " ºC" : " ºF"}
              </p>
            </div>
            <div className='container'>
              <p>
                <i class="fa-solid fa-temperature-arrow-down"></i>
                <samp>Temp_min:</samp>
                {isCelsius ? Math.trunc(weather.main?.temp_min - 273.15) : fahrenheit} {""}
                {isCelsius ? " ºC" : " ºF"}
              </p>
            </div>
          </article>
        </section>
        <br />
        <button onClick={() => setIsCelsius(!isCelsius)}>
          Change ºC | ºF
        </button>
        <footer>
          Anderson Durán
        </footer>
      </div>
    </div>
  )
}

export default App
