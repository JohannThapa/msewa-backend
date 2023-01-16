import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createSwagger, createSwaggerApp } from './common/swagger';
import CustomConfigs from './shared/constants/configs';

async function bootstrap() {

  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const configs = new CustomConfigs(app);
  const xss = configs.port;
  console.log(xss)
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  console.log(port)

  const origins = [/\.mocksewa\.com$/, 'http://localhost:3000'];
  console.log('origins', origins)
  origins.push(/localhost/);
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });
  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(express.static('public'));
  if (process.env.NODE_ENV !== 'production') {
    createSwagger(app);
  }
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
  // For simply creating swagger without any configs
  // const app = await createSwaggerApp();
  // await app.listen(config.get<number>('PORT'));
}
bootstrap();
