import Redis from 'ioredis';

const port = parseInt(process.env.REDIS_PORT || '6379', 10);

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port,
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (error) => {
  console.log('Redis connection error: ', error);
});

export default redis;
