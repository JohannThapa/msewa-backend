import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'src/app.module';
import { INITIAL_URL, SWAGGER_NAME, SWAGGER_VERSION } from './constant';
    /**
 * * Important comments
 * ! Warning comments
 * ? Question comments
 * TODO: Refactor comments
 * @param number
 */
export const createSwagger = (app: INestApplication): void => {

    const options = new DocumentBuilder()
        .setTitle(`${SWAGGER_NAME} Swagger`)
        .setDescription(`The ${SWAGGER_NAME} v${SWAGGER_VERSION} API description`)
        .setVersion(SWAGGER_VERSION)
        .addTag(SWAGGER_NAME.toLowerCase())
        .build();

    // TODO: Use this after whole setup.
    const docs = SwaggerModule.createDocument(app, options, {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    })

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(INITIAL_URL, app, document);
}
export async function createSwaggerApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);


    const options = new DocumentBuilder()
        .setTitle(`${SWAGGER_NAME} Swagger`)
        .setDescription(`The ${SWAGGER_NAME} v${SWAGGER_VERSION} API description`)
        .setVersion(SWAGGER_VERSION)
        .addTag(SWAGGER_NAME.toLowerCase())
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(INITIAL_URL, app, document);

    return app;
}
