import { GENDER } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Employment {
  @IsOptional()
  @IsString()
  employerName?: string;

  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  monthlyIncome?: string;
}

class Nextofkin {
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsEnum(GENDER)
  gender?: GENDER;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  landmark?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Employment)
  employment?: Employment;

  @IsOptional()
  @ValidateNested()
  @Type(() => Nextofkin)
  nextofkin?: Nextofkin;
}
