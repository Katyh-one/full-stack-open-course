export const Weather = ({ weather }) => {
  if (!weather || !weather.hourly) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h4>Temperature through the day:</h4>
      <ul>
        {weather.hourly.temperature_2m.slice(0, 24).map((temp, index) => (
          <li key={index}>
            {new Date(weather.hourly.time[index]).toLocaleString()}: {temp} °C
          </li>
        ))}
      </ul>
    </div>
  );
};
