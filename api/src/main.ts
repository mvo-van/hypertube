import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MockDataService } from './mock-data/mock-data.service';
import cookieParser from 'cookie-parser';
import { existsSync, mkdirSync } from 'fs';

const logger: Logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true,
    // allowedHeaders: '*',
    // methods: ['GET'],
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  ensureStatic(app);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Hypertube API')
    .setDescription('Routes list')
    .setVersion('1.0')
    .build();

  const mocker = app.get(MockDataService);
  await mocker.bootstrap();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

function ensureStatic(app: NestExpressApplication) {
  const folderpath = join(__dirname, '..', 'static');

  try {
    if (!existsSync(folderpath)) {
      logger.log(`Creating ${folderpath}`);
      mkdirSync(folderpath);
    }
  } catch (err) {
    logger.error(err);
  }
  app.useStaticAssets(folderpath, {
    prefix: '/static',
  });
}
