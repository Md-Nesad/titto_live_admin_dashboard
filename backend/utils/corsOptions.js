const corsOptions = {
  origin: ["http://localhost:5173", process.env.CLIENT_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = corsOptions;
