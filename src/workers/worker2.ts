// worker2.ts

import { Worker } from "bullmq";
import { connection } from "../redis.js";
import type { Job } from "bullmq";

const worker2 = async function (job: Job) {
  console.log("worker2", job.id, job.data);
  return job.data;
}

const twoWorker = new Worker(
  "myQueue",
  worker2,
  { connection }
)
// 作业完成时触发
twoWorker.on("completed", (job: Job) => {
  console.log("Worker2 completed", job.returnvalue);
});

// 作业失败时触发
twoWorker.on("failed", (job, error) => {
  console.log("jobId:", job?.id, "error:", error);
});