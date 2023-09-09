const express = require("express");
const router = express.Router();

// importa a propriedade do objeto anónimo de '../config/auth'
const { ensureAuthenticated } = require('../config/auth');

const indexController = require("../controllers/indexController");

// index-route (Home-page)
router.get("/", indexController.index);
// create-route
router.get("/create", indexController.create);





module.exports = router;
