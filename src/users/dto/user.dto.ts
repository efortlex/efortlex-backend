import { ApiProperty } from '@nestjs/swagger';

class Employment {
  @ApiProperty({ example: '2bb98aa0-319c-58bf-a648-d6f53d196708' })
  id: number;

  @ApiProperty({ example: '285ddf17-7a09-51da-b756-c24d2e7f573c' })
  userId: string;

  @ApiProperty({ example: 'employed' })
  employmentStatus: string;

  @ApiProperty({ example: 'Bill Bowers' })
  employerName: string;

  @ApiProperty({ example: 'Backend developer' })
  jobTitle: string;

  @ApiProperty({ example: '96573 Dibbert Brooks' })
  address: string;

  @ApiProperty({ example: 360000 })
  monthlyIncome: string;
}

class Nextofkin {
  @ApiProperty({ example: '777471c2-e011-57a1-884b-0d21c2dfdb3e' })
  id: number;

  @ApiProperty({ example: '06aeb252-aa23-591c-adc7-55701f1c694c' })
  userId: string;

  @ApiProperty({ example: 'Norman' })
  firstName: string;

  @ApiProperty({ example: 'Valdez' })
  lastName: string;

  @ApiProperty({ example: '(904) 975-5623' })
  phoneNumber: string;

  @ApiProperty({ example: '033 Ivory Ramp' })
  address: string;

  @ApiProperty({ example: 'yourname@efortlex.com' })
  email: string;
}

export class UserDto {
  @ApiProperty({ example: '161797b4-8e6a-5dbf-849a-138638b534d2' })
  id: string;

  @ApiProperty({ example: 'yourname@efortlex.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({
    example:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/683.jpg',
  })
  photoURL: string | null;

  @ApiProperty({ example: '751-668-7656' })
  phoneNumber: string | null;

  @ApiProperty({ example: ['GOOGLE', 'EMAIL'] })
  providers: ('GOOGLE' | 'EMAIL' | 'APPLE')[];

  @ApiProperty({ example: 'MALE' })
  gender: 'MALE' | 'FEMALE' | null;

  @ApiProperty({ example: 'TENANT' })
  role: 'TENANT' | 'ADMIN' | 'LANDLORD' | 'AGENT';

  @ApiProperty({
    example: 'Wed Jun 21 2023',
  })
  dateOfBirth: Date | null;

  @ApiProperty({ example: '482 Howell Village' })
  address: string | null;

  @ApiProperty({ example: 'South Carolina' })
  state: string | null;

  @ApiProperty({ example: 'Cambridgeshire' })
  country: string | null;

  @ApiProperty({ example: 'East' })
  landmark: string | null;

  @ApiProperty({ example: false })
  emailVerified: boolean;

  @ApiProperty({ type: Employment })
  employment: Employment;

  @ApiProperty({ type: Nextofkin })
  nextofkin: Nextofkin;

  @ApiProperty({
    example: 'Thu Jun 22 2023 21:56:11 GMT+0100 (West Africa Standard Time)',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Thu Mar 30 2023 03:33:17 GMT+0100 (West Africa Standard Time)',
  })
  updatedAt: Date;
}
