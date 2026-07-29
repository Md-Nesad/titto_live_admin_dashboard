const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const deathQueue = new Queue("dead_letter_queue", {
  connection: redisConnection,

  defaultJobOptions: {
    removeOnComplete: {
      age: 3600,
      count: 500,
    },

    removeOnFail: {
      age: 3600,
      count: 1000,
    },
  },
});

module.exports = deathQueue;
