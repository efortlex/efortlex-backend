import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class NextofkinDto {
  @ApiProperty({ example: 'Flora', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiProperty({ example: 'Nguyen', required: false, nullable: true })
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @ApiProperty({
    example: 'miggonako@avmeh.tz',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'sister',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiProperty({ example: '314.912.6210', required: false, nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: '475 Manley Tunnel',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string;
}
