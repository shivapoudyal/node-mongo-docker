const { Schema, model } = require('mongoose');

const shivaSchema = new Schema({
  name: String,
  movie_name: String,
  desig: String
});

const mySchema = model('shiva_collection', shivaSchema);

module.exports = mySchema;
