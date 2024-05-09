import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'; //protección a ciertos ataques de inyección 
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    bufferLogs: true,
    cors: {
      origin: true,
      preflightContinue: false,
    }
  });
  app.enable('trust proxy')
  app.use(helmet());
  app.use(json({ limit: '50mb'}))
  app.use(urlencoded({ limit: '50mb', extended: true}))
  app.useGlobalPipes(new ValidationPipe({ transform: true}))
  await app.listen(3000);
}
bootstrap();
