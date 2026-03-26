import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: true, credentials: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // ESTO ES LO QUE SIRVE TUS FOTOS
  app.useStaticAssets(join(process.cwd(), 'files'), {
    prefix: '/files/',
  });

  await app.listen(3000);
}
bootstrap();
