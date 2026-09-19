const Agency = require("../models/agencyModel");
const uploadSingleImage = require("../utils/uploadImageToCloudinary");
const { agencyBodySchema } = require("../validationSchema/agencySchema");

const createAgency = async ({ body, files }) => {
  const validatedData = await agencyBodySchema.parse(body);

  const nidFront = files?.nidFront?.[0];
  const nidBack = files?.nidBack?.[0];
  const profilePic = files?.profilePic?.[0];

  if (!nidFront) {
    throw new Error("Nid Front is required");
  }

  if (!nidBack) {
    throw new Error("Nid back is required");
  }

  if (!profilePic) {
    throw new Error("Profile Pic is required");
  }

  const [nidFrontResult, nidBackResult, profilePicResult] = await Promise.all([
    uploadSingleImage(nidFront),
    uploadSingleImage(nidBack),
    uploadSingleImage(profilePic),
  ]);

  const newAgency = await Agency.create({
    ...validatedData,
    nidFront: nidFrontResult.secure_url,
    nidBack: nidBackResult.secure_url,
    profilePic: profilePicResult.secure_url,
  });

  return newAgency;
};

const getAllAgencies = async () => {
  const agencies = await Agency.find({}).populate({
    path: "country",
    select: "name",
  });

  if (!agencies) {
    throw new Error("Agencies not found!");
  }

  return agencies;
};

const getAgencyById = async (id) => {
  const agency = await Agency.findById(id).populate({
    path: "country",
    select: "name",
  });

  if (!singleAgency) {
    throw new Error("Agency not found!");
  }

  return agency;
};

const getAgencyByIdAndUpdate = async (id, payload, files) => {
  const {
    agencyName,
    type,
    email,
    phone,
    country,
    documentType,
    status,
    temporaryBan,
    permanentBan,
  } = payload;

  const updatedAgency = {
    agencyName,
    type,
    email,
    phone,
    country,
    documentType,
    status,
    temporaryBan,
    permanentBan,
  };

  const nidFront = files?.nidFront?.[0];
  const nidBack = files?.nidBack?.[0];
  const profilePic = files?.profilePic?.[0];

  if (nidFront) {
    const nidFrontResult = await uploadSingleImage(nidFront);
    updatedAgency.nidFront = nidFrontResult.secure_url;
  }

  if (nidBack) {
    const nidBackResult = await uploadSingleImage(nidBack);
    updatedAgency.nidBack = nidBackResult.secure_url;
  }

  if (profilePic) {
    const profilePicResult = await uploadSingleImage(profilePic);
    updatedAgency.profilePic = profilePicResult.secure_url;
  }

  const updatedResult = await Agency.findByIdAndUpdate(id, updatedAgency, {
    new: true,
    runValidators: true,
  });

  if (!updatedResult) {
    throw new Error("Agency not found!");
  }

  return updatedResult;
};

const deleteAgencyById = async (id) => {
  const deletedAgency = await Agency.findByIdAndDelete(id);

  if (!deletedAgency) {
    throw new Error("Agency not found!");
  }

  return deletedAgency;
};

module.exports = {
  createAgency,
  getAllAgencies,
  getAgencyById,
  getAgencyByIdAndUpdate,
  deleteAgencyById,
};
