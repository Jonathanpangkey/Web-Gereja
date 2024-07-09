const express = require("express");
const router = express.Router();
const pengeluaranController = require("../controllers/pengeluaranController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/pengeluaran", ensureAuthenticated, pengeluaranController.getAllExpense);
router.get("/pengeluaran/add", ensureAuthenticated, pengeluaranController.getAddExpense);
router.post("/pengeluaran/add", ensureAuthenticated, pengeluaranController.postAddExpense);
router.get("/pengeluaran/edit/:id", ensureAuthenticated, bpmjRole, pengeluaranController.getEditExpense);
router.post("/pengeluaran/edit/:id", ensureAuthenticated, bpmjRole, pengeluaranController.postEditExpense);
router.post("/pengeluaran/delete/:id", ensureAuthenticated, bpmjRole, pengeluaranController.postDeleteExpense);

module.exports = router;
