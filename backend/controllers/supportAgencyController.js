const supportServices = require("../services/supportServices");
const { successHandler, rejectHandler } = require("../utils/responseHandler");
const generateRandomId = require("../utils/generateIdNumber");

const createSupportAgency = async (req, res, next) => {
  try {
    const { name, gender, level, phone, location, status } = req.body;

    // generate random agency id
    const agencyId = generateRandomId();

    const supportAgency = await supportServices.createSupportAgency({
      agencyId,
      name,
      gender,
      level: "Lv 1",
      phone,
      location,
      status,
    });

    return successHandler(res, 201, "Support agency created", supportAgency);
  } catch (error) {
    next(error);
  }
};

const getSupportAgency = async (req, res) => {
  try {
    const supportAgencies = await supportServices.getSupportAgency();

    successHandler(res, 200, "Support agencies fetched", supportAgencies);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

const getSingleSupportAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const supportAgency = await supportServices.getSingleSupportAgency(id);

    successHandler(res, 200, "Support agency fetched", supportAgency);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

const updateSupportAgency = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, gender, level, phone, location, status } = req.body;

    const supportAgency = await supportServices.updateSupportAgency(id, {
      name,
      gender,
      level: "Lv 1",
      phone,
      location,
      status,
    });

    successHandler(res, 200, "Support agency updated", supportAgency);
  } catch (error) {
    next(error);
  }
};

const deleteSupportAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const supportAgency = await supportServices.deleteSupportAgency(id);

    successHandler(res, 200, "Support agency deleted");
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

module.exports = {
  createSupportAgency,
  getSupportAgency,
  getSingleSupportAgency,
  updateSupportAgency,
  deleteSupportAgency,
};
