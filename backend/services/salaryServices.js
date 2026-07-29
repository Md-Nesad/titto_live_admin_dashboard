const Salary = require("../models/salarySchema");
const salarySchema = require("../validationSchema/salarySchema");

const createSalary = async (payload) => {
  const validatedData = salarySchema.parse(payload);

  const salary = await Salary.create(validatedData);

  return salary;
};

const getSalary = async () => {
  const salary = await Salary.find({});

  if (!salary) {
    throw new Error("Salary not found.");
  }

  return salary;
};

const getSingleSalary = async (id) => {
  const salary = await Salary.findById(id);

  if (!salary) {
    throw new Error("Salary not found.");
  }

  return salary;
};

const updateSalary = async (id, payload) => {
  const validatedData = salarySchema.parse(payload);

  const salary = await Salary.findByIdAndUpdate(id, validatedData, {
    new: true, // return the new result instead of the old one
    upsert: true, // update if no document found
  });

  if (!salary) {
    throw new Error("Salary not found.");
  }

  return salary;
};

const deleteSalary = async (id) => {
  const salary = await Salary.findByIdAndDelete(id);

  if (!salary) {
    throw new Error("Salary not found.");
  }

  return salary;
};

module.exports = {
  createSalary,
  getSalary,
  getSingleSalary,
  updateSalary,
  deleteSalary,
};
