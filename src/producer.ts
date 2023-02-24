// producer.ts 负责生产任务

import type { Queue } from "bullmq";

export async function addJobs(queue: Queue) {
  /**
   * 压力测试
   * 如果循环次数太少，只会有一个worker工作，
   * 如果次数太多，多个worker会分担队列中的任务
  */

  console.log("Adding jobs...");
  for (let i = 0; i < 10000; i++) {
    await queue.add("my-job", { foo: "bar" });
  }
  console.log("done!");
}
