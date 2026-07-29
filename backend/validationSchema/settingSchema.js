const { z } = require("zod");

const settingSchema = z.object({
  platformConfig: z.object({
    streamDoingLive: z.string().min(1),
    supportEmail: z.string().email(),
  }),

  userSetting: z.object({
    liveStreamUnlockLevel: z.number().min(0),
    newUserRegistration: z.boolean(),
  }),

  currencySetting: z.object({
    diamondToDollar: z.object({
      diamonds: z.number().positive(),
      dollars: z.number().positive(),
    }),

    beanToDiamond: z.object({
      beans: z.number().positive(),
      diamonds: z.number().positive(),
    }),
  }),

  diamondShareSetting: z.object({
    requiredDiamonds: z.number().positive(),
    amountOfShare: z.number().positive(),
  }),

  commissionSetting: z.object({
    adminAgencyCommission: z.number().min(0),
    hostAgencyCommission: z.number().min(0),
    masterAgencyCommission: z.number().min(0),
  }),

  monthlyDiamondReset: z.boolean(),
});

module.exports = settingSchema;
