const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const sendOtp = require("../utils/otpSendToMail");
const deathQueue = require("../queue/deadLetterQueue");

const emailWorker = new Worker(
  "email_verification",
  async (job) => {
    console.log("Processing job:", job.name);

    if (job.name === "send_verification_email") {
      const { email, otp } = job.data;

      await sendOtp(email, otp);

      console.log("send top");
    }

    if (job.name === "resend_verification_otp") {
      const { email, newOTP } = job.data;

      await sendOtp(email, newOTP);

      console.log("Resend otp");
    }
  },
  {
    connection: redisConnection,

    concurrency: 10, // Adjust concurrency as needed

    limiter: {
      max: 100,
      duration: 60000,
    },
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on("failed", async (job, error) => {
  console.error(`Job ${job?.id} failed:`, error.message);

  console.log(job.attemptsMade);

  if (job.attemptsMade >= job.opts.attempts) {
    try {
      await deathQueue.add(
        "failed_email_job",
        {
          originalJobId: job.id,
          jobName: job.name,
          jobData: job.data,
          failedReason: error.message,
          attempsMade: job.attemptsMade,
          failedAt: new Date().toISOString(),
        },
        { jobId: `dlq-${job.id}` },
      );
    } catch (dlqError) {
      console.error(`[DLQ] Failed to add job ${job.id}`, dlqError);
    }
  }
});

module.exports = emailWorker;
