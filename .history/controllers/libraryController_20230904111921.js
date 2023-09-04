// import bookModel from libraryModel
const Book = require('../models/libraryModel');

exports.test = function (req, res) {
	res.send('Hello! Test 1, 2, 3');
};

//GET - List all books
exports.all = function (req, res) {
	res.send({type: 'GET'});
};

//POST - Create a book
exports.create = function (req, res) {
	//create a new book on the DB and return it
	let newBook = new Book(req.body);
	newBook.save()
	.then((savedBook) => {
		console.log('Saved book:', savedBook);
		res.status(201).json(savedBook);
	)
    .catch((error) => {
		console.error('Error saving book:', error);
		// Send an error response with an error message and an appropriate status code
		res.status(500).json({ error: 'Error saving book' });
	  });
  };

//PUT - Update a book
exports.update = function (req, res) {
	res.send({type: 'PUT'});
};

//DELETE - Delete a book
exports.delete = function (req, res) {
    res.send({type: 'DELETE'});
};