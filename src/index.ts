// index.ts

import { Queue } from "bullmq";
import { connection } from "./redis.js";

// 创建队列实例
const myQueue = new Queue("myQueue", {
  connection,
  defaultJobOptions: {
    // 默认作业选项
    removeOnComplete: true, // 所有已完成的作业都将自动删除
    removeOnFail: 500, // 将最后500个失败的作业保留在队列中
    attempts: 3, // 重试失败作业的最多尝试次数
    backoff: { // 使用内置退避策略，用于重试失败作业
      // type: "fixed", // 每隔一段时间就重试失败作业，间隔时间为`delay`
      type: "exponential", // 指数退避，即在 2 ^ (第几次重试 - 1) * delay 毫秒后重试
      delay: 3000 // 重试失败作业的间隔时间
    }
  }
});

// 导入工人
import "./workers/worker1.js";
import "./workers/worker2.js";

// 导入生产者，添加任务
import { addJobs } from "./producer.js";

addJobs(myQueue);