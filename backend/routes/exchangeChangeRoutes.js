const express = require("express");
const exchangeRateController = require("../controllers/exchangeRateController");

const router = express.Router();

router.post("/", exchangeRateController.updatedExchangeRate);

router.get("/", exchangeRateController.getExchangeRate);

module.exports = router;
