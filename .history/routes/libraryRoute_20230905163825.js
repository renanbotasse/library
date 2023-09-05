const express = require('express');
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require('../controllers/libraryController.js');

// TEST ('GET') - route (url) to test (http://localhost:5000/library/test)
router.get('/test', libraryController.all);

// ALL ('GET') - route to get all books (http://localhost:5000/library/my-library)
router.get('/readAllBooks', libraryController.all);

// ONE BOOK ('GET') - route to get one Book book (http://localhost:5000/library/oneBook)
router.get('/oneBook', libraryController.oneBook);

// CREATE ('POST')- route to add a book (http://localhost:5000/library/create)
router.post('/create', libraryController.create);

// UPDATE ('PUT')- route to update a book (http://localhost:5000/library/update/:id)
router.put('/update/:id', libraryController.update);

// DELETE ('DELETE') - route to delete a book (http://localhost:5000/library/delete/:id)
router.delete('/delete/:id', libraryController.delete);

module.exports = router;