import { IsEmail, IsEnum, MinLength } from 'class-validator';

enum PROVIDER {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}
export class SigninAuthDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;

  @IsEnum(PROVIDER)
  provider: 'GOOGLE' | 'APPLE';
}
