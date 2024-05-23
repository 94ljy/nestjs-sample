import { Module, OnApplicationShutdown } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user/user.service';
import { ConfigModule } from '@app/config/config.module';
import { DatabaseConfig } from '@app/config/databaseConfig';
import { UserRepository } from './repository/userRepository';
import { LoggerModule } from '@app/logger';
import { AuthService } from './service/auth/auth.service';
import { AuthRepository } from './repository/authRepository';

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
  providers: [UserService, UserRepository, AuthService, AuthRepository],
  exports: [UserService, AuthService],
})
export class DomainModule {}
