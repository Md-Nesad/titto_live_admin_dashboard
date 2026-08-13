const transactionService = require("../services/transactionService");

const sellCoinsToAgency = async (req, res) => {
  try {
    const transa = await transactionService.sellCoinsToAgency(
      req.body,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      data: transa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

module.exports = {
  sellCoinsToAgency,
  rateTransaction,
  transactionHistory,
};
