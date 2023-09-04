const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Book Schema
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

//