import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Vera Stehr', required: false, nullable: true })
  @IsOptional()
  @IsString()
  employerName?: string;

  @ApiProperty({ example: 'Employed', required: false, nullable: true })
  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @ApiProperty({
    example: 'Backend Developer',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiProperty({
    example: '650 Kirlin Islands',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 360000, required: false, nullable: true })
  @IsOptional()
  @IsString()
  monthlyIncome?: string;
}

class Nextofkin {
  @ApiProperty({ example: 'Flora', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiProperty({ example: 'Nguyen', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @ApiProperty({
    example: 'miggonako@avmeh.tz',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '314.912.6210', required: false, nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: '475 Manley Tunnel',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string;
}

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

  @ApiProperty({ type: Employment, required: false, nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => Employment)
  employment?: Employment;

  @ApiProperty({ type: Nextofkin, required: false, nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => Nextofkin)
  nextofkin?: Nextofkin;
}
