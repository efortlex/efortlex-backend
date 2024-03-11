import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { faker } from '@faker-js/faker';
// import { readFile, writeFile } from 'fs';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);
      // if (process.env.ALLOWED_ORIGINS.includes(origin) || !origin) {
      //   callback(null, true);
      // } else {
      //   callback(new Error(`Access Denied -> ${origin}`));
      // }
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

// readFile(
//   join(__dirname, '../src/data/apartments.json'),
//   'utf-8',
//   (err, data) => {
//     const json = JSON.parse(data);

//     const newJSON = json.map((value) => ({
//       name: faker.location.street(),
//       images: value.images.map(
//         (image) =>
//           'https://efortlex2-0-8cyw1xup5-professional-service.vercel.app' +
//           image,
//       ),
//       apartmentType: (value.type_of_apartment as string)
//         .replace('2', 'two')
//         .replaceAll(' ', '_')
//         .toUpperCase(),
//       durationOfRent: [value.duration_of_rent.toUpperCase()],
//       numberOfBedroom: value.number_of_bedroom,
//       numberOfBathroom: value.number_of_bathroom,
//       tags: value.tags.map((tag) => tag.toUpperCase()),
//       description: faker.word.words({ count: { min: 40, max: 100 } }),
//       location: value.location,
//       pricing: {
//         duration: value.duration_of_rent.toUpperCase(),
//         rent: value.price.rent,
//         serviceCharge: value.price.rent * 0.1,
//         cautionFee: value.price.rent * 0.2,
//         agreementFee: value.price.rent * 0.05,
//       },
//       bookingOptions: {
//         installment: value.booking_options.installment,
//         selfCheckIn: value.booking_options.self_check_in,
//       },
//       amenities: value.amenities,
//       houseRule: [],
//       otherAmenities: [],
//     }));

//     writeFile(
//       join(__dirname, '../src/data/apartments_1.json'),
//       JSON.stringify(newJSON, null, 2),
//       () => {},
//     );
//   },
// );
