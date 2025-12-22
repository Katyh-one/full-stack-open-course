// imprts nodes built in web server module
// const http = require('http');

const express = require('express');
// const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(cors());
app.use(express.static('dist'))

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
];
// return hardcoded data in json format to any request made to the server
// request contains all info about http request
// response contains methods used to send response back to client
app.get('/', (request, response) => {
  // send method on response object to send response back to client
  response.send('<h1>Hello Full Stack!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id);
  //   checks if note exists and sends it as json response
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

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

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  };

  notes = notes.concat(note);

  console.log(note);
  response.json(note);
});

// creates server that responds with "Hello Full Stack!" to all requests
// event handler function takes request and response objects as arguments
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello Full Stack!');
// });

// binding the http server to the app listening for requests sent to port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
