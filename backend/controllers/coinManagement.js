const coinManagement = require("../services/coinManagement");

const updatedExchangeRate = async (req, res) => {
  try {
    const result = await coinManagement.updateExchangeRate(req.body);

    res.status(200).json({
      success: true,
      message: "Exchange Rate updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExchangeRate = async (req, res) => {
  try {
    const exchangeRate = await coinManagement.getExchangeRate();

    res.status(200).json({
      success: true,
      data: exchangeRate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sellCoinsToAgency = async (req, res) => {
  try {
    const transaction = await coinManagement.sellCoinsToAgency(
      req.body,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      data: transaction,
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
  updatedExchangeRate,
  getExchangeRate,
  sellCoinsToAgency,
};
