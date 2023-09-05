// import bookModel from libraryModel
const Book = require("../models/libraryModel");

exports.newBook = function (req, res) {
  res.render("createBook");
};

exports.find = function (req, res) {
  res.render("findBook");
};

// GET - List all books (MY-LIBRARY)
exports.all = function (req, res, next) {
  //find() call all the books in the DB and res.send(book) send all books back
  Book.find()
    .then(function (book) {
      res.render("readView", { books: book });
    })
    .catch(next);
};

// GET - Get one book by a specific query parameter (e.g., title, author, year, or pages)
exports.oneBook = function (req, res, next) {
  // Initialize an empty query object
  const query = {};

  // Iterate through the valid query parameters
  ["title", "author", "year", "pages"].forEach((param) => {
    // Check if the query parameter is provided and has a non-empty value
    if (req.query[param]) {
      query[param] = req.query[param];
    }
  });

  // Check if there are any valid query parameters
  if (Object.keys(query).length === 0) {
    return res.status(400).json({ error: "No valid query parameters provided" });
  }

  // Search for books based on the specified query parameters and values
  Book.find(query)
    .then(function (books) {
      if (!books || books.length === 0) {
        res.status(404).json({ error: "Books not found" });
      } else {
        res.render("readView", { books: books }); // Render the view with matching books
      }
    })
    .catch(next);
};
  
  
  
//POST - Create a book
exports.create = function (req, res, next) {
  //create a new book on the DB and return it
  //Start the variables with req.body
  let title = req.body.title;
  let author = req.body.author;
  let year = req.body.year;
  let pages = req.body.pages;
  //Create a variable with the model Book (mongoose)
  let data = {
    title: title,
    author: author,
    year: year,
    pages: pages,
  };
  //Create the new Book in the DB
  Book.create(data)
    .then(function (book) {
      res.redirect("/library/read");
    })
    .catch(next);
};

//GET - Edit a book
exports.edit = function (req, res, next) {
  Book.findOne({ _id: req.params.id })
    .then(function (book) {
      res.render("editBook", { book: book });
    })
    .catch(next);
};

//PUT - Update a book
exports.update = function (req, res, next) {
  //Find by ID and use the req.body to update
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body)
    //Find the book by ID again and return the book updated
    .then(function () {
      Book.findOne({ _id: req.params.id }).then(function (book) {
        res.redirect("/library/read");
      });
    })
    .catch(next);
};

//DELETE - Delete a book
// DELETE - Delete a book
// DELETE - Delete a book
exports.delete = function (req, res, next) {
  // '_id' = id inside DB || 'req.params.id' = return ID
  // You can use the model Book (mongoose) to delete, don't need to create a newBook
  // The findOneAndDelete works with mongoose
  Book.findOneAndDelete({ _id: req.params.id })
    .then(function (book) {
      console.log("Registo eliminado com sucesso!"); // Logging the success message
      res.redirect("/library/read"); // Redirecting to the "/library/read" page
    })
    .catch(next);
};
