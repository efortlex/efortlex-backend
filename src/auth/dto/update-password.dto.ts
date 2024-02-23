import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description:
      'User current password, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Password@6782',
  })
  @IsStrongPassword()
  currentPassword: string;

  @ApiProperty({
    description:
      'User new password to chnage to, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Efortlex@6782',
  })
  @IsStrongPassword()
  newPassword: string;
}
