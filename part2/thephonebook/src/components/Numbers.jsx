export const Numbers = ({ persons, handleRemoval }) => {
  return (
    <div>
      {persons.map((person) => (
        <>
        <p key={person.id}>
          {person.name} {person.number}
        </p>
        <button id="windowButton" onClick={() => handleRemoval(person.id)}>delete</button>
        </>
      ))}
    </div>
  );
}