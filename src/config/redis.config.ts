import Redis from "ioredis";

let redis: Redis;

// ✅ Prefer full REDIS_URL (for Render)
if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
} else {
  // ✅ Fallback to host + port (for local docker-compose)
  const port = parseInt(process.env.REDIS_PORT || "6379", 10);
  redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port,
  });
}

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("❌ Redis connection error: ", error);
});

export default redis;
