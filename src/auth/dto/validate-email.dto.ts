import { IsEmail, IsString, Length } from 'class-validator';

export class ValidateEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  token: string;
}
