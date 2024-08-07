const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	adminLogin,
	adminSignup,
	forgetPasswordReq,
	resetPassword,
} = require("../controllers/register.js");

router.post("/login", login);
router.post("/signup", signup);
router.post("/adminlogin", adminLogin);
router.post("/adminsignup", adminSignup);
router.get("/forgetpassword", forgetPasswordReq);
router.post("/reset", resetPassword);

module.exports = router;
