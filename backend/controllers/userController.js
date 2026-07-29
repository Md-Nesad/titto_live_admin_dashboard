const userServices = require("../services/userServices");

const getAllUsers = async (req, res) => {
  try {
    const result = await userServices.getAllUsers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userServices.getUserById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userServices.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const userStats = async (req, res) => {
  try {
    console.log("userStats");
    const { totalUsers, totalCoins, avgCoins } = await userServices.userStats();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCoins,
        avgCoins,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: "fdfsd",
      message: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  userStats,
};
