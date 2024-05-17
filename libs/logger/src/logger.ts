import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { LogTracer } from './logTracer';
import { randomUUID } from 'crypto';
import { AppConfig } from '@app/config/appConfig';

@Injectable()
export class Logger {
  private readonly logger: winston.Logger;
  constructor(
    private readonly logTracer: LogTracer,
    appConfig: AppConfig,
  ) {
    const formats = [winston.format.timestamp(), winston.format.json()];

    if (appConfig.nodeEnv === 'local') {
      formats.push(winston.format.prettyPrint());
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(...formats),
      transports: [new winston.transports.Console()],
    });
  }

  private _log(
    level: 'error' | 'warn' | 'info' | 'verbose' | 'debug',
    message: any,
    context: string,
  ) {
    const traceId = this.logTracer.getTraceId();
    const logId = randomUUID();

    this.logger.log(level, {
      logId,
      traceId,
      context,
      message,
    });
  }

  error(error: any, context: string) {
    this._log('error', error, context);
  }

  warn(message: any, context: string) {
    this._log('warn', message, context);
  }

  log(message: any, context: string) {
    this._log('info', message, context);
  }

  verbose(message: any, context: string) {
    this._log('verbose', message, context);
  }

  debug(message: any, context: string) {
    this._log('debug', message, context);
  }
}
