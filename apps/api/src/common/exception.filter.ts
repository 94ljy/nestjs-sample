import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseResponseDto } from './dto/baseResponse.dto';
import { Logger } from '@app/logger';
import { BaseError } from '@app/domain/error/invalidRequest.error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();

    response.status(status).json(BaseResponseDto.ERROR());
  }
}

@Catch(BaseError)
export class BaseErrorFilter implements ExceptionFilter<BaseError> {
  constructor(private readonly logger: Logger) {}

  catch(error: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(HttpStatus.BAD_REQUEST)
      .json(BaseResponseDto.ERROR(error.response, error.errorCode));
  }
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(BaseResponseDto.ERROR());
  }
}
