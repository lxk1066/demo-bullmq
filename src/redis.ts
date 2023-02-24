export const connection = { host: "127.0.0.1", port: 6379 }

/* 使用IORedis模块创建Redis连接 */
// import IORedis from "ioredis";
// const connection = new IORedis(6379, "127.0.0.1", {
//   maxRetriesPerRequest: 0,
// });