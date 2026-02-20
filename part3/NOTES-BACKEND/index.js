// imprts nodes built in web server module
// const http = require('http');
require('dotenv').config();
const express = require('express');
const Note = require('./models/note');

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

  next(error);
};

app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);

// let notes = [];
// return hardcoded data in json format to any request made to the server
// request contains all info about http request
// response contains methods used to send response back to client
app.get('/', (request, response) => {
  // send method on response object to send response back to client
  response.send('<h1>Hello Full Stack!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      next(error);
    });
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

app.post('/api/notes', (request, response) => {
  // takes the body of the request transforms to js object then attaches body property to request object before route handler is called
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    // id: generateId()
  });

  note.save().then(savedNote => {
    response.json(savedNote);
  });
});

// creates server that responds with "Hello Full Stack!" to all requests
// event handler function takes request and response objects as arguments
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello Full Stack!');
// });
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body;
  // note to be updated fetched from db
  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end();
      }
      //  if note found update content and important properties with values from request body and save updated note to db
      note.content = content;
      note.important = important;

      return note.save().then(updatedNote => {
        response.json(updatedNote);
      });
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(unknownEndpoint);
app.use(errorHandler);

// binding the http server to the app listening for requests sent to port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
