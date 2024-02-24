import { ApiProperty } from '@nestjs/swagger';
import { APARTMENT_REQUESTS_STATUS, APARTMENT_TYPE } from '@prisma/client';

export class ApartmentRequestDto {
  @ApiProperty({ example: '2dc4811d-700e-5c62-8720-52e4cd92439b' })
  id: string;

  @ApiProperty({ example: '34038cea-2370-5175-a4ec-8f3146580be9' })
  userId: string;

  @ApiProperty({ example: 'Maryland' })
  location: string;

  @ApiProperty({ example: 'ONE_BEDROOM' })
  apartmentType: APARTMENT_TYPE;

  @ApiProperty({ example: 356000 })
  budget: number;

  @ApiProperty({ example: 'FOUND' })
  status: APARTMENT_REQUESTS_STATUS;
}

export class ApartmentRequestsDto {
  @ApiProperty({ example: 10 })
  totalItems: number;

  @ApiProperty({ type: [ApartmentRequestDto] })
  results: ApartmentRequestDto[];
}
