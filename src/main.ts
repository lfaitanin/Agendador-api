import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async (module: any) => {
  const app = express();
  const nestApp = await NestFactory.create(module, new ExpressAdapter(app));

  nestApp.setGlobalPrefix('/.netlify/functions/server');
  nestApp.enableCors();
  nestApp.use(helmet());
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  nestApp.use(express.json({ limit: '50mb' }));
  nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));

  await nestApp.init();
  return app;
};

let cachedHadler: any;
const proxyApi = async (module: any, event: any, context: any) => {
  if (!cachedHadler) {
    const app = await bootstrap(module);
    cachedHadler = serverless(app);
  }

  return cachedHadler(event, context);
};

export const handler = async (event: any, context: any) =>
  proxyApi(AppModule, event, context);
