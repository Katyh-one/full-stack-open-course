export const Countries = ({ countries, handleShowDetails }) => {
  console.log(countries);
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca2}>
          <p>
            {country.name.common}
            <button onClick={() => handleShowDetails(country.name.common)}>show</button>
          </p>          
        </div>
      ))}
    </div>
  );
};