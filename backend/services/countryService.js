const Country = require("../models/countryModel");

const getCountry = async () => {
  const country = await Country.find({});

  if (!country) {
    throw new Error("Country not found.");
  }

  return country;
};

const createCountry = async (payload) => {
  const { name } = payload;

  if (!name) {
    throw new Error("Name is required.");
  }

  const exitingCountry = await Country.findOne({ name });

  if (exitingCountry) {
    throw new Error("Country already exists.");
  }

  const country = await Country.create(payload);

  return country;
};

module.exports = {
  getCountry,
  createCountry,
};
