// import bookModel from libraryModel
const Book = require('../models/libraryModel');

exports.test = function (req, res) {
	res.send('Hello! Test 1, 2, 3');
};

//GET - List all books
exports.all = function (req, res, next) {
	//find() call all the books in the DB and res.send(book) send all books back
	Book.find()
	.then(function(book){
		res.send(book);
	})
	.catch(next);		
};

//GET - Get one book by various criteria
exports.oneBook = function (req, res, next) {
	// Define an empty query object
	let query = {};
  
	// Check if an 'id' parameter is provided in the request query
	if (req.query.id) {
	  // If 'id' is provided, add it to the query
	  query._id = req.query.id;
	}
  
	// Check if 'title' parameter is provided in the request query
	if (req.query.title) {
	  // If 'title' is provided, add it to the query
	  query.title = req.query.title;
	}
  
	// Check if 'author' parameter is provided in the request query
	if (req.query.author) {
	  // If 'author' is provided, add it to the query
	  query.author = req.query.author;
	}
  
	// Check if 'year' parameter is provided in the request query
	if (req.query.year) {
	  // If 'year' is provided, add it to the query
	  query.year = req.query.year;
	}
  
	// Check if 'pages' parameter is provided in the request query
	if (req.query.pages) {
	  // If 'pages' is provided, add it to the query
	  query.pages = req.query.pages;
	}
  
	// Use the constructed query to find the book
	Book.findOne(query)
	  .then(function (book) {
		if (!book) {
		  // If no matching book is found, return a 404 response
		  res.status(404).json({ error: 'Book not found' });
		} else {
		  // If a matching book is found, send it as a response
		  res.status(200).json(book);
		}
	  })
	  .catch(next);
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
exports.update = function (req, res, next) {
	//Find by ID and use the req.body to update
	Book.findByIdAndUpdate({_id: req.params.id}, req.body)
	//Find the book by ID again and return the book updated
	.then(function(){
		Book.findOne({_id: req.params.id})
		.then(function(book){
			res.send(book);
		});
	})
	.catch(next);		
};

//DELETE - Delete a book
exports.delete = function (req, res, next) {
	//'_id' = id inside DB || 'req.params.id'= return ID 
	// You can use the model Book (mongoose) to delete, don't need to create a newBook
	// The findByIdAndRemove works with mongoose 
	Book.findByIdAndRemove({_id: req.params.id})
	.then(function(book){
		res.send(book);
	})
	.catch(next);	
	};