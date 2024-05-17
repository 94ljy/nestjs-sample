import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api.controller';
import { DomainModule } from '@app/domain/domain.module';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [DomainModule, LoggerModule],
  controllers: [AuthApiController],
  providers: [],
})
export class AuthApiModule {}
