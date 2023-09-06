const express = require("express");
const router = express.Router();
// importa controlador: 'usersController'
const usersController = require("../controllers/usersController");
// render da Login-Page
router.get("/login", usersController.GETlogin);
// render da Register-Page
router.get("/register", usersController.GETregister);
// registo na BD
router.post("/register", usersController.POSTregister);
// render Post to Login
router.post("/login", usersController.POSTlogin);

// logout
router.get('/logout', usersController.logout);

router.get("/dashboard", usersController.GETdashboard);

module.exports = router;
