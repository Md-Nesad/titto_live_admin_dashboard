const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    target: {
      type: Number,
      required: true,
    },
    diamondShare: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    totalSalary: {
      type: Number,
      required: true,
    },
    agencyShare: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
