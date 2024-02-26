import { ApiProperty } from '@nestjs/swagger';

class OverviewApartmentDto {
  @ApiProperty({ example: 3 })
  found: number;
  @ApiProperty({ example: 0 })
  inProgress: number;
  @ApiProperty({ example: 1 })
  unavailable: number;
}

export class OverviewDto {
  @ApiProperty({ example: 1 })
  bookedApartment: number;

  @ApiProperty({ example: 3 })
  scheduledApartment: number;

  @ApiProperty({ example: 6 })
  maintainanceRequest: number;

  @ApiProperty({ type: OverviewApartmentDto })
  apartmentRequest: OverviewApartmentDto;
}
