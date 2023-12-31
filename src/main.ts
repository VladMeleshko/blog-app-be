import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: '*',
    origin: true,
    methods: 'GET,PUT,POST,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        // useDefaults: true,
        reportOnly: true
      }
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Blog app')
    .setDescription('Blog app backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3001);
}
bootstrap();
