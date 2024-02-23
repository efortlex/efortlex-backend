import { ApiProperty } from '@nestjs/swagger';

export class SignTokenDto {
  @ApiProperty({
    description: 'Accesstoken to authorize user',
    example: 'e....',
  })
  accessToken: string;

  @ApiProperty({
    description:
      'Refresh token is used to request a new access token, in case access token expired',
    example: 'e....',
  })
  refreshToken: string;
}
