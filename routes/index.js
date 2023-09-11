const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// index-route (Home-page)
router.get("/", indexController.index);

module.exports = router;
