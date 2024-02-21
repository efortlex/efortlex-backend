import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/users.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    context.switchToHttp().getRequest().user,
);
