import { IsStrongPassword } from 'class-validator';

export class DeleteAccountDto {
  @IsStrongPassword()
  password: string;
}
