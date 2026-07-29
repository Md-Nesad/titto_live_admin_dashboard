const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  platformConfig: {
    streamDoingLive: {
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

    newUserRegistration: {
      type: Boolean,
      required: true,
    },
  },

  currencySetting: {
    diamondToDollar: {
      diamonds: {
        type: Number,
        required: true,
      },
      dollars: {
        type: Number,
        required: true,
      },
    },
    beanToDiamond: {
      beans: {
        type: Number,
        required: true,
      },

      diamonds: {
        type: Number,
        required: true,
      },
    },
  },

  diamondShareSetting: {
    requiredDiamonds: {
      type: Number,
      required: true,
    },
    amountOfShare: {
      type: Number,
      required: true,
    },
  },

  commissionSetting: {
    adminAgencyCommission: {
      type: Number,
      required: true,
    },
    hostAgencyCommission: {
      type: Number,
      required: true,
    },
    masterAgencyCommission: {
      type: Number,
      required: true,
    },
  },

  monthlyDiamondReset: {
    type: Boolean,
    required: true,
  },
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
