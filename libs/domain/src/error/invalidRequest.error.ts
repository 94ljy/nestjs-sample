export const ErrorCode = {
  INVALID_REQUEST: 100, // 별도의 핸들링이 필요 없는 경우
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
