require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");
const client = require("./config/redis");
require("./workers/emailWorker");

const startServer = async () => {
  try {
    //connect database
    await connectDb();

    const PORT = process.env.PORT;

    const otp = await client.get(`otp:nesadm26@gmail.com`);
    console.log(otp);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server " + error.message);
  }
};

startServer();
