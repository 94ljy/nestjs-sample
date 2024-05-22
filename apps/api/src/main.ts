import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  await app.listen(3000);

  app.enableShutdownHooks();

  return app;
}
bootstrap();
