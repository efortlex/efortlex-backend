import { User } from '@prisma/client';

export type MessageType = {
  message: string;
};
export type SignTokenType = {
  sub: string;
  email: string;
  secret: string | Buffer;
  expiresIn: string | number;
  emailVerified: boolean;
  role: User['role'];
};
