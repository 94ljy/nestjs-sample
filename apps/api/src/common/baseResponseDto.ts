export class BaseResponseDto<T> {
  status: string;
  message: string;
  data: T;

  static OK() {
    const response = new BaseResponseDto();
    response.status = 'OK';
    response.message = '';
    response.data = null;
    return response;
  }

  static OK_WITH_MESSAGE<T>(data: T) {
    const response = new BaseResponseDto<T>();
    response.status = 'OK';
    response.message = '';
    response.data = data;
    return response;
  }

  static UNAUTHORIZED() {
    const response = new BaseResponseDto();
    response.status = 'UNAUTHORIZED';
    response.message = 'Unauthorized';
    return response;
  }

  static ERROR() {
    const response = new BaseResponseDto();
    response.status = 'ERROR';
    response.message = 'Internal server error';

    return response;
  }
}
