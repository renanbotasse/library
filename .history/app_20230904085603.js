//link express
const express = require('express');

//start express
const app = express();

app.get('/', function (req, res) {
	res.





//create server port
let port = 5000;

//start server
app.listen(process.env.PORT || port, () => {
	console.log('Server running on port'+ port);
});