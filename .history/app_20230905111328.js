//link express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config .env file
dotenv.config();

//start express
const app = express();

//MongoDB connection
let mongoDB = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.7796qkc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

//MongoDB connection Confirmation
mongoose.connection.on('connected', () => {
	console.log('Connected to MongoDB');
});

//MongoDB connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error' + err);
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//active json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//bad end point
app.get('/', function(req, res) {
  res.send("BAD END POINT");
});

//valid end point - start with /library
const routes = require('./routes/libraryRoute');
app.use('/library', routes);

//error handler for middleware
app.use(function(err, req, res, next))


//create server port
let port = 8000;

//start server
app.listen(process.env.PORT || port, () => {
  console.log('Server running on port' + port);
});
