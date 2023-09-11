// import bookModel from libraryModel
const Book = require("../models/libraryModel");

exports.newBook = function (req, res) {
  res.render("createBook");
};

exports.find = function (req, res) {
  res.render("findBook");
};

exports.homeLibrary = function (req, res) {
  res.render("homeLibrary");
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
    return res.render("findBook");
  }

  // Search for books based on the specified query parameters and values
  Book.find(query)
    .then(function (books) {
      if (!books || books.length === 0) {
        res.render("findBook");
      } else {
        res.render("readView", { books: books }); // Render the view with matching books
      }
    })
    .catch(next);
};

//POST - Create a book
exports.create = function (req, res) {
  // Extract data from the request body
  let title = req.body.title;
  let author = req.body.author;
  let year = req.body.year;
  let pages = req.body.pages;

  // Error variable
  let errors = [];

  // Check if all fields are filled
  if (!title || !author || !year || !pages) {
    errors.push({ msg: "Please enter all fields" });
  }

  // If there are errors, render the createBook page with errors
  if (errors.length > 0) {
    res.render("createBook", {
      errors,
      title,
      author,
      year,
      pages,
    });
  } else {
    // Check if the book already exists
    Book.findOne({ title: title }).then((existingBook) => {
      if (existingBook) {
        errors.push({ msg: "Book already exists" });
        res.render("createBook", {
          errors,
          title,
          author,
          year,
          pages,
        });
      } else {
        // Create a new book
        const newBook = new Book({
          title,
          author,
          year,
          pages,
        });

        // Save the new book to the database
        newBook
          .save()
          .then((book) => {
            // Redirect to the appropriate page or show a success message
            // For example, you can redirect to the book's details page
            res.redirect("/library/read");
          })
          .catch((err) => {
            console.log(err);
            // Handle the error appropriately
            res.render("createBook", {
              errors,
              title,
              author,
              year,
              pages,
            });
          });
      }
    });
  }
};

//GET - Edit a book
exports.edit = function (req, res, next) {
  Book.findOne({ _id: req.params.id })
    .then(function (book) {
      res.render("editBook", { book: book });
    })
    .catch(next);
};

// PUT - Update a book
exports.update = function (req, res, next) {
  // Extract the updated book details from the request body
  const { title, author, year, pages } = req.body;

  // Check if any of the fields are empty
  if (!title || !author || !year || !pages) {
    // Render the edit page again with the existing book details and an error message
    return Book.findById(req.params.id)
      .then(function (book) {
        res.render("editBook", {
          book: book,
          error: "All fields must be filled.",
        });
      })
      .catch(next);
  }

  // Find and update the book by ID
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      // Find the updated book by ID and return the book updated
      Book.findById(req.params.id)
        .then(function (book) {
          res.redirect("/library/read");
        })
        .catch(next);
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
