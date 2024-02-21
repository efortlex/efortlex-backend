import {
  IsOptional,
  MinLength,
  IsPhoneNumber,
  IsDateString,
  IsString,
} from 'class-validator';

export class UpdateAuthDto {
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @MinLength(3)
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  landmark: string;
}
