const Redis = require("ioredis");

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,

  maxRetriesPerRequest: null,
});

client.on("connect", () => {
  console.log("✅ Connected to Redis Cloud");
});

client.on("ready", () => {
  console.log("🚀 Redis is ready");
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

client.on("close", () => {
  console.log("Redis connection closed");
});

module.exports = client;
