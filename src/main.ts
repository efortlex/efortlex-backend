import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
}
bootstrap();
