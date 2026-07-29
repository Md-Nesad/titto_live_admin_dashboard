const express = require("express");
const authController = require("../controllers/authController");
const { loginLimiter } = require("../middlewares/rateLimiting");

const router = express.Router();

router.post("/register", authController.register);

router.post("/verify-otp", authController.verifyOtp);

router.post("/resend-otp", authController.resendOtp);

router.post("/login", loginLimiter, authController.login);

module.exports = router;
