const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true,
      unique: true,
    },

    agencyId: {
      type: String,
    },

    type: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    coinBuy: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 0,
    },

    beans: {
      type: Number,
      default: 0,
    },

    documentType: {
      type: String,
      required: true,
    },

    nidFront: {
      type: String,
    },

    nidBack: {
      type: String,
    },

    profilePic: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "pending", "suspended"],
      default: "pending",
    },

    temporaryBan: {
      type: Boolean,
      default: false,
    },

    permanentBan: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
