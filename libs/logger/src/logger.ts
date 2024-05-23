import { Inject, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { LogTracer } from './logTracer';
import { randomUUID } from 'crypto';
import { INQUIRER } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger {
  private parentClassName: string;
  constructor(
    private readonly logTracer: LogTracer,
    private readonly winstonLogger: winston.Logger,
    @Inject(INQUIRER) private parentClass: object,
  ) {
    this.parentClassName = this.parentClass?.constructor?.name;
  }

  private _log(
    level: 'error' | 'warn' | 'info' | 'verbose' | 'debug',
    message: any,
    context: string,
  ) {
    const traceId = this.logTracer.getTraceId();
    const logId = randomUUID();

    this.winstonLogger.log(level, {
      logId,
      traceId,
      context: `${this.parentClassName}.${context}`,
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
