import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class DeleteAccountDto {
  @ApiProperty({
    description:
      'User password, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Password@6782',
  })
  @IsStrongPassword()
  password: string;
}
