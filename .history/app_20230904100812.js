//link express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config .env file
dotenv.config();

//start express
const app = express();

//MongoDB connection
let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB)

//active json parser
app.use(express.json());

//bad end point
app.get('/', function(req, res) {
  res.send("BAD END POINT");
});

//valid end point - start with /library
const routes = require('./routes/libraryRoute');
app.use('/library', routes);

//create server port
let port = 8000;

//start server
app.listen(process.env.PORT || port, () => {
  console.log('Server running on port' + port);
});
