const transactionService = require("../services/transactionService");

const rateTransaction = async (req, res) => {
  try {
    const transactions = await transactionService.rateTransaction();

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const transactionHistory = async (req, res) => {
  try {
    const transactions = await transactionService.transactionHistory();

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await transactionService.getMonthlyRevenue();

    res.status(200).json({
      success: true,
      message: "Monthly revenue retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Get monthly revenue error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve monthly revenue",
      error: error.message,
    });
  }
};

module.exports = {
  rateTransaction,
  transactionHistory,
  getMonthlyRevenue,
};
