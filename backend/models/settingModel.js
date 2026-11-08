const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  platformConfig: {
    tittoLive: {
      type: String,
      required: true,
    },

    supportEmail: {
      type: String,
      required: true,
    },
  },

  userSetting: {
    liveStreamUnlockLevel: {
      type: Number,
      required: true,
    },
  },

  currencySetting: {
    diamondToBDT: {
      diamonds: {
        type: Number,
        required: true,
      },
      BDT: {
        type: Number,
        required: true,
      },
    },
  },

  commissionSetting: {
    hostAgencyCommission: {
      type: Number,
      required: true,
    },
    masterCoinPortal: {
      type: Number,
      required: true,
    },
    coinAgency: {
      type: Number,
      required: true,
    },
  },
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
