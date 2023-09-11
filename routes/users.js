const express = require("express");
const router = express.Router();

// import controller 'usersController'
const usersController = require("../controllers/usersController");

// render  Login-Page
router.get("/login", usersController.GETlogin);

// render  Register-Page
router.get("/register", usersController.GETregister);

// register in BD
router.post("/register", usersController.POSTregister);

// render Post to Login
router.post("/login", usersController.POSTlogin);

// logout
router.get("/logout", usersController.logout);

module.exports = router;
