import { Module, OnApplicationShutdown } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user/user.service';
import { ConfigModule } from '@app/config/config.module';
import { DatabaseConfig } from '@app/config/databaseConfig';
import { UserRepository } from './repository/userRepository';
import { Logger, LoggerModule } from '@app/logger';
import { AuthService } from './service/auth/auth.service';
import { AuthRepository } from './repository/authRepository';
import { RedisClient } from './client/redis.client';
import { RedisConfig } from '@app/config/redisConfig';
import { Redis } from 'ioredis';
import { AppConfig } from '@app/config/appConfig';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfig, AppConfig],
      useFactory: (databaseConfig: DatabaseConfig, appConfig: AppConfig) => {
        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: databaseConfig.port,
          database: databaseConfig.database,
          username: databaseConfig.username,
          password: databaseConfig.password,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl:
            appConfig.nodeEnv === 'local'
              ? false
              : {
                  rejectUnauthorized: false,
                },
        };
      },
    }),
  ],
  providers: [
    UserService,
    UserRepository,
    AuthService,
    AuthRepository,
    {
      // TODO: 별도의 모듈로 분리
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
  exports: [UserService, AuthService, RedisClient],
})
export class DomainModule implements OnApplicationShutdown {
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
