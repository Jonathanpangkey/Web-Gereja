const express = require("express");
const router = express.Router();
const jadwalController = require("../controllers/jadwalController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/jadwal", ensureAuthenticated, bpmjRole, jadwalController.getAllJadwal);
router.get("/jadwal/add", ensureAuthenticated, bpmjRole, jadwalController.getAddJadwal);
router.post("/jadwal/add", ensureAuthenticated, bpmjRole, jadwalController.postAddJadwal);
router.get("/jadwal/edit/:id", ensureAuthenticated, bpmjRole, jadwalController.getEditJadwal);
router.post("/jadwal/edit/:id", ensureAuthenticated, bpmjRole, jadwalController.postEditJadwal);
router.post("/jadwal/delete/:id", ensureAuthenticated, bpmjRole, jadwalController.postDeleteJadwal);

module.exports = router;
