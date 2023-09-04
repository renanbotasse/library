const express = require('express');
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require('../controllers/libraryController.js');

// route (url) to test (http://localhost:5000/library/test)
router.get('/test', libraryController.test);

// ALL - route to get all books (http://localhost:5000/library/all)
router.get('/all', libraryController.all)

// ADD - route to add a book (http://localhost:5000/library/add)


// route to update a book (http://localhost:5000/library/update/:id)

// route to delete a book (http://localhost:5000/library/delete/:id)


module.exports = router;