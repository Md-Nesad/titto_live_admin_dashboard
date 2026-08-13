const agencyService = require("../services/agencyServices");
const generateRandomId = require("../utils/generateIdNumber");
const {
  statusHandler,
  rejectHandler,
  successHandler,
} = require("../utils/responseHandler");

const createAgency = async (req, res) => {
  try {
    //generate random id
    const agencyId = generateRandomId();

    const result = await agencyService.createAgency({
      body: {
        ...req.body,
        agencyId,
      },
      files: req.files,
    });

    successHandler(res, 201, "Agency created successfully", result);
  } catch (error) {
    console.error(error);
    rejectHandler(res, 500, error.message);
  }
};

const getAllAgencies = async (req, res) => {
  try {
    const agencies = await agencyService.getAllAgencies();

    res.status(200).json({
      success: true,
      data: agencies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAgencyById = async (req, res) => {
  try {
    const { agencyId } = req.params;

    const agency = await agencyService.getAgencyById(agencyId);

    res.status(200).json({
      success: true,
      data: agency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getByIdAndUpdate = async (req, res) => {
  try {
    const { agencyId } = req.params;

    const updatedAgency = await agencyService.getAgencyByIdAndUpdate(
      agencyId,
      req.body,
      req.files,
    );

    successHandler(res, 200, "Agency updated successfully", updatedAgency);
  } catch (error) {
    console.error(error);
    rejectHandler(res, 500, error.message);
  }
};

const getByIdAndDelete = async (req, res) => {
  try {
    const { agencyId } = req.params;

    const deletedAgency = await agencyService.deleteAgencyById(agencyId);

    res.status(200).json({
      success: true,
      message: "Agency Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAgency,
  getAllAgencies,
  getAgencyById,
  getByIdAndUpdate,
  getByIdAndDelete,
};
