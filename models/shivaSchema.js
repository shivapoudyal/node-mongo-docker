
var mongoose=require('mongoose');

var shivaSchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model(
	'student', shivaSchema, 'shiva_collection');
