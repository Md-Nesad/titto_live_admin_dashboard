const Agency = require("../models/agencyModel");
const Transaction = require("../models/transaction");
const { getLast12MonthsRange } = require("../utils/date");
const generateTransactionId = require("../utils/generateTransactionId");
const { formatMonthlyRevenue } = require("../utils/revenueHelper");

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

const getMonthlyRevenue = async () => {
  const { startDate, endDate } = getLast12MonthsRange();

  const result = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },

        category: {
          $in: ["host", "master", "coin"],
        },
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },
        },

        revenue: {
          $sum: "$price",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  return formatMonthlyRevenue(result);
};

module.exports = {
  rateTransaction,
  transactionHistory,
  getMonthlyRevenue,
};
