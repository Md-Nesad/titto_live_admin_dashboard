const salaryService = require("../services/salaryServices");
const { successHandler, rejectHandler } = require("../utils/responseHandler");

const createSalary = async (req, res, next) => {
  try {
    const { target, diamondShare, basicSalary, totalSalary, agencyShare } =
      req.body;

    const salary = await salaryService.createSalary({
      target,
      diamondShare,
      basicSalary,
      totalSalary,
      agencyShare,
    });

    successHandler(res, 201, "Salary created successfully.", salary);
  } catch (error) {
    next(error);
  }
};

const getAllSalary = async (req, res) => {
  try {
    const salary = await salaryService.getSalary();

    if (!salary) {
      return res.status(404).json({
        message: "Salary not found.",
      });
    }

    successHandler(res, 200, "Salary fetched successfully.", salary);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

const getSingleSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await salaryService.getSingleSalary(id);

    successHandler(res, 200, "Salary fetched successfully.", salary);
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

const updateSalary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { target, diamondShare, basicSalary, totalSalary, agencyShare } =
      req.body;

    const salary = await salaryService.updateSalary(id, {
      target,
      diamondShare,
      basicSalary,
      totalSalary,
      agencyShare,
    });

    successHandler(res, 200, "Salary updated successfully.", salary);
  } catch (error) {
    next(error);
  }
};

const deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await salaryService.deleteSalary(id);

    successHandler(res, 200, "Salary deleted successfully.");
  } catch (error) {
    rejectHandler(res, 400, error.message);
  }
};

module.exports = {
  createSalary,
  getAllSalary,
  getSingleSalary,
  updateSalary,
  deleteSalary,
};
