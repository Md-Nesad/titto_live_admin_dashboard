const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const emailQueue = new Queue("email_verification", {
  connection: redisConnection,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 5000,
    },

    removeOnComplete: {
      age: 3600,
      count: 500,
    },

    removeOnFail: {
      age: 3600,
      count: 500,
    },
  },
});

module.exports = emailQueue;
