import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

export const initSwagger = (app: INestApplication<AppModule>) => {
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Salat')
    .setDescription('Daily and monthly prayer times in the cities of Morocco')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
      version: string
    ) => methodKey,
  });

  SwaggerModule.setup('api', app, document, { explorer: false });
};
