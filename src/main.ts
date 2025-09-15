import 'reflect-metadata'; // добавлено
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common'; // изменено

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // включаем transform, чтобы числа/типы конвертировались и PartialType корректно работал
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors) => {
      const formatErrors = errors.map((err) => {
        return {
          field: err.property,
          message: Object.values(err.constraints || {}).join(', ')
        };
      });

      return new BadRequestException({
        statusCode: 400,
        errors: formatErrors,
      });
    }
  })); // изменено

  const config = new DocumentBuilder()
    .setTitle('JOSKII SWAG')
    .setDescription('Документация API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

