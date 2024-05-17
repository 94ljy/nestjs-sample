import { Controller, Get } from '@nestjs/common';
import { BaseResponseDto } from '../common/baseResponseDto';

@Controller()
export class HealthController {
  @Get('/health')
  check() {
    return BaseResponseDto.OK_WITH_MESSAGE({ message: 'API is running' });
  }
}
