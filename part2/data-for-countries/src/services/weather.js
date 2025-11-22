import axios from 'axios';
const baseUrl = 'https://api.open-meteo.com/v1/forecast?';

export const getWeatherByLongLat = (lat, long) => {
  const url = `${baseUrl}latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
  return axios.get(url).then(response => response.data);
};

export default { getWeatherByLongLat };
