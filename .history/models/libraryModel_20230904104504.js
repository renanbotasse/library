const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the type Book Schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
});

//Create the model Book
const bookModel = mongoose.model("bookModel", bookSchema);

//Exports the model as a variable
module.exports = bookModel;
