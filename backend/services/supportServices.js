const supportAgencyValidationSchema = require("../validationSchema/supportSchema");
const SupportAgency = require("../models/supportAgencySchema");

const createSupportAgency = async (payload) => {
  const validatedData = supportAgencyValidationSchema.parse(payload);

  if (!validatedData.location) {
    throw new Error("Location is required.");
  }

  const existsAgency = await SupportAgency.findOne({
    name: validatedData.name,
  });

  if (existsAgency) {
    throw new Error("Agency already exists.");
  }

  const supportAgency = await SupportAgency.create(validatedData);

  return supportAgency;
};

const getSupportAgency = async () => {
  const supportAgencies = await SupportAgency.find({}).populate({
    path: "location",
    select: "name",
  });

  if (!supportAgencies) {
    throw new Error("Support agencies not found.");
  }

  return supportAgencies;
};

const getSingleSupportAgency = async (id) => {
  const supportAgency = await SupportAgency.findById(id).populate({
    path: "location",
    select: "name -_id",
  });

  if (!supportAgency) {
    throw new Error("Support agency not found.");
  }

  return supportAgency;
};

const updateSupportAgency = async (id, payload) => {
  const validatedData = supportAgencyValidationSchema.parse(payload);

  const supportAgency = await SupportAgency.findByIdAndUpdate(
    id,
    validatedData,
    {
      new: true, // return the new result instead of the old one
      upsert: true, // update if no document found
    },
  );

  if (!supportAgency) {
    throw new Error("Support agency not found.");
  }

  return supportAgency;
};

const deleteSupportAgency = async (id) => {
  const supportAgency = await SupportAgency.findByIdAndDelete(id);

  if (!supportAgency) {
    throw new Error("Support agency not found.");
  }

  return supportAgency;
};

module.exports = {
  createSupportAgency,
  getSupportAgency,
  getSingleSupportAgency,
  updateSupportAgency,
  deleteSupportAgency,
};
