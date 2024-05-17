import { Module } from '@nestjs/common';
import { Logger } from './logger';
import { LogTracer } from './logTracer';
import { ConfigModule } from '@app/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [Logger, LogTracer],
  exports: [Logger, LogTracer],
})
export class LoggerModule {}
