import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @Length(6)
  token: string;

  @IsStrongPassword()
  password: string;
}
