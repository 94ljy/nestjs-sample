import { Controller, Get } from '@nestjs/common';
import { BaseResponseDto } from '../common/dto/baseResponse.dto';
import { Public } from '../common/guards/public.decorator';

@Controller()
export class HealthController {
  @Public()
  @Get('/health')
  check() {
    return BaseResponseDto.OK_WITH_MESSAGE({ message: 'API is running' });
  }
}
