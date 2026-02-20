require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).send({ error: 'name or number must be unique' });
  }
  next(error);
};

app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);

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
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  // takes the body of the request transforms to js object then attaches body property to request object before route handler is called

  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = body.name;
      person.number = body.number;

      return person.save().then(updatedPerson => {
        response.json(updatedPerson);
      });
    })
    .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
