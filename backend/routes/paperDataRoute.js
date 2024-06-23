const express = require("express");
const router = express.Router();
const {
	getStudentsData,
	setStudentsData,
} = require("../controllers/paperData.js");

router.get("/get", getStudentsData);
router.post("/set", setStudentsData);

module.exports = router;
