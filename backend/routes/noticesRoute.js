const express = require("express");
const router = express.Router();
const { setNotice, getNotice } = require("../controllers/notices.js");

router.post("/set", setNotice);
router.get("/get", getNotice);

module.exports = router;
