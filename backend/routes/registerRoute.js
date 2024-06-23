const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	adminLogin,
	adminSignup,
} = require("../controllers/register.js");

router.get("/login", login);
router.post("/signup", signup);
router.get("/adminlogin", adminLogin);
router.post("/adminsignup", adminSignup);

module.exports = router;
