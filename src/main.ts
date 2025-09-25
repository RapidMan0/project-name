import 'reflect-metadata'; // добавлено
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.useGlobalFilters(new I18nValidationExceptionFilter()); // <-- добавьте эту строку

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

