const countryService = require("../services/countryService");
const { successHandler, rejectHandler } = require("../utils/responseHandler");

const getCountry = async (req, res) => {
  try {
    const country = await countryService.getCountry();

    successHandler(res, 200, "Country fetched successfully.", country);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

const createCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const country = await countryService.createCountry({ name });

    successHandler(res, 201, "Country created successfully.", country);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

module.exports = {
  getCountry,
  createCountry,
};
