const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoriController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/kategori", ensureAuthenticated, bpmjRole, kategoriController.getAllKategori);
router.get("/kategori/add", ensureAuthenticated, bpmjRole, kategoriController.getAddKategori);
router.post("/kategori/add", ensureAuthenticated, bpmjRole, kategoriController.postAddKategori);
router.get("/kategori/edit/:id", ensureAuthenticated, bpmjRole, kategoriController.getEditKategori);
router.post("/kategori/edit/:id", ensureAuthenticated, bpmjRole, kategoriController.postEditKategori);
router.post("/kategori/delete/:id", ensureAuthenticated, bpmjRole, kategoriController.postDeleteKategori);

module.exports = router;
