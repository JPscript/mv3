// NestJS: main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuramos la ruta absoluta
  // Usamos process.cwd() que apunta a "C:\...\api-restaurantes"
  // Cambia la línea de publicPath por esta ruta fija de Windows:
  const publicPath =
    'C:\\Users\\josel\\OneDrive\\Escritorio\\MASTER\\mv3\\jl\\sin-ia\\nestjs\\api-restaurantes\\files';

  app.useStaticAssets(publicPath, {
    prefix: '/files/',
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ... resto de tus pipes
  await app.listen(3000);
}
bootstrap();
