const Agency = require("../models/agencyModel");
const Rate = require("../models/exchangeRate");
const Transaction = require("../models/transaction");
const generateTransactionId = require("../utils/generateTransactionId");

const updateExchangeRate = async (payload) => {
  const updatedRate = await Rate.findOneAndUpdate({}, payload, {
    new: true,
    upsert: true,
  });

  return updatedRate;
};

const getExchangeRate = async () => {
  const exchangeRate = await Rate.findOne();

  if (!exchangeRate) throw new Error("Exchange rate not found");

  return exchangeRate;
};

const sellCoinsToAgency = async (payload, sender) => {
  const { agencyId, coins, price, category } = payload;

  if (!agencyId) {
    throw new Error("Agency id is required");
  }

  const agency = await Agency.findOne({ agencyId });

  if (!agency) {
    throw new Error("Agency not found!");
  }

  if (agency.type !== category) {
    throw new Error("Invalid category!");
  }

  // Add new coins with previously purchased coins
  agency.coinBuy = (agency.coinBuy || 0) + coins;

  // Beans will be double of total purchased coins
  agency.beans = agency.coinBuy * 2;

  await agency.save();

  const transactionId = generateTransactionId();

  const newTransaction = {
    transactionId,
    sender,
    receiver: agency._id,
    category,
    coins,
    price,
  };

  const transaction = await Transaction.create(newTransaction);

  return transaction;
};

module.exports = {
  updateExchangeRate,
  getExchangeRate,
  sellCoinsToAgency,
};
