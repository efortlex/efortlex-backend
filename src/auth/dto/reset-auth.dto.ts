import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetAuthDto {
  @ApiProperty({
    description: 'Registered email address to reset password for',
    example: 'yourname@efortlex.com',
  })
  @IsEmail()
  email: string;
}
