// import bookModel from libraryModel
const Book = require('../models/libraryModel');

exports.test = function (req, res) {
	res.render(');
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
	// The empty query object
	let query = {};
  
	// Array of valid query parameters
	const validParams = ['id', 'title', 'author', 'year', 'pages'];
  
	// Valid query parameters
	validParams.forEach(param => {
	  if (req.query[param]) {
		query[param] = req.query[param];
	  }
	});
	
	//Use the query to find the book
	Book.find(query)
	  .then(function (book) {
		if (!book) {
		  res.status(404).json({ error: 'Book not found' });
		} else {
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