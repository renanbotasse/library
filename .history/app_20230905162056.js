//link express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config .env file
dotenv.config();

//start express
const app = express();

// Config ejs (view engine)
app.set("view engine", "ejs");

// Create client static files (/public/assets)
app.use(express.static("public"));

//MongoDB connection
let mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@cluster0.7796qkc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);

//MongoDB connection Confirmation
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

//MongoDB connection Error
mongoose.connection.on("error", (err) => {
  console.log("Database Error" + err);
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//MIDDLEWARE START----------------------------------------------------------------
//active json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//valid end point - start with /library
const routes = require("./routes/libraryRoute");
app.use("/library", routes);

app.get("/", (req, res) => {

//error handler for middleware
app.use(function (err, req, res, next) {
  console.log(err);
  //Change the status (res.status(422)
  res.status(422).send({ error: err.message });
});

//MIDDLEWARE END-------------------------------------------------------------------

//create server port
let port = 8000;

//start server
app.listen(process.env.PORT || port, () => {
  console.log("Server running on port" + port);
});
