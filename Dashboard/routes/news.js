const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/berita", ensureAuthenticated, bpmjRole, beritaController.getAllBerita);
router.get("/berita/add", ensureAuthenticated, bpmjRole, beritaController.getAddBerita);
router.post("/berita/add", ensureAuthenticated, bpmjRole, beritaController.postAddBerita);
router.get("/berita/edit/:id", ensureAuthenticated, bpmjRole, beritaController.getEditBerita);
router.post("/berita/edit/:id", ensureAuthenticated, bpmjRole, beritaController.postEditBerita);
router.post("/berita/delete/:id", ensureAuthenticated, bpmjRole, beritaController.postDeleteBerita);

module.exports = router;
