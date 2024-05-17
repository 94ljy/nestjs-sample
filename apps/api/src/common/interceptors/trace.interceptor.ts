import { LogTracer } from '@app/logger/logTracer';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, firstValueFrom, tap } from 'rxjs';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  constructor(private readonly logTracer: LogTracer) {}

  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const traceId = randomUUID();

    return new Observable((sub) => {
      this.logTracer.startLogTrace(traceId, () => {
        next.handle().subscribe({
          next: (value) => {
            sub.next(value);
          },
          error: (error) => {
            sub.error(error);
          },
          complete: () => {
            sub.complete();
          },
        });
      });
    });
  }
}
