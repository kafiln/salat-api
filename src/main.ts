import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { initSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}

bootstrap();
