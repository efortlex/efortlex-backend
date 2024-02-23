import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Unique email ',
    example: 'yourname@efortlex.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Password@6782',
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
