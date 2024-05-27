export const ErrorCode = {
  INVALID_REQUEST: 400, // 클라이언트 에러
  INTERNAL_SERVER_ERROR: 500, // 서버 에러
} as const;
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export class BaseError extends Error {
  constructor(
    readonly response: any,
    readonly errorCode: ErrorCode,
  ) {
    super();
  }
}

export class InvalidRequestError extends BaseError {
  constructor(message: string) {
    super(message, ErrorCode.INVALID_REQUEST);
  }
}
