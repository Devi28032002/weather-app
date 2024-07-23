import React, { useState } from 'react';
import './WeatherCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWind, faTint } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
 

  async function fetchData() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5217f3fe5c4725922dde7dd923ea5ab4`;
     
      
      let response = await fetch(url);
      let output = await response.json();

      if (response.ok) {
        setWeatherData(output);
        console.log(output);
        setError('');
      } else {
        setError('No data found');
      }
    } catch (error) {
      setError('Error fetching data');
    }
  }

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className='weather-cont'>
      <div className='search-bar'>
        <input type='text' value={city} onChange={handleOnChange} placeholder='Search...' />
        <FontAwesomeIcon icon={faSearch} className='search-icon' onClick={fetchData} />
        {/* <i className='fas fa-search' onClick={fetchData}></i> */}
      </div>
      <div className='weather-info'>
        {weatherData && (
          <>
            <p className='temperature'>{weatherData.main.temp}°C</p>
            <p className='location'>{weatherData.name}</p>
          </>
        )}
      </div>
      <div className='weather-data'>
        {weatherData && (
          <>
            <div className='col'>
              <FontAwesomeIcon icon={faTint} className='humi' />
              <p>{weatherData.main.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className='col'>
              <FontAwesomeIcon icon={faWind} className='wind' />
              <p>{weatherData.wind.speed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </>
        )}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherCard;
