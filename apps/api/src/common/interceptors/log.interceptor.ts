import { Logger } from '@app/logger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ContextType,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const startTime = Date.now();

    const requestHandler = `${ctx.getClass().name}.${ctx.getHandler().name}`;
    const requestType = ctx.getType();

    const contextInfo = {
      requestHandler,
      requestType,
    };

    if (requestType === 'http') {
      const request = ctx.switchToHttp().getRequest<Request>();

      contextInfo[requestType] = {
        url: request.url,
        method: request.method,
        // TODD: masking sensitive data
        query: request.query,
        body: request.body,
      };
    }

    this.logger.log(contextInfo, this.intercept.name);

    return next.handle().pipe(
      tap((body) => {
        const responseTime = Date.now() - startTime;

        const responseLog = {
          ...contextInfo,
          responseTime,
          response: body,
        };

        this.logger.log(responseLog, this.intercept.name);
      }),
      catchError((error) => {
        const responseTime = Date.now() - startTime;

        const responseLog = {
          ...contextInfo,
          responseTime,
          error,
        };

        this.logger.error(responseLog, this.intercept.name);

        throw error;
      }),
    );
  }
}
