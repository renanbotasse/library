const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the type Book Schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'NEED TITLE']
  },
  author: {
    type: String,
    required: [true, 'NEED AUTHOR']
  },
  year: {
    type: Number,
    required: [true, 'NEED TITLE']
  },
  pages: {
    type: Number,
    required: true,
  },
});

//Create the model Book
const Book = mongoose.model("Book", bookSchema);

//Exports the model as a variable
module.exports = Book;
