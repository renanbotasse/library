//link express
const express = require('express');

//start express
const app = express();

//create server
let port = 5000;

app.listen(process.env.PORT || 5000, () => console.log(`Server)