const Rate = require("../models/exchangeRate");

const updateExchangeRate = async (payload) => {
  const updatedRate = await Rate.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
  });

  return updatedRate;
};

const getExchangeRate = async (payload) => {
  const exchangeRate = await Rate.findOne();

  if (!exchangeRate) throw new Error("Exchange rate not found");

  return exchangeRate;
};

module.exports = {
  updateExchangeRate,
  getExchangeRate,
};
