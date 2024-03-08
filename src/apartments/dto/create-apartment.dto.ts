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
  IsString,
  ValidateNested,
} from 'class-validator';

export class ApartmentPricing {
  @ApiProperty({ example: 'DAILY' })
  @IsEnum(DURATION_OF_RENT)
  duration: DURATION_OF_RENT;

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

class Location {
  @ApiProperty({ example: 'Kihn Points' })
  @IsString()
  approximate: string;

  @ApiProperty({ example: '4288 Marjorie Mount' })
  @IsString()
  precised: string;
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

  @ApiProperty({ example: ['http://loremflickr.com/640/480/fashion'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: 'ONE_BEDROOM' })
  @IsEnum(APARTMENT_TYPE)
  apartmentType: APARTMENT_TYPE;

  @ApiProperty({ example: ['DAILY'] })
  @IsEnum(DURATION_OF_RENT, { each: true })
  durationOfRent: DURATION_OF_RENT[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  numberOfBedroom: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  numberOfBathroom: number;

  @ApiProperty({ example: ['DUPLEX'] })
  @IsEnum(APARTMENT_TAGS, { each: true })
  tags: APARTMENT_TAGS[];

  @ApiProperty({
    example:
      'forward were begun written chart truck doll motion choose lead pound write globe breeze year pass bent race single lamp moment pony theory present',
  })
  @IsString()
  description: string;

  @ApiProperty({ type: Location })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ApiProperty({ type: ApartmentPricing })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApartmentPricing)
  pricing: ApartmentPricing;

  @ApiProperty({ type: ApartmentBookingOptions })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApartmentBookingOptions)
  bookingOptions: ApartmentBookingOptions;

  @ApiProperty({ example: ['bathtub'] })
  @IsArray()
  @IsEnum(AMENITIES, { each: true })
  amenities: AMENITIES[];

  @ApiProperty({ example: ['No smoking'] })
  @IsArray()
  @IsString({ each: true })
  houseRule: string[];

  @ApiProperty({ example: ['flashlight'] })
  @IsArray()
  @IsString({ each: true })
  otherAmenities: string[];
}
