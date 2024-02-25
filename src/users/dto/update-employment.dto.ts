import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmploymentDto {
  @ApiProperty({ example: 'Vera Stehr', required: false, nullable: true })
  @IsOptional()
  @IsString()
  employerName?: string;

  @ApiProperty({ example: 'Employed', required: false, nullable: true })
  @IsOptional()
  @IsString()
  employmentStatus?: string;

  @ApiProperty({
    example: 'Backend Developer',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @ApiProperty({
    example: '650 Kirlin Islands',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 360000, required: false, nullable: true })
  @IsOptional()
  @IsString()
  monthlyIncome?: string;
}
