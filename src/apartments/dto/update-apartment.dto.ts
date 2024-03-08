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

class Location {
  @IsOptional()
  @IsString()
  approximate: string;

  @IsOptional()
  @IsString()
  precised: string;
}

class ApartmentPricing {
  @IsOptional()
  @IsEnum(DURATION_OF_RENT)
  duration: DURATION_OF_RENT;

  @IsOptional()
  @IsNumber()
  rent: number;

  @IsOptional()
  @IsNumber()
  serviceCharge: number;

  @IsOptional()
  @IsNumber()
  cautionFee: number;

  @IsOptional()
  @IsNumber()
  agreementFee: number;
}

class ApartmentBookingOptions {
  @IsOptional()
  @IsBoolean()
  installment: boolean;

  @IsOptional()
  @IsBoolean()
  selfCheckIn: boolean;
}

export class UpdateApartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(APARTMENT_TYPE)
  apartmentType?: APARTMENT_TYPE;

  @IsOptional()
  @IsEnum(DURATION_OF_RENT, { each: true })
  durationOfRent: DURATION_OF_RENT[];

  @IsOptional()
  @IsNumber()
  numberOfBedroom: number;

  @IsOptional()
  @IsNumber()
  numberOfBathroom: number;

  @IsOptional()
  @IsEnum(APARTMENT_TAGS, { each: true })
  tags: APARTMENT_TAGS[];

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApartmentPricing)
  pricing: ApartmentPricing;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ApartmentBookingOptions)
  bookingOptions: ApartmentBookingOptions;

  @IsArray()
  @IsEnum(AMENITIES, { each: true })
  amenities: AMENITIES[];

  @IsArray()
  @IsString({ each: true })
  houseRule: string[];

  @IsArray()
  @IsString({ each: true })
  otherAmenities: string[];
}
