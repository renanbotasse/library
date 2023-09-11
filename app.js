// link express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");


// Config .env file
dotenv.config();

// Start express
const app = express();

// Passaport configuration
require('./config/passport')(passport);

// MongoDB connection
let mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@cluster0.7796qkc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);

// MongoDB connection Confirmation
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// MongoDB connection Error
mongoose.connection.on("error", (err) => {
  console.log("Database Error: " + err);
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define '/views/layout' as main-layout (rendered in the root)
app.use(expressLayouts);

// Configure EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.static("public/img"));

// Error handler for middleware
app.use(function (err, req, res, next) {
  console.error(err);
  // Change the status (res.status(422))
  res.status(422).send({ error: err.message });
});

// Session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Valid endpoint - starting with /library
const libraryRoute = require("./routes/libraryRoute");
app.use("/library", libraryRoute);

const users = require("./routes/users");
const index = require("./routes/index");
app.use("/users", users);
app.use("/", index);



// Global variables middleware for flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes and other middleware


// Create server port
let port = 8000;

// Start server
app.listen(process.env.PORT || port, () => {
  console.log("Server running on port " + port);
});
