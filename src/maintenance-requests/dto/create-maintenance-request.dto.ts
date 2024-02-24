import { ApiProperty } from '@nestjs/swagger';
import { MAINTENANCE_STATUS, MAINTENANCE_URGENCY } from '@prisma/client';
import { IsDateString, IsEnum, IsString, IsUrl } from 'class-validator';

export class CreateMaintenanceRequestDto {
  @ApiProperty({ example: 'Bathroom door key broken' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'http://icilod.nc/bonruwal' })
  @IsString()
  @IsUrl()
  attachment: string;

  @ApiProperty({ example: 'HIGH' })
  @IsEnum(MAINTENANCE_URGENCY)
  urgency: MAINTENANCE_URGENCY;

  @ApiProperty({ example: 'RESOLVED' })
  @IsEnum(MAINTENANCE_STATUS)
  status: MAINTENANCE_STATUS;

  @ApiProperty({
    example: 'Wed Feb 07 2024 16:37:08 GMT+0100 (West Africa Standard Time)',
  })
  @IsDateString()
  preferredDate: Date;
}
