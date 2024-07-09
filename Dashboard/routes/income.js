const express = require("express");
const router = express.Router();
const pemasukkanController = require("../controllers/pemasukkanController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/pemasukkan", ensureAuthenticated, pemasukkanController.getAllIncome);
router.get("/pemasukkan/add", ensureAuthenticated, pemasukkanController.getAddIncome);
router.post("/pemasukkan/add", ensureAuthenticated, pemasukkanController.postAddIncome);
router.get("/pemasukkan/edit/:id", ensureAuthenticated, bpmjRole, pemasukkanController.getEditIncome);
router.post("/pemasukkan/edit/:id", ensureAuthenticated, bpmjRole, pemasukkanController.postEditIncome);
router.post("/pemasukkan/delete/:id", ensureAuthenticated, bpmjRole, pemasukkanController.postDeleteIncome);

module.exports = router;
