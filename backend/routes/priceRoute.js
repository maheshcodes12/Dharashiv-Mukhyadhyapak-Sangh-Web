const express = require("express");
const router = express.Router();
const { getPriceData, setPriceData } = require("../controllers/priceData.js");

router.get("/get", getPriceData);
router.post("/set", setPriceData);

module.exports = router;
