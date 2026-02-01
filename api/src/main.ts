import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MockDataService } from './mock-data/mock-data.service';
import cookieParser from 'cookie-parser';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET'],
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static',
    setHeaders: (res: Response, path: string, stat: any) => {
      res.setHeader('Content-Type', 'application/x-mpegURL');
    },
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Hypertube API')
    .setDescription('Routes list')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const mocker = app.get(MockDataService);
  await mocker.bootstrap();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
