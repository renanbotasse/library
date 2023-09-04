const express = require('express');
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require('../controllers/libraryController.js');

// TEST ('GET') - route (url) to test (http://localhost:5000/library/test)
router.get('/test', libraryController.test);

// ALL ('GET') - route to get all books (http://localhost:5000/library/all)
router.get('/all', libraryController.all)

// CREATE ('POST')- route to add a book (http://localhost:5000/library/add)
router.post('/create', libraryController.create);

// UPDATE ('PUT')- route to update a book (http://localhost:5000/library/update/:id)
router.put('/update/:id', libraryController.update);

// DELETE ('DELETE') - route to delete a book (http://localhost:5000/library/delete/:id)
router.delete('/delete/:id', libraryController.delete);

module.exports = router;