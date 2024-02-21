import { IsEmail } from 'class-validator';

export class ResetAuthDto {
  @IsEmail()
  email: string;
}
