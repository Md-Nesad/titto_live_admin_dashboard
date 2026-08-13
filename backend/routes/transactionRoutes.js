const express = require("express");
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/rate", authMiddleware, transactionController.rateTransaction);

router.get(
  "/history",
  authMiddleware,
  transactionController.transactionHistory,
);

router.get("/revenue", transactionController.getMonthlyRevenue);

module.exports = router;
