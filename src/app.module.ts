import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as Joi from 'joi';
import { CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { SecretMiddleware } from './middleware';
import { BookingsModule } from './bookings/bookings.module';
import { ApartmentRequestsModule } from './apartment_requests/apartment_requests.module';
import { MaintenanceRequestsModule } from './maintenance-requests/maintenance-requests.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ApartmentsModule,
    BookingsModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 3600000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
        REFRESH_EXPIRES_IN: Joi.string().required(),
        STMP_EMAIL: Joi.string().required(),
        STMP_PASSWORD: Joi.string().required(),
        ALLOWED_ORIGINS: Joi.string().required(),
        SERVER_ACCESS_SECRET: Joi.string().required(),
        SERVER_ACCESS_KEY: Joi.string().required(),
        STORAGE_BUCKET_NAME: Joi.string().required(),
        STORAGE_PROJECT_ID: Joi.string().required(),
        GOOGLE_CLOUD_CREDENTIALS: Joi.string().required(),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: configService.get('STMP_EMAIL'),
              pass: configService.get('STMP_PASSWORD'),
            },
          },
          defaults: {
            from: '"Efortlex" <support@efortlex.com>',
          },
          // for handlebars
          template: {
            dir: join(__dirname, '../src/emails-template'),
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ApartmentRequestsModule,
    MaintenanceRequestsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecretMiddleware).forRoutes('*');
  }
}
