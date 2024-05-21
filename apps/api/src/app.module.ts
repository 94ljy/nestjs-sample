import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TraceInterceptor } from './common/interceptors/trace.interceptor';
import { LoggerModule } from '@app/logger';
import { HealthController } from './health-api/health.controller';
import {
  AllExceptionFilter,
  HttpExceptionFilter,
  BaseErrorFilter,
} from './common/exception.filter';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { ApiAuthGuard } from './common/guards/auth.guard';
import { AuthApiController } from './auth-api/auth-api.controller';
import { DomainModule } from '@app/domain/domain.module';
import { SessionMiddleware } from './common/middleware/session.middleware';
import { ConfigModule } from '@app/config/config.module';

const interceptors = [TraceInterceptor, LogInterceptor];
const filters = [AllExceptionFilter, HttpExceptionFilter, BaseErrorFilter];

@Module({
  controllers: [HealthController, AuthApiController],
  imports: [DomainModule, LoggerModule, ConfigModule],
  providers: [
    ...interceptors.map((interceptor) => ({
      provide: APP_INTERCEPTOR,
      useClass: interceptor,
    })),
    ...filters.map((filter) => ({
      provide: APP_FILTER,
      useClass: filter,
    })),
    {
      provide: APP_GUARD,
      useClass: ApiAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
