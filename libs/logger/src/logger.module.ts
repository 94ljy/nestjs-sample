import { Module } from '@nestjs/common';
import { Logger } from './logger';
import { LogTracer } from './logTracer';
import { ConfigModule } from '@app/config/config.module';
import * as winston from 'winston';
import { AppConfig } from '@app/config/appConfig';

@Module({
  imports: [ConfigModule],
  providers: [
    Logger,
    LogTracer,
    {
      provide: winston.Logger,
      inject: [AppConfig],
      useFactory: (appConfig: AppConfig) => {
        const formats = [winston.format.timestamp(), winston.format.json()];

        if (appConfig.nodeEnv === 'local') {
          formats.push(winston.format.prettyPrint());
        }

        return winston.createLogger({
          level: appConfig.nodeEnv === 'local' ? undefined : 'info',
          format: winston.format.combine(...formats),
          transports: [new winston.transports.Console({})],
        });
      },
    },
  ],
  exports: [Logger, LogTracer],
})
export class LoggerModule {}
