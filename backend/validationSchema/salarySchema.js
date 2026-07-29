const { z } = require("zod");

const salarySchema = z.object({
  target: z.number().positive().min(10),
  diamondShare: z.number().positive().min(10),
  basicSalary: z.number().positive().min(10),
  totalSalary: z.number().positive().min(10),
  agencyShare: z.number().positive().min(10),
});

module.exports = salarySchema;
