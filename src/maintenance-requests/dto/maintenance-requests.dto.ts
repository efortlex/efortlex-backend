import { ApiProperty } from '@nestjs/swagger';
import { MAINTENANCE_STATUS, MAINTENANCE_URGENCY } from '@prisma/client';

export class MaintenanceRequestDto {
  @ApiProperty({ example: '2dc4811d-700e-5c62-8720-52e4cd92439b' })
  id: string;

  @ApiProperty({ example: '34038cea-2370-5175-a4ec-8f3146580be9' })
  userId: string;

  @ApiProperty({ example: '19bf6b79-8f41-57d1-9993-f84a22eaea9a' })
  ticketId: string;

  @ApiProperty({ example: 'incidunt occaecati dolore' })
  description: string;

  @ApiProperty({ example: 'HIGH' })
  urgency: MAINTENANCE_URGENCY;

  @ApiProperty({ example: 'RESOLVED' })
  status: MAINTENANCE_STATUS;

  @ApiProperty({ example: 'http://tamenkil.kz/lozoluje' })
  attachment: number;

  @ApiProperty({
    example: 'Sun May 21 2023 16:43:01 GMT+0100 (West Africa Standard Time)',
  })
  preferredDate: Date;
}

export class MaintenanceRequestsDto {
  @ApiProperty({ example: 10 })
  totalItems: number;

  @ApiProperty({ type: [MaintenanceRequestDto] })
  results: MaintenanceRequestDto[];
}
