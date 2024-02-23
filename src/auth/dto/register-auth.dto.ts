import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'Unique email ',
    example: 'yourname@efortlex.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User given name',
    example: 'John',
  })
  @MinLength(3)
  firstName: string;

  @ApiProperty({
    description: 'User family name',
    example: 'Doe',
  })
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    description:
      'True if user want to be a tenant, False if user want to be a landload or agent',

    example: false,
  })
  @IsBoolean()
  isTenant: boolean;

  @ApiProperty({
    description:
      'User password, must be at least 8 charater, must contain a number, must contain a symbol ',
    example: 'Password@6782',
  })
  @IsStrongPassword()
  password: string;
}
