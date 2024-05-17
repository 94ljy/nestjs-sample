import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user/user.service';
import { ConfigModule } from '@app/config/config.module';
import { DatabaseConfig } from '@app/config/databaseConfig';
import { UserRepository } from './repository/userRepository';
import { LoggerModule } from '@app/logger';
import { AuthService } from './service/auth/auth.service';
import { AuthRepository } from './repository/authRepository';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfig],
      useFactory: (databaseConfig: DatabaseConfig) => {
        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: databaseConfig.port,
          database: databaseConfig.database,
          username: databaseConfig.username,
          password: databaseConfig.password,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            // TODO: remove
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
