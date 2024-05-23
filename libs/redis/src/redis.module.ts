import { ConfigModule } from '@app/config/config.module';
import { RedisConfig } from '@app/config/redisConfig';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisClient } from './redis.client';
import { Logger, LoggerModule } from '@app/logger';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    {
      provide: RedisClient,
      inject: [RedisConfig],
      useFactory: async (redisConfig: RedisConfig) => {
        const redisClient = new Redis(redisConfig.port, redisConfig.host, {
          lazyConnect: true,
        });

        await redisClient.connect();

        return redisClient;
      },
    },
  ],
  exports: [RedisClient],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly logger: Logger,
  ) {}

  async onApplicationShutdown(signal?: string | undefined) {
    this.logger.log(
      `Shutting down redis client with signal: ${signal}`,
      this.onApplicationShutdown.name,
    );
    await this.redisClient.quit();
  }
}
