import { ApiProperty } from '@nestjs/swagger';
import {
  AMENITIES,
  APARTMENT_TAGS,
  APARTMENT_TYPE,
  DURATION_OF_RENT,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ApartmentPricing {
  @ApiProperty({ example: 200000 })
  @IsNumber()
  rent: number;

  @ApiProperty({ example: 20000 })
  @IsNumber()
  serviceCharge: number;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  cautionFee: number;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  agreementFee: number;
}

class ApartmentBookingOptions {
  @ApiProperty({ example: true })
  @IsBoolean()
  installment: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  selfCheckIn: boolean;
}

export class CreateApartmentDto {
  @ApiProperty({ example: 'District Division' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ONE_BEDROOM' })
  @IsEnum(APARTMENT_TYPE)
  apartmentType: APARTMENT_TYPE;

  @ApiProperty({ example: 200000 })
  @IsNumber()
  rent: number;

  @ApiProperty({ example: 8 })
  @IsNumber()
  avaliableUnits: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  totalUnit: number;

  @ApiProperty({ example: 'Zimbabwe' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Rhode Island' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Bell Gardens' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Kihn Points' })
  @IsString()
  address: string;

  @ApiProperty({ example: '1001100' })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({
    example:
      'forward were begun written chart truck doll motion choose lead pound write globe breeze year pass bent race single lamp moment pony theory present',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: ['No smoking'] })
  @IsArray()
  @IsString({ each: true })
  houseRule: string[];

  @ApiProperty({ example: ['flashlight'] })
  @IsArray()
  @IsString({ each: true })
  otherAmenities: string[];

  @ApiProperty({ example: ['bathtub'] })
  @IsArray()
  @IsEnum(AMENITIES, { each: true })
  amenities: AMENITIES[];

  @ApiProperty({ example: 'DAILY' })
  @IsEnum(DURATION_OF_RENT, { each: true })
  durationOfRent: DURATION_OF_RENT;

  @ApiProperty({ example: ['http://loremflickr.com/640/480/fashion'] })
  @IsArray()
  @IsString({ each: true })
  policies: string[];

  @ApiProperty({ example: ['http://loremflickr.com/640/480/fashion'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  // @ApiProperty({ example: 1 })
  // @IsNumber()
  // numberOfBedroom: number;

  // @ApiProperty({ example: 1 })
  // @IsNumber()
  // numberOfBathroom: number;

  @ApiProperty({ example: ['DUPLEX'] })
  @IsEnum(APARTMENT_TAGS, { each: true })
  tags: APARTMENT_TAGS[];

  @ApiProperty({ type: ApartmentBookingOptions })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApartmentBookingOptions)
  bookingOptions: ApartmentBookingOptions;
}
