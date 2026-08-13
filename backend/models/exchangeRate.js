const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
  masterRate: {
    type: Number,
  },

  agencyRate: {
    type: Number,
  },

  userRate: {
    type: Number,
  },
});

const Rate = mongoose.model("ExchangeRate", exchangeRateSchema);

module.exports = Rate;
