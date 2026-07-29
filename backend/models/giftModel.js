const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  giftName: {
    type: String,
    required: true,
  },
  giftPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  giftImage: {
    type: String,
    required: true,
  },
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;
