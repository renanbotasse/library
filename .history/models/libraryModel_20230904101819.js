const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Book Schema
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
        

		"author": "Dante Alighieri",
		"country": "Italy",
		"imageLink": "images/the-divine-comedy.jpg",
		"language": "Italian",
		"link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
		"pages": 928,
		"title": "The Divine Comedy",
		"year": 1315
	  },