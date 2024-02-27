import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'e40a6c07-80aa-5f20-becd-1c8d66205477' })
  @IsString()
  @IsUUID()
  apartmentId: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isScheduled: boolean;

  @ApiProperty({
    example: 'Wed Apr 12 2023 05:21:40 GMT+0100 (West Africa Standard Time)',
  })
  @IsDateString()
  inspectionDate: Date;
}
