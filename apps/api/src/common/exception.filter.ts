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
import { BaseError, ErrorCode } from '@app/domain/error/invalidRequest.error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();

    const body = exception.getResponse();
    if (body instanceof Object) {
      delete body['error'];
      delete body['statusCode'];
    }

    let errorCode: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;

    if (status > 400 && status < 500) {
      errorCode = ErrorCode.INVALID_REQUEST;
    }

    response.status(status).json(BaseResponseDto.ERROR(body, errorCode));
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
