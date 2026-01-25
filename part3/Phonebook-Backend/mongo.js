// mongo db code for notes app
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://katyhatch_db_user:${password}@clusterphonebook.yh5ryd5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterPhonebook`;

mongoose.set('strictQuery', false);

// family 4 means use IPv4
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3] || null;
const number = process.argv[4] || null;

if (name !== null && number !== null) {
const person = new Person({
  name: `${process.argv[3]}`,
  number: `${process.argv[4]}`
}) 
person.save().then(result => {
  console.log(`Added ${person.name} ${person.number} to phonebook!`)
  mongoose.connection.close()
})
};



// search query empty so returns all notes in db
Person.find({}).then(result => {
    console.log('phonebook:');
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
