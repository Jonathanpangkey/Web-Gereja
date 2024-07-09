const express = require("express");
const router = express.Router();
const kolomController = require("../controllers/kolomController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/kolom", ensureAuthenticated, bpmjRole, kolomController.getAllKolom);
router.get("/kolom/add", ensureAuthenticated, bpmjRole, kolomController.getAddKolom);
router.post("/kolom/add", ensureAuthenticated, bpmjRole, kolomController.postAddKolom);
router.get("/kolom/edit/:id", ensureAuthenticated, bpmjRole, kolomController.getEditKolom);
router.post("/kolom/edit/:id", ensureAuthenticated, bpmjRole, kolomController.postEditKolom);
router.post("/kolom/delete/:id", ensureAuthenticated, bpmjRole, kolomController.postDeleteKolom);

module.exports = router;
