const express = require("express");
const router = express.Router();
const {
	getSchoolData,
	getStudentsData,
} = require("../controllers/talukaWiseData.js");

router.get("/getschool", getSchoolData);
router.get("/getstudent", getStudentsData);

module.exports = router;
