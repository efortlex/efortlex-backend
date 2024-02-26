import { ApiProperty } from '@nestjs/swagger';
import { GENDER, TWO_FACTOR_AUTHENTICATION } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Celia', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiProperty({ example: 'Cook', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @ApiProperty({ example: 'MALE', required: false, nullable: true })
  @IsOptional()
  @IsEnum(GENDER)
  gender?: GENDER;

  @ApiProperty({
    example: 'Sat Feb 10 2024 23:25:34 GMT+0100 (West Africa Standard Time)',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty({ example: '(275) 321-7285', required: false, nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: '14517 Kris Pine', required: false, nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Washington', required: false, nullable: true })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'China', required: false, nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'South', required: false, nullable: true })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ example: 'South', required: false, nullable: true })
  @IsOptional()
  @IsEnum(TWO_FACTOR_AUTHENTICATION)
  twoFactorAuthentication?: TWO_FACTOR_AUTHENTICATION;
}
