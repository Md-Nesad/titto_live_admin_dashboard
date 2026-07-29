const mongoose = require("mongoose");

const supportAgencySchema = new mongoose.Schema(
  {
    agencyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true },
);

const SupportAgency = mongoose.model("SupportAgency", supportAgencySchema);

module.exports = SupportAgency;
