import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfig {
  host = process.env.REDIS_HOST || 'localhost';
  port = Number(process.env.REDIS_PORT) || 6379;
  password = process.env.REDIS_PASSWORD || '';
}
