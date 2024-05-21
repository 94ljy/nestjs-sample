import { AppConfig } from '@app/config/appConfig';
import { RedisClient } from '@app/domain/client/redis.client';
import { Injectable, NestMiddleware } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  handler: RequestHandler;

  constructor(redisClient: RedisClient, appConfig: AppConfig) {
    this.handler = session({
      name: 'sid',
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
      },
      secret: appConfig.sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
      }),
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.handler(req, res, next);
  }
}
