const express = require("express");
const router = express.Router();
const { getTimetable, setTimetable } = require("../controllers/timetables.js");

router.get("/get", getTimetable);
router.post("/set", setTimetable);

module.exports = router;
