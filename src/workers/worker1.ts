// worker1.ts

import { Worker } from "bullmq";
import { connection } from "../redis.js";
import type { Job } from "bullmq";

// 如果想要让BullMQ将失败作业添加到失败作业集，应当始终使用`new Error()`抛出异常。
const worker1 = async (job: Job) => {
  await job.updateProgress({ foo: "bar" });
  console.log("worker1", job.id, job.data);
  return job.data;
};

const oneWorker = new Worker(
  "myQueue",
  worker1,
  { connection }
)
// 作业完成时触发
oneWorker.on("completed", (job: Job) => {
  console.log("Worker1 completed", job.returnvalue);
});

// 作业失败时触发
oneWorker.on("failed", (job, error) => {
  console.log("jobId:", job?.id, "error:", error);
});