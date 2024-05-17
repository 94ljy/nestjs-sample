import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class LogTracer {
  private readonly asyncLocalStorage = new AsyncLocalStorage<string>();

  startLogTrace<R>(traceId: string, callback: () => R): R {
    return this.asyncLocalStorage.run(traceId, callback);
  }

  getTraceId(): string | undefined {
    const traceId = this.asyncLocalStorage.getStore();

    return traceId;
  }
}
