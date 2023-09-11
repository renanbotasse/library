const express = require("express");
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require("../controllers/libraryController.js");

// import auth
const { ensureAuthenticated } = require("../config/auth");

// TEST ('GET') - route (url) to test (http://localhost:5000/library/test)
router.get("/newBook", ensureAuthenticated, libraryController.newBook);

// ALL ('GET') - route to get all books (http://localhost:5000/library/my-library)
router.get("/read", ensureAuthenticated, libraryController.all);

// ONE BOOK ('GET') - route to get one Book book (http://localhost:5000/library/oneBook)
router.get("/find", ensureAuthenticated, libraryController.find);

// ONE BOOK ('GET') - route to get one Book book (http://localhost:5000/library/oneBook)
router.get("/oneBook", ensureAuthenticated, libraryController.oneBook);

// CREATE ('POST')- route to add a book (http://localhost:5000/library/create)
router.post("/createBook", ensureAuthenticated, libraryController.create);

// EDIT ('GET')- route to update a book (http://localhost:5000/library/edit)
router.get("/edit/:id", ensureAuthenticated, libraryController.edit);

// UPDATE ('PUT')- route to update a book (http://localhost:5000/library/update/:id)
router.post("/update/:id", ensureAuthenticated, libraryController.update);

// DELETE ('DELETE') - route to delete a book (http://localhost:5000/library/delete/:id)
router.get("/delete/:id", ensureAuthenticated, libraryController.delete);

// HOME ('GET') - route to get all books (http://localhost:5000/library/home
router.get("/home", ensureAuthenticated, libraryController.homeLibrary);

module.exports = router;
