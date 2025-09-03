import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const port = parseInt(process.env.REDIS_PORT || '6379', 10);

const options = {
  host: process.env.REDIS_HOST || 'redis',
  port,
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
