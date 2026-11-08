const { z } = require("zod");

const settingSchema = z.object({
  platformConfig: z.object({
    tittoLive: z.string().min(1),
    supportEmail: z.string().email(),
  }),

  userSetting: z.object({
    liveStreamUnlockLevel: z.number().min(0),
  }),

  currencySetting: z.object({
    diamondToBDT: z.object({
      diamonds: z.number().positive(),
      BDT: z.number().positive(),
    }),
  }),

  commissionSetting: z.object({
    hostAgencyCommission: z.number().min(0),
    masterCoinPortal: z.number().min(0),
    coinAgency: z.number().min(0),
  }),
});

module.exports = settingSchema;
