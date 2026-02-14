import Redis from "ioredis";

// Env is loaded by backend/env.js before this runs
const redisUri = process.env.REDIS_URI || "redis://localhost:6379";
export const redis = new Redis(redisUri);

let redisErrorLogged = false;
redis.on("error", (err) => {
  if (redisErrorLogged) return;
  redisErrorLogged = true;
  if (err.message?.includes("ECONNREFUSED")) {
    console.error("Redis: Cannot connect. Is Redis running? Use REDIS_URI in .env (e.g. redis://localhost:6379).");
  } else if (err.message?.includes("NOAUTH")) {
    console.error("Redis: Authentication required. Set REDIS_URI with password in .env, e.g. redis://:yourpassword@localhost:6379");
  } else {
    console.error("Redis error:", err.message);
  }
});
