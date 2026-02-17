require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(express.static('dist'))

let persons = [];

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;
  response.send(info);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(p => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0;
  return Math.floor(Math.random() * maxId + 20).toString();
};

app.post('/api/persons', (request, response) => {
  // takes the body of the request transforms to js object then attaches body property to request object before route handler is called
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }
  if(persons.find(p => p.number === body.number)) {
    return response.status(400).json({
      error: 'number must be unique'
    });
  }
   
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
