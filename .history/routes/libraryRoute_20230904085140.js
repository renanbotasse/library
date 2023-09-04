const express = require('express');
const router = express.Router();

// import controller libraryController.js from /controllers
const libraryController = require('../controllers/libraryController.js');

// route (url) to test (http://localhost:5000/library/test)
router.get('/', (req, res) => {
    res.render('library');
});