import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '60 s'), // 10 requests every 10 seconds
  
});

export default ratelimit;