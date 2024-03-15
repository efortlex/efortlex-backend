import { ApiProperty } from '@nestjs/swagger';
import {
  AMENITIES,
  APARTMENT_TAGS,
  APARTMENT_TYPE,
  DURATION_OF_RENT,
} from '@prisma/client';

class ApartmentPricing {
  @ApiProperty({
    example: '2be17879-e24f-5520-9edc-b2b4c0f54cf8',
  })
  id: string;

  @ApiProperty({
    example: '1c3f0e2e-c16f-5f04-acba-6e0a670fcf4e',
  })
  apartmentId: string;

  @ApiProperty({ example: 30000 })
  rent: number;

  @ApiProperty({ example: 5000 })
  serviceCharge: number;

  @ApiProperty({ example: 1000 })
  cautionFee: number;

  @ApiProperty({ example: 1200 })
  agreementFee: number;

  @ApiProperty({ example: 37200 })
  total: number;
}

class LocationType {
  @ApiProperty({
    example: '6644290a-1914-56be-b041-c0ac5e4631e0',
  })
  id: string;

  @ApiProperty({
    example: '7ae51d1d-7d93-5957-9fbd-6025d4e04427',
  })
  apartmentId: string;

  @ApiProperty({ example: 'Venezuela' })
  country: string;

  @ApiProperty({ example: 'Florida' })
  state: string;

  @ApiProperty({ example: 'Visalia' })
  city: string;

  @ApiProperty({ example: '93283 Wilderman Point' })
  address: string;

  @ApiProperty({ example: '10001' })
  postalCode: string;
}

class ApartmentBookingOptions {
  @ApiProperty({
    example: 'a1ac8cf9-9e5a-5f08-9908-300d9d02ff54',
  })
  id: string;

  @ApiProperty({
    example: 'a8be44da-1259-5bbb-abd1-c4fd7bbb57d7',
  })
  apartmentId: string;

  @ApiProperty({ example: false })
  installment: boolean;

  @ApiProperty({ example: false })
  selfCheckIn: boolean;
}

export class ApartmentDto {
  @ApiProperty({ example: '2bb98aa0-319c-58bf-a648-d6f53d196708' })
  id: string;

  @ApiProperty({
    example: '8a101d43-c3c7-55f1-8311-a63561339189',
  })
  userId: string;

  @ApiProperty({ example: 'Brent Swanson' })
  name: string;

  @ApiProperty({ example: ['http://loremflickr.com/640/480/city'] })
  images: string[];

  @ApiProperty({ example: 'reginald-yost' })
  slug: string;

  @ApiProperty({ example: ['DAILY'] })
  durationOfRent: DURATION_OF_RENT[];

  @ApiProperty({ example: 'SELF_CONTAINED' })
  apartmentType: APARTMENT_TYPE;

  @ApiProperty({ example: 1.2 })
  rating: number;

  @ApiProperty({ example: false })
  verified: boolean;

  @ApiProperty({ example: 1 })
  numberOfBedroom: number;

  @ApiProperty({ example: 1 })
  numberOfBathroom: number;

  @ApiProperty({
    example: 'Autem asperiores repudiandae voluptatem aut minus itaque rerum.',
  })
  description: string;

  @ApiProperty({ example: false })
  archived: boolean;

  @ApiProperty({ example: ['DUPLEX'] })
  tags: APARTMENT_TAGS[];

  @ApiProperty({ type: ApartmentPricing })
  pricing: ApartmentPricing;

  @ApiProperty({ example: '3779 Brett Run' })
  location: LocationType;

  @ApiProperty({ type: ApartmentBookingOptions })
  bookingOptions: ApartmentBookingOptions;

  @ApiProperty({ type: ['bathtub'] })
  amenities: AMENITIES[];

  @ApiProperty({ type: ['ac'] })
  otherAmenities: string[];

  @ApiProperty({ type: [] })
  houseRule: string[];

  @ApiProperty({ example: 10 })
  totalUnit: number;

  @ApiProperty({ example: 10 })
  avaliableUnits: number;

  @ApiProperty({ example: ['http://loremflickr.com/640/480/city'] })
  policies: string[];

  @ApiProperty({
    example: 'Wed Jul 19 2023 00:08:51 GMT+0100 (West Africa Standard Time)',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Nov 19 2023 07:13:16 GMT+0100 (West Africa Standard Time)',
  })
  updatedAt: Date;
}

export class ApartmentsDto {
  @ApiProperty({ example: 10 })
  totalItems: number;

  @ApiProperty({ type: [ApartmentDto] })
  results: ApartmentDto[];
}
