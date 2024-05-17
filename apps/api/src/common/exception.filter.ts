import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseResponseDto } from './baseResponseDto';
import { Logger } from '@app/logger';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(BaseResponseDto.ERROR());
  }
}
