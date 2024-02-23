import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User email address to change password',
    example: 'youname@efortlex.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '....',
    description:
      'Token sent to user email when you they request for change password',
  })
  @Length(6)
  token: string;

  @ApiProperty({
    description:
      'User password, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Password@6782',
  })
  @IsStrongPassword()
  password: string;
}
