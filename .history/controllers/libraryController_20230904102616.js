// import bookModel from libraryModel
const bookModel = require('../models/libraryModel');

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
	bookModel.create(req.)
	console.log('You made a POST request: ', req.body);
	res.send({
		type: 'POST',
        title: req.body.title,
		author: req.body.author
	})
};

//PUT - Update a book
exports.update = function (req, res) {
	res.send({type: 'PUT'});
};

//DELETE - Delete a book
exports.delete = function (req, res) {
    res.send({type: 'DELETE'});
};