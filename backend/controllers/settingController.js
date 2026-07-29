const settingService = require("../services/settingService");
const { successHandler, rejectHandler } = require("../utils/responseHandler");

const createSetting = async (req, res, next) => {
  try {
    const result = await settingService.saveSetting(req.body);

    successHandler(res, 201, "Settings created successfully.");
  } catch (error) {
    next(error);
  }
};

const getSetting = async (req, res) => {
  try {
    const result = await settingService.getSetting();

    successHandler(res, 200, "Settings fetched successfully.", result);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

module.exports = {
  createSetting,
  getSetting,
};
