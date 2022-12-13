
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import image from "./img/ryan-faulkner-hogg-7M8HX6MaVWY-unsplash.jpg";

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
    <div className="App"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat'
      }}>
      <div className='card'>
        <h1>Weather App</h1>
        <i class="fa-solid fa-location-dot" style={{ color: '#C9202F', fontSize: 30 }}></i>
        <h2>{weather.name}</h2>
        <div className='cardColumns'>
          <div className='cardColumn-1'>
            <div className='weather'>
              <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            </div>
            <div className='temp'>
              {/*  ºC = ºK-273.15*/}
              <p style={{ textAlign: 'center', fontWeight: 800 }}>
                {isCelsius ? Math.trunc(weather.main?.temp - 273.15) : fahrenheit} {""}
                {isCelsius ? " ºC" : " ºF"}
              </p>
              <p style={{ textTransform: 'capitalize', textAlign: 'center' }}>"{weather.weather?.[0].description}"</p>
              <p><samp>Day: </samp>{moment().format('dddd')}</p>
              <p><samp>Date: </samp>{moment().format('LL')}</p>
            </div>
          </div>

          <div className='cardColumn-2'>
            <section>
              <article className=''>
                <div className='container'>
                  <p>
                    <i class="fa-solid fa-wind" style={{ color: '#EEEEEE' }}></i>
                    <samp>Wind speed:</samp> {weather.wind?.speed} m/s
                  </p>
                </div>
                <div className='container'>
                  <p>
                    <i class="fa-brands fa-cloudflare" style={{ color: '#B0BEC5' }}></i>
                    <samp>Clouds: </samp> {weather.clouds?.all}%
                  </p>
                </div>
                <div className='container'>
                  <p>
                    <i class="fa-solid fa-droplet" style={{ color: '#2196F3' }}></i>
                    <samp>Humidity:</samp> {weather.main?.humidity}
                  </p>
                </div>
              </article>
              <article className=''>
                <div className='container'>
                  <p>
                    <i class="fa-solid fa-temperature-full" style={{ color: '#0D47A1' }}></i>
                    <samp>Pressure:</samp> {weather.main?.pressure} mb
                  </p>
                </div>
                <div className='container'>
                  <p>
                    <i class="fa-solid fa-temperature-arrow-up" style={{ color: '#0D47A1' }}></i>
                    <samp>Temp_max: </samp>
                    {isCelsius ? Math.trunc(weather.main?.temp_max - 273.15) : fahrenheit} {""}
                    {isCelsius ? " ºC" : " ºF"}
                  </p>
                </div>
                <div className='container'>
                  <p>
                    <i class="fa-solid fa-temperature-arrow-down" style={{ color: '#0D47A1' }}></i>
                    <samp>Temp_min: </samp>
                    {isCelsius ? Math.trunc(weather.main?.temp_min - 273.15) : fahrenheit} {""}
                    {isCelsius ? " ºC" : " ºF"}
                  </p>
                </div>
                <div className='btn'>
                  <button onClick={() => setIsCelsius(!isCelsius)}>
                    Change
                    {isCelsius ? " ºF" : " ºC"}
                  </button>
                </div>
              </article>
            </section>

          </div>
        </div>

        <footer>
          © Anderson Durán
        </footer>
      </div>
    </div>
  )
}

export default App
