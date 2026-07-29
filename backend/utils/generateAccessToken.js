const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, userName: user.userName, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    },
  );
};

module.exports = generateAccessToken;
