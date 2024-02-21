import {
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
  @IsEnum(DURATION_OF_RENT)
  duration: DURATION_OF_RENT;

  @IsNumber()
  rent: number;

  @IsNumber()
  serviceCharge: number;

  @IsNumber()
  cautionFee: number;

  @IsNumber()
  agreementFee: number;
}

class Location {
  @IsString()
  approximate: string;

  @IsString()
  precised: string;
}

class ApartmentBookingOptions {
  @IsBoolean()
  installment: boolean;

  @IsBoolean()
  selfCheckIn: boolean;
}

class Amenities {
  @IsBoolean()
  bathtub: boolean;

  @IsBoolean()
  fireSmokeDetector: boolean;

  @IsBoolean()
  cctvCamera: boolean;

  @IsBoolean()
  sittingBar: boolean;

  @IsBoolean()
  acUnit: boolean;

  @IsBoolean()
  doorBell: boolean;

  @IsBoolean()
  laundry: boolean;

  @IsBoolean()
  waterHeater: boolean;

  @IsBoolean()
  outdoorGrill: boolean;

  @IsString({ each: true })
  others: string[];
}

class HouseRule {
  @IsBoolean()
  smoking: boolean;

  @IsBoolean()
  illegalActivities: boolean;

  @IsString()
  gateClose: string;

  @IsString()
  inflammables: string;

  @IsString()
  landlordPermission: string;

  @IsString()
  keyLost: string;

  @IsNumber()
  loudMusic: number;

  @IsBoolean()
  nightParties: boolean;
}

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsEnum(APARTMENT_TYPE)
  apartmentType: APARTMENT_TYPE;

  @IsEnum(DURATION_OF_RENT, { each: true })
  durationOfRent: DURATION_OF_RENT[];

  @IsNumber()
  numberOfBedroom: number;

  @IsNumber()
  numberOfBathroom: number;

  @IsEnum(APARTMENT_TAGS, { each: true })
  tags: APARTMENT_TAGS[];

  @IsString()
  description: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

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
