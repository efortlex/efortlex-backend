import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendEmailVerificationDto {
  @ApiProperty({
    description: 'Registered email address to send verification code too',
    example: 'yourname@efortlex.com',
  })
  @IsEmail()
  email: string;
}
