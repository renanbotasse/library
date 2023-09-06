const express = require("express");
const router = express.Router();
// importa controlador: 'usersController'
const usersController = require("../controllers/usersController");
// render da Login-Page
router.get("/login", usersController.login);
// render da Register-Page
router.get("/register", usersController.GETregister);
// registo na BD
router.post("/register", usersController.POSTregister);
module.exports = router;
