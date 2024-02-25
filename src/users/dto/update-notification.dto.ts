import { ApiProperty } from '@nestjs/swagger';
import { NOTIFICATION_ENUM } from '@prisma/client';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({ example: ['EMAIL'], required: false, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  loginAlerts?: NOTIFICATION_ENUM[];

  @ApiProperty({ example: ['PUSH'], required: false, nullable: true })
  @IsOptional()
  @IsArray()
  bookingAlerts?: NOTIFICATION_ENUM[];

  @ApiProperty({ example: ['EMAIL'], required: false, nullable: true })
  @IsOptional()
  @IsString({ each: true })
  newApartmentAlerts?: NOTIFICATION_ENUM[];
}
