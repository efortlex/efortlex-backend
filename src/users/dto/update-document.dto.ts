import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty({ example: 'NIN', required: false, nullable: true })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: '09393993993993', required: false, nullable: true })
  @IsOptional()
  @IsString()
  documentNumber?: string;

  @ApiProperty({
    example: 'http://toslalef.ug/feBackend Developer',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  frontUrl?: string;

  @ApiProperty({
    example: 'http://masefal.an/apiwata',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  backUrl?: string;
}
