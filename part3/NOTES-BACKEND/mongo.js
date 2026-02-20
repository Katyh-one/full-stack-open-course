// mongo db code for notes app
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

console.log('connecting to MongoDB...', password);

const url = `mongodb+srv://katyhatch_db_user:${password}@cluster0.kov47k1.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set('strictQuery', false);

// family 4 means use IPv4
mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

// Note model constructor function creating new js object based on params
// const note = new Note({
//   content: 'almost the weekend',
//   important: true
// });

// saving note to db provided with an event handler with then method
// note.save().then(result => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

// search query empty so returns all notes in db
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
