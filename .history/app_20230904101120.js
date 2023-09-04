//link express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config .env file
dotenv.config();

//start express
const app = express();

//MongoDB connection
let mongoDB = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@library.pbtanqs.mongodb.net/?';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
