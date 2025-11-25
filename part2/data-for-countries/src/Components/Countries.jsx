export const Countries = ({ countries, handleShowDetails }) => {
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
