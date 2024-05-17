import { Controller, Get, Req } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Request } from 'express';

@Controller()
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Get()
  getHello(@Req() req: Request): string {
    return this.batchService.getHello();
  }
}
