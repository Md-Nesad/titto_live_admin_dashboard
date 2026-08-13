const exchangeRateService = require("../services/exchangeRateService");

const updatedExchangeRate = async (req, res) => {
  try {
    const result = await exchangeRateService.updateExchangeRate(req.body);

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
    const exchangeRate = await exchangeRateService.getExchangeRate();

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

module.exports = {
  updatedExchangeRate,
  getExchangeRate,
};
