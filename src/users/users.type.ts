import type {
  Document,
  Employment,
  Nextofkin,
  Notification,
  User as UserType,
} from '@prisma/client';

export type User = Omit<UserType, 'password'> & {
  employment?: Employment;
  nextofkin?: Nextofkin;
  notification?: Notification;
  document?: Document;
};
