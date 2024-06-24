const express = require("express");
const router = express.Router();
const {
	getSchoolAccountData,
	getAdminAccountData,
} = require("../controllers/getAccountData.js");

router.get("/school", getSchoolAccountData);
router.get("/admin", getAdminAccountData);

module.exports = router;
