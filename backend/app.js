const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandalingMiddleware = require("./middlewares/errorHandalingMiddleware");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const adminMiddleware = require("./middlewares/adminMiddleware");
const corsOptions = require("./utils/corsOptions");
const settingRoutes = require("./routes/settingRoute");
const supportAgencyRoutes = require("./routes/supportAgencyRoutes");
const countryRoutes = require("./routes/countryRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const giftRoutes = require("./routes/giftRoute");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.get("/", authMiddleware, adminMiddleware, (req, res) => {
  res.send("Hello my first backend application");
});

//auth routes
app.use("/api/v1/auth", authRoutes);

//setting routes
app.use("/api/v1/setting", authMiddleware, adminMiddleware, settingRoutes);

// support agencies routes
app.use(
  "/api/v1/support-agency",
  authMiddleware,
  adminMiddleware,
  supportAgencyRoutes,
);

// country routes
app.use("/api/v1/country", authMiddleware, adminMiddleware, countryRoutes);

// salary routes
app.use("/api/v1/salary", salaryRoutes);

// gift routes
app.use("/api/v1/gift", giftRoutes);

//not found middleware
app.use(notFoundMiddleware);

//error handaling middleware
app.use(errorHandalingMiddleware);

module.exports = app;
