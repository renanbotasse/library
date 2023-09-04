const express = require('express');
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require('../controllers/libraryController.js');

// route (url) to test (http://localhost:5000/library/test)
router.get('/test', libraryController.test);

// route to get all books (http://localhost:5000/library/all)
router.get('/all', )

// route to 


module.exports = router;