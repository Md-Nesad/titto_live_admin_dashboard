const authServices = require("../services/authServices");

const register = async (req, res) => {
  try {
    const result = await authServices.registerUser(req.body);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Error in register controller:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await authServices.verifyOtp(email, otp);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Error in verifyOtp controller:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({
        message: "Email is required to resend OTP.",
      });
    }

    const result = await authServices.resendOTP(email);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Error in resendOtp controller:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authServices.loginUser(req.body);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Error in login controller:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  verifyOtp,
  resendOtp,
  login,
};
