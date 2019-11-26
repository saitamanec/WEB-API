const mongoose = require('mongoose');
const db = 'mongodb+srv://new:12345@cluster0-1pslv.mongodb.net/Dictionary?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const Dictionaryschema = mongoose.Schema({
  name: { type: String },
  def: { type: String }, 
  created: { type: String }
});

const Dictionary = mongoose.model('search', Dictionaryschema, 'search');

module.exports.Dictionary = Dictionary;
