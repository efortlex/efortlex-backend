import { ApiProperty } from '@nestjs/swagger';
import { APARTMENT_TYPE } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateApartmentRequestDto {
  @ApiProperty({ example: 'Iowa' })
  @IsString()
  location: string;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  budget: number;

  @ApiProperty({ example: 'ONE_BEDROOM' })
  @IsEnum(APARTMENT_TYPE)
  apartmentType: APARTMENT_TYPE;
}
