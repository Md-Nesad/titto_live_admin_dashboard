const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandalingMiddleware = require("./middlewares/errorHandalingMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const adminMiddleware = require("./middlewares/adminMiddleware");
const corsOptions = require("./utils/corsOptions");
const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoute");
const supportAgencyRoutes = require("./routes/supportAgencyRoutes");
const countryRoutes = require("./routes/countryRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const giftRoutes = require("./routes/giftRoute");
const userRoutes = require("./routes/userRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const coinManagement = require("./routes/coinManagement");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

//test route
app.get("/", (req, res) => {
  res.send("Hello World!");
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

// user routes
app.use("/api/v1/users", userRoutes);

// agency routes
app.use("/api/v1/agency", agencyRoutes);

//exchange Rate routes
app.use("/api/v1/transactions", transactionRoutes);

//transaction routes
app.use("/api/v1/coins", coinManagement);

//not found middleware
app.use(notFoundMiddleware);

//error handaling middleware
app.use(errorHandalingMiddleware);

module.exports = app;
