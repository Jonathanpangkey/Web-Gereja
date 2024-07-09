const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../middlewares/auth");
const berandaController = require("../controllers/berandaController");

router.get("/", ensureAuthenticated, berandaController.getBeranda);

module.exports = router;
