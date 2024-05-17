import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface RequestUser {
  email: string;
  userId: string;
}

export const RequestUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.session.auth as RequestUser;
  },
);
