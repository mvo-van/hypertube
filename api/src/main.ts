import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8000',
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  const config = new DocumentBuilder()
    .setTitle("Hypertube API")
    .setDescription("Routes list")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
