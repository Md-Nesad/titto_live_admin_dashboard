const adminMiddleware = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }
};

module.exports = adminMiddleware;
