const giftServices = require("../services/giftServices");

const createGift = async (req, res) => {
  try {
    const { giftName, giftPrice, category } = req.body;

    const giftImage = req.file;

    const newGift = await giftServices.createGift(
      { giftName, giftPrice, category },
      giftImage,
    );

    res.status(201).json({
      success: true,
      message: "Gift created successfully",
      data: newGift,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllGifts = async (req, res) => {
  try {
    const gifts = await giftServices.getAllGifts();

    res.status(200).json({
      success: true,
      data: gifts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const giftStats = async (req, res) => {
  try {
    const giftStats = await giftServices.giftStats();

    res.status(200).json({
      success: true,
      data: giftStats,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingleGift = async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await giftServices.getSingleGift(id);

    res.status(200).json({
      success: true,
      data: gift,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGift = async (req, res) => {
  try {
    const { id } = req.params;

    const { giftName, giftPrice, category } = req.body;

    const giftImage = req.file;

    const updatedGift = await giftServices.updateGift(
      id,
      { giftName, giftPrice, category },
      giftImage,
    );

    res.status(200).json({
      success: true,
      message: "Gift updated successfully",
      data: updatedGift,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGift = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGift = await giftServices.deleteGift(id);

    res.status(200).json({
      success: true,
      message: "Gift deleted successfully",
      data: deletedGift,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGift,
  getAllGifts,
  giftStats,
  getSingleGift,
  updateGift,
  deleteGift,
};
