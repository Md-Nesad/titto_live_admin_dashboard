const { z } = require("zod");

const agencyBodySchema = z.object({
  agencyName: z.string().min(1, "Agency name is required"),

  agencyId: z.string().min(1, "Agency ID is required"),

  type: z.string().min(1, "Agency type is required"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(1, "Phone number is required"),

  country: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid country ID"),

  documentType: z.string().min(1, "Document type is required"),

  status: z.enum(["active", "pending", "suspended"]).default("pending"),

  coinBuy: z.coerce.number().min(0).default(0),

  level: z.coerce.number().min(0).default(0),

  beans: z.coerce.number().min(0).default(0),

  temporaryBan: z.coerce.boolean().default(false),

  permanentBan: z.coerce.boolean().default(false),
});

module.exports = {
  agencyBodySchema,
};
