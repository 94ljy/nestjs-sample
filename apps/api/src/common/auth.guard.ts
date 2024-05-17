import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class ApiAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.session.auth !== undefined) {
      return true;
    }

    return false;
  }
}
