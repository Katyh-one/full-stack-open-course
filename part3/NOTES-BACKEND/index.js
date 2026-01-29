// imprts nodes built in web server module
// const http = require('http');
require('dotenv').config();
const express = require('express');
const Note = require('./models/note');

const app = express();
app.use(express.json());

app.use(express.static('dist'))

let notes = [];
// return hardcoded data in json format to any request made to the server
// request contains all info about http request
// response contains methods used to send response back to client
app.get('/', (request, response) => {
  // send method on response object to send response back to client
  response.send('<h1>Hello Full Stack!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
  response.json(notes)
  })
}); 

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
};

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
    id: generateId()
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

// binding the http server to the app listening for requests sent to port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
