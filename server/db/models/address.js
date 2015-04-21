var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	address: String,
	city: String,
	state: String,
	phone: String,
	zip: String
});

module.exports = schema;