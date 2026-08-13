const Agency = require("../models/agencyModel");
const Transaction = require("../models/transaction");
const generateTransactionId = require("../utils/generateTransactionId");

const sellCoinsToAgency = async (payload, sender) => {
  const { agencyId, coins, price, category } = payload;

  const agency = await Agency.findOne({ agencyId });

  console.log("agency_details", agency);

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

const rateTransaction = async () => {
  const transactions = await Agency.find(
    { coinBuy: { $gt: 0 } },
    { agencyName: 1, agencyId: 1, type: 1, coinBuy: 1, beans: 1, updatedAt: 1 },
  );

  if (!transactions) {
    throw new Error("Transactions not found!");
  }

  return transactions;
};

const transactionHistory = async () => {
  const transactions = await Transaction.find(
    {},
    {
      transactionId: 1,
      sender: 1,
      receiver: 1,
      category: 1,
      coins: 1,
      price: 1,
      createdAt: 1,
    },
  ).populate({
    path: "sender receiver",
    select: "userId role agencyId type -_id",
  });

  if (!transactions) {
    throw new Error("Transactions not found!");
  }

  return transactions;
};

module.exports = {
  sellCoinsToAgency,
  rateTransaction,
  transactionHistory,
};
