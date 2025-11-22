import { useState, useEffect } from 'react';
import { Filter } from './Components/Filter';
import { Countries } from './Components/Countries';
import { CountriesDetails } from './Components/CountriesDetails';
import countryService from './services/countries';
import { getWeatherByLongLat } from './services/weather';

function App() {
  const [filter, setFilter] = useState('');
  const [country, setCountry] = useState([]);
  const [weather, setWeather] = useState('');

  useEffect(() => {
    console.log('effect');
    countryService.getAll().then(initialCountries => {
      setCountry(initialCountries);
      getWeatherByLongLat(60.16952, 24.93545).then(data => {
        console.log('Fetched weather data:', data);
        setWeather(data);
      });
    });
  }, []);

  const countriesToShow = country.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const selectedCountry = countriesToShow.length === 1 ? countriesToShow[0] : null;

  useEffect(() => {
    if (selectedCountry?.latlng) {
      const [lat, long] = selectedCountry.latlng;
      getWeatherByLongLat(lat, long).then(weatherData => {
        setWeather(weatherData);
        console.log('Weather data:', weatherData);
      });
    }
  }, [selectedCountry]);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleShowDetails = countryName => {
    setFilter(countryName);
  };

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesToShow.length > 1 && countriesToShow.length <= 10 && (
        <Countries countries={countriesToShow} handleShowDetails={handleShowDetails} />
      )}
      {countriesToShow.length === 1 && (
        <CountriesDetails country={countriesToShow[0]} weather={weather} />
      )}
    </>
  );
}

export default App;
