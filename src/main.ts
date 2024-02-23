import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: function (origin, callback) {
      if (process.env.ALLOWED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`Access Denied -> ${origin}`));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Efortlex API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT, async () => {
    console.log(`🚀 Server ready at  http://localhost:${process.env.PORT}/`);
  });
}
bootstrap();
