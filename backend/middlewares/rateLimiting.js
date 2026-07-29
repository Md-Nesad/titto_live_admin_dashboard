const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Maximum 5 requests per 15 minutes

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
      retryAfter: "15 minutes",
    });
  },
});

module.exports = {
  loginLimiter,
};
