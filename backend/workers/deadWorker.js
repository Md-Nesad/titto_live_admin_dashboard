const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");

const deadWorker = new Worker(
  "dead_letter_queue",
  async (job) => {
    console.log(`Processing job: ${job.name}`);

    const {
      originalJobId,
      originalJobName,
      originalData,
      failedReason,
      attemptsMade,
      failedAt,
    } = job.data;

    console.error(
      `
      DEAD LETTER JOB

      Original Job: ${originalJobId}
      Job Name: ${originalJobName}
      Email: ${originalData.email}
      Reason: ${failedReason}
      Attempts: ${attemptsMade}
      Failed At: ${failedAt}
      `,
    );

    //production services here
  },
  {
    connection: redisConnection,

    concurrency: 10,

    limiter: {
      max: 100,
      duration: 60000,
    },
  },
);

deadWorker.on("completed", (job) => {
  console.log(`job completed-${job.id}`);
});

deadWorker.on("failed", (job, error) => {
  console.log(`Processing failed-${job.id}`, error);
});
