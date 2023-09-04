//link express
const express = require('express');

//start express
const app = express();

//create server port
let port = 5000;


//create server port
app.listen(process.env.PORT || port, () => {
	console.log('Server running on port'+ port);
});