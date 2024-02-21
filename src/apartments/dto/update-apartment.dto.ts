import {
  APARTMENT_TAGS,
  APARTMENT_TYPE,
  DURATION_OF_RENT,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
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

class Amenities {
  @IsOptional()
  @IsBoolean()
  bathtub: boolean;

  @IsOptional()
  @IsBoolean()
  fireSmokeDetector: boolean;

  @IsOptional()
  @IsBoolean()
  cctvCamera: boolean;

  @IsOptional()
  @IsBoolean()
  sittingBar: boolean;

  @IsOptional()
  @IsBoolean()
  acUnit: boolean;

  @IsOptional()
  @IsBoolean()
  doorBell: boolean;

  @IsOptional()
  @IsBoolean()
  laundry: boolean;

  @IsOptional()
  @IsBoolean()
  waterHeater: boolean;

  @IsOptional()
  @IsBoolean()
  outdoorGrill: boolean;

  @IsOptional()
  @IsString({ each: true })
  others: string[];
}

class HouseRule {
  @IsOptional()
  @IsBoolean()
  smoking: boolean;

  @IsOptional()
  @IsBoolean()
  illegalActivities: boolean;

  @IsOptional()
  @IsString()
  gateClose: string;

  @IsOptional()
  @IsString()
  inflammables: string;

  @IsOptional()
  @IsString()
  landlordPermission: string;

  @IsOptional()
  @IsString()
  keyLost: string;

  @IsOptional()
  @IsNumber()
  loudMusic: number;

  @IsOptional()
  @IsBoolean()
  nightParties: boolean;
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

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Amenities)
  amenities: Amenities;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => HouseRule)
  houseRule: HouseRule;
}
