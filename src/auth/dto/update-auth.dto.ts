import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  MinLength,
  IsPhoneNumber,
  IsDateString,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateAuthDto {
  @ApiProperty({
    description: 'User given name (Optional)',
    example: 'John',
  })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiProperty({
    description: 'User family name (Optional)',
    example: 'Doe',
  })
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @ApiProperty({
    description: 'User phone number (Optional)',
    example: '+23492772288288',
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({
    description: 'User photoURL (Optional)',
    example: 'http://micazi.tn/mi',
  })
  @IsOptional()
  @IsUrl()
  photoURL?: string;

  @ApiProperty({
    description: 'User date of birth (Optional)',
    example: '01-21-2003',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'User address (Optional)',
    example: '82977 Frami Key',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'User state (Optional)',
    example: 'Virginia',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'User country (Optional)',
    example: 'Zambia',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'User given name (Optional)',
    example: 'East',
  })
  @IsOptional()
  @IsString()
  landmark?: string;
}
