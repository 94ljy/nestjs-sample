import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './databaseConfig';
import { AppConfig } from './appConfig';
import { RedisConfig } from './redisConfig';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['env/.local.env'],
    }),
  ],
  providers: [DatabaseConfig, AppConfig, RedisConfig],
  exports: [DatabaseConfig, AppConfig, RedisConfig],
})
export class ConfigModule {}
