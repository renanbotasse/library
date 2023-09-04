exports.test = function (req, res) {
	res.send('Hello! Test 1, 2, 3');
};

//GET - List all books
exports.all = function (req, res) {
	res.send({type: 'GET'});
};

//POST - Create a book
exports.create = function (req, res) {
	console.log('You made a POST request: ', req.body);
	res.send({
		type: 'POST',
        name: req.body.name,
		author: req.body.author});
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