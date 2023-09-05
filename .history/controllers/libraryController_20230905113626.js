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
exports.create = function (req, res, next) {
	//create a new book on the DB and return it
	const newBook = new Book(req.body);
	newBook
	.save()
	.then(function (book) {
		res.status(201).send(book);
	})
	.catch(next);
};

//PUT - Update a book
exports.update = function (req, res) {
	
	res.send({type: 'PUT'});
};

//DELETE - Delete a book
exports.delete = function (req, res, next) {
	//'_id' = id inside DB || 'req.params.id'= return ID 
	// You can use the model Book (mongoose) to delete, don't need to create a newBook
	Book.findByIdAndRemove({_id: req.params.id})
	.then(function(book){
		res.send(book);
	})
	.catch(next);	
	};