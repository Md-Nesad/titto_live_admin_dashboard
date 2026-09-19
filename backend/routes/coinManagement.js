const express = require("express");
const coinManagement = require("../controllers/coinManagement");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/exchange-rate", coinManagement.updatedExchangeRate);

router.get("/exchange-rate", coinManagement.getExchangeRate);

router.post("/sell", authMiddleware, coinManagement.sellCoinsToAgency);

module.exports = router;
