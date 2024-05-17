import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ConfigModule } from '@app/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
