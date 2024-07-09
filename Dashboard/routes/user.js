// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {ensureAuthenticated, ensureRole} = require("../middlewares/auth");

// Mendefinisikan role yang bisa mengakses routes
const bpmjRole = ensureRole("bpmj");

router.get("/user", ensureAuthenticated, bpmjRole, userController.getUsers);
router.get("/user/add", ensureAuthenticated, bpmjRole, userController.addUserForm);
router.post("/user/add", ensureAuthenticated, bpmjRole, userController.addUser);
router.get("/user/edit/:id", ensureAuthenticated, bpmjRole, userController.editUserForm);
router.post("/user/edit/:id", ensureAuthenticated, bpmjRole, userController.updateUser);
router.post("/user/delete/:id", ensureAuthenticated, bpmjRole, userController.deleteUser);

module.exports = router;
