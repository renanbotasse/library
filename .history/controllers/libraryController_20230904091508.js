exports.test = function (req, res) {
	res.send('Hello! Test 1, 2, 3');
};


//List all books
exports.details = function (req, res) {
	res.send({type: 'GET'});
};

