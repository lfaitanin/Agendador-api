import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const config = new DocumentBuilder()
    .setTitle('Scheduler API')
    .setDescription('Api to scheduler')
    .setVersion('1.0')
    .addTag('Scheduler')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(port);
}
bootstrap();
