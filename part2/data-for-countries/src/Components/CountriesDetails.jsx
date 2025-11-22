import { Weather } from './Weather';

export const CountriesDetails = ({ country, weather }) => {
  console.log('weather data:', weather);
  console.log('country details:', country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>Weather</h3>
      <Weather weather={weather} />
    </div>
  );
};
