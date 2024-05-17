import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import { RedisConfig } from '@app/config/redisConfig';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisConfig = app.get(RedisConfig);

  const redis = new Redis(redisConfig.port, redisConfig.host, {
    lazyConnect: true,
  });
  await redis.connect();

  app.use(
    session({
      secret: 'qweqwreqew',
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis,
      }),
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  return app;
}
bootstrap();
