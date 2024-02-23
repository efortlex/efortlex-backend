import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ValidateEmailDto {
  @ApiProperty({
    description: 'User email address to validate',
    example: 'youname@efortlex.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '....',
    description: 'Token sent to user email',
  })
  @IsString()
  @Length(6)
  token: string;
}
