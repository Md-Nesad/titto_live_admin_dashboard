const User = require("../models/userModel.js");

const getAllUsers = async () => {
  const users = await User.find();

  if (!users) {
    throw new Error("No users found.");
  }

  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

const userStats = async () => {
  console.log("userStats");
  const result = await User.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        totalCoins: { $sum: "$coinBuy" },
        avgCoins: { $avg: "$coinBuy" },
      },
    },
  ]);

  console.log(result);

  const { totalUsers, totalCoins, avgCoins } = result[0];

  return {
    totalUsers,
    totalCoins,
    avgCoins,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  userStats,
};
