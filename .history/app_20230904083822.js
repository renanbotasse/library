//link express
const express = require('express');

//start express
const app = express();

//create server
let port = 5000;

app.listen(process.env.PORT || port, () => {
	console.log('Server running)