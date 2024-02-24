import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'e40a6c07-80aa-5f20-becd-1c8d66205477' })
  @IsString()
  @IsUUID()
  apartmentId: string;
}
