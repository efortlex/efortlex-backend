import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.databaseService.user.findFirst({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          country: true,
          dateOfBirth: true,
          emailVerified: true,
          gender: true,
          landmark: true,
          phoneNumber: true,
          role: true,
          state: true,
          employment: true,
          nextofkin: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) new UnauthorizedException();
      request['user'] = user;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers['x-refresh-token'] as string)?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
