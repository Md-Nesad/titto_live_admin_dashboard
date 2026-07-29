const Setting = require("../models/settingModel");
const settingSchema = require("../validationSchema/settingSchema");

const saveSetting = async (payload) => {
  const validatedData = settingSchema.parse(payload);

  const setting = await Setting.findOneAndUpdate({}, validatedData, {
    new: true,
    upsert: true,
  });

  return setting;
};

const getSetting = async () => {
  const setting = await Setting.findOne();

  if (!setting) {
    throw new Error("Settings not found.");
  }

  return setting;
};

module.exports = {
  saveSetting,
  getSetting,
};
