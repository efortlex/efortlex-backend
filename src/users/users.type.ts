import {
  Employment,
  Nextofkin,
  Notification,
  type User as UserType,
} from '@prisma/client';

export type User = Omit<UserType, 'password'> & {
  employment?: Employment;
  nextofkin?: Nextofkin;
  notification?: Notification;
};
