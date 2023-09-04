exports.test = function (req, res) {
	res.send('Hello! Test 1, 2, 3');
};


//GET - List all books
exports.details = function (req, res) {
	res.send({type: 'GET'});
};

//POST - Add a book
exports.add = function (req, res) {
    res.send({type: 'POST'});
};

//PUT - Update a book
exports.update = function (req, res) {
	res.send({type: 'PUT'});
};

//DELETE - Delete a book
exports.delete = function (req, res) {
    res.send({type: 'DELETE'});
};