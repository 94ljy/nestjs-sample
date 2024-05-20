import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './common/interceptors/trace.interceptor';
import { LoggerModule } from '@app/logger';
import { HealthController } from './health-api/health.controller';
import {
  AllExceptionFilter,
  HttpExceptionFilter,
} from './common/exception.filter';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { ApiAuthGuard } from './common/guards/auth.guard';
import { AuthApiController } from './auth-api/auth-api.controller';
import { DomainModule } from '@app/domain/domain.module';

@Module({
  controllers: [HealthController, AuthApiController],
  imports: [DomainModule, LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TraceInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ApiAuthGuard,
    },
  ],
})
export class AppModule {}
