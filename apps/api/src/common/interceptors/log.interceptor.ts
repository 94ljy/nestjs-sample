import { Logger } from '@app/logger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
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
    const request = ctx.switchToHttp().getRequest<Request>();

    const startTime = Date.now();

    this.logger.log(
      {
        method: request.method,
        path: request.path,
        query: request.query,
        body: request.body,
      },
      this.intercept.name,
    );

    return next.handle().pipe(
      tap((body) => {
        const responseTime = Date.now() - startTime;

        const responseLog = {
          method: request.method,
          path: request.path,
          responseTime,
          body: body,
        };

        this.logger.log(responseLog, this.intercept.name);
      }),
      catchError((error) => {
        const responseTime = Date.now() - startTime;

        const responseLog = {
          method: request.method,
          path: request.path,
          responseTime,
          error: error,
        };

        this.logger.error(responseLog, this.intercept.name);

        throw error;
      }),
    );
  }
}
