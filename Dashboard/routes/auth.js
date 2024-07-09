const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {forwardAuthenticated} = require("../middlewares/auth");
const authController = require("../controllers/authenticationController");

router.get("/login", forwardAuthenticated, authController.login);
router.post(
  "/login",
  [check("username", "Username is required").notEmpty(), check("password", "Password is required").notEmpty()],
  authController.loginPost
);
router.get("/logout", authController.logout);

module.exports = router;
