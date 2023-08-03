/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI
  });

  const options = new DocumentBuilder()
    .setTitle('Biddler: API')
    .setDescription('Biddler Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));

  Logger.log(
    `🚀 Application is running on: http://localhost:${configService.get(
      'app.port'
    )}/${configService.get('app.apiPrefix')}`
  );
}

bootstrap();
