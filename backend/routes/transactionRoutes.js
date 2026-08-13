const express = require("express");
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/sell", authMiddleware, transactionController.sellCoinsToAgency);

router.get("/rate", authMiddleware, transactionController.rateTransaction);

router.get(
  "/history",
  authMiddleware,
  transactionController.transactionHistory,
);

module.exports = router;
