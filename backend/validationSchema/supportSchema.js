const { z } = require("zod");
const mongoose = require("mongoose");

const supportAgencyValidationSchema = z.object({
  agencyId: z.string().trim().optional(),

  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  gender: z.string().trim().min(1, "Gender is required"),

  level: z.string().trim().min(1, "Level is required"),

  phone: z.string().trim().min(1, "Phone number is required"),

  location: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid location ID",
  }),

  status: z.enum(["active", "suspended"]).optional().default("active"),
});

module.exports = supportAgencyValidationSchema;
