import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type User as UserType, ROLE } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: UserType | null = context.switchToHttp().getRequest().user;

    if (!user) throw new UnauthorizedException();

    try {
      if (
        !user.role.includes(ROLE.LANDLORD) &&
        !user.role.includes(ROLE.AGENT)
      ) {
        throw new ForbiddenException('Permission denied');
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
