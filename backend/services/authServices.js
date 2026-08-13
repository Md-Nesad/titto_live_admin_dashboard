const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const generateOTP = require("../utils/generateOTP.js");
const generateUniqueUserId = require("../utils/generateIdNumber.js");
const client = require("../config/redis.js");
const sendOtp = require("../utils/otpSendToMail.js");
const generateAccessToken = require("../utils/generateAccessToken.js");
const emailQueue = require("../queue/emailVerificationQueue.js");

const registerUser = async (data) => {
  const { userName, email, password } = data;

  if (!userName || !email || !password) {
    throw new Error("Username, email, and password are required.");
  }

  // Email already exists?
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email already registered.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP
  const otp = generateOTP();

  // Save to Redis
  const saved = await client.set(
    `otp:${email}`,
    JSON.stringify({ userName, email, password: hashedPassword, otp }),
    "EX",
    300,
  );

  // Send Email
  await emailQueue.add("send_verification_email", { email, otp });

  return {
    message: "OTP sent successfully.",
  };
};

const verifyOtp = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required.");
  }

  const data = await client.get(`otp:${email}`);

  if (!data) {
    throw new Error("OTP expired or not found.");
  }

  const parsedData = JSON.parse(data);

  const { email: storedEmail, otp: storedOtp, userName, password } = parsedData;

  if (otp !== storedOtp) {
    throw new Error("Invalid OTP.");
  }

  //check if user already exists
  const user = await User.findOne({ email: storedEmail });

  if (user) {
    throw new Error("User already exists.");
  }

  //generate unique userId
  const userId = generateUniqueUserId();

  // Create new user
  const newUser = new User({
    userId,
    userName,
    email: storedEmail,
    password,
  });

  await newUser.save();

  // Delete OTP from Redis
  await client.del(`otp:${email}`);

  return {
    message: "User registered successfully.",
  };
};

const resendOTP = async (email) => {
  const oldData = await client.get(`otp:${email}`);

  if (!oldData) {
    throw new Error("No OTP found to resend. Please register again.");
  }

  const parsedData = JSON.parse(oldData);

  const newOTP = generateOTP();

  // Update Redis with new OTP
  await client.set(
    `otp:${email}`,
    JSON.stringify({ ...parsedData, otp: newOTP }),
    "EX",
    300,
  );

  // send new OTP to email
  await emailQueue.add("resend_verification_otp", { email, newOTP });

  return {
    message: "New OTP sent successfully.",
  };
};

const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User not found.");
  }

  console.log("password:", password);
  console.log("user password:", user?.password);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  const accessToken = generateAccessToken(user);

  return {
    message: "Login successful.",
    token: accessToken,
  };
};

module.exports = {
  registerUser,
  verifyOtp,
  resendOTP,
  loginUser,
};
