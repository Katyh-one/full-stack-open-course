import { useState, useEffect } from 'react';
import { Numbers } from './components/Numbers';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import personsService from './services/persons';
import { Notification } from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567', id: 1 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    console.log('effect');
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);


  const addPerson = event => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(p => p.name === newName);
        if (person) {
          const updatedPerson = { ...person, number: newNumber };

          personsService.update(person.id, updatedPerson).then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)));
            setNewName('');
            setNewNumber('');
            setErrorMessage(`Updated ${returnedPerson.name}'s number`);
            setColor('green');
            setTimeout(() => {
              setErrorMessage(null);
            }, 10000);
          }).catch(() => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 10000);
            setPersons(persons.filter(p => p.id !== person.id));
            setColor('red');
          });
          return;
        }
      }
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    };
    personsService.create(nameObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setColor('green');
      setErrorMessage(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    });
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handlePersonRemoval = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage} color={color} />}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new name to the phonebook</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Stored Numbers</h3>
      <Numbers persons={filteredPersons} handleRemoval={handlePersonRemoval} />
    </div>
  );
};

export default App;
