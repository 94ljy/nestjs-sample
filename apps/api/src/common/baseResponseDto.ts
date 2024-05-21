import { ErrorCode } from '@app/domain/error/invalidRequest.error';

export class BaseResponseDto<T> {
  status: string;
  errorCode?: ErrorCode;
  data: T;

  static OK() {
    const response = new BaseResponseDto();
    response.status = 'OK';
    response.data = null;
    return response;
  }

  static OK_WITH_MESSAGE<T>(data: T) {
    const response = new BaseResponseDto<T>();
    response.status = 'OK';
    response.data = data;
    return response;
  }

  static UNAUTHORIZED() {
    const response = new BaseResponseDto();
    response.status = 'UNAUTHORIZED';
    return response;
  }

  static ERROR(data?: any, errorCode?: ErrorCode) {
    const response = new BaseResponseDto();
    response.status = 'ERROR';
    response.data = data;
    response.errorCode = errorCode;

    return response;
  }
}
