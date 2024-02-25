import { ApiProperty } from '@nestjs/swagger';
import { MAINTENANCE_URGENCY } from '@prisma/client';
import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateMaintenanceRequestDto {
  @ApiProperty({ example: 'Bathroom door key broken' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['http://icilod.nc/bonruwal'] })
  @IsString({ each: true })
  @IsArray()
  attachments: string[];

  @ApiProperty({ example: 'HIGH' })
  @IsEnum(MAINTENANCE_URGENCY)
  urgency: MAINTENANCE_URGENCY;

  @ApiProperty({
    example: 'Wed Feb 07 2024 16:37:08 GMT+0100 (West Africa Standard Time)',
  })
  @IsDateString()
  preferredDate: Date;
}
