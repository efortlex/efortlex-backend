import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;

  @IsBoolean()
  isTenant: boolean;

  @IsStrongPassword()
  password: string;
}
