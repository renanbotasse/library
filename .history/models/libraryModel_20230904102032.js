const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the type Book Schema
const bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
        required: true
	},
	year: {
		type: Number,
        required: true
	},
	pages: {
		type: Number,
	}});

//Create the model Book
const newBook = mongoose.model('Book', bookSchema);


//expor
module.exports = newBook;