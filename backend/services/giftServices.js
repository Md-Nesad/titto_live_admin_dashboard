const Gift = require("../models/giftModel");
const uploadSingleImage = require("../utils/uploadImageToCloudinary");

const createGift = async (payload, giftImage) => {
  const { giftName, giftPrice, category } = payload;

  if (!giftName || !giftPrice || !category) {
    throw new Error("Please provide all the required fields");
  }

  if (!giftImage) {
    throw new Error("Please provide giftImage");
  }

  //upload giftImage to cloudinary
  const giftImageResult = await uploadSingleImage(giftImage);

  const newGift = await Gift.create({
    giftName,
    giftPrice: Number(giftPrice),
    category,
    giftImage: giftImageResult.secure_url,
  });

  return newGift;
};

const getAllGifts = async () => {
  const gifts = await Gift.find();

  if (!gifts) {
    throw new Error("No gifts found");
  }

  return gifts;
};

const giftStats = async () => {
  const giftByCategory = await Gift.aggregate([
    {
      $group: {
        _id: "$category",
        totalGift: { $sum: 1 },
      },
    },
  ]);

  if (!giftByCategory) {
    throw new Error("No gifts found");
  }

  return giftByCategory;
};

const getSingleGift = async (id) => {
  const gift = await Gift.findById(id);

  if (!gift) {
    throw new Error("Gift not found");
  }

  return gift;
};

const updateGift = async (id, payload, giftImage) => {
  const { giftName, giftPrice, category } = payload;

  const updatedData = {
    giftName,
    giftPrice: Number(giftPrice),
    category,
  };

  //upload giftImage to cloudinary
  if (giftImage) {
    const giftImageResult = await uploadSingleImage(giftImage);
    updatedData.giftImage = giftImageResult.secure_url;
  }

  const updatedGift = await Gift.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

const deleteGift = async (id) => {
  const deletedGift = await Gift.findByIdAndDelete(id);

  if (!deletedGift) {
    throw new Error("Gift not found");
  }

  return deletedGift;
};

module.exports = {
  createGift,
  getAllGifts,
  giftStats,
  getSingleGift,
  updateGift,
  deleteGift,
};
