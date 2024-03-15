import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { DatabaseService } from '../../database/database.service';
import getKey from '../../utils/get-key';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      const cacheKey = getKey('user', { userId: payload.sub });

      const [cache, accessTokens] = await this.cacheManager.store.mget(
        cacheKey,
        'access-tokens',
      );

      const isValid = await this.isTokenValid(token, accessTokens as string[]);

      if (!isValid) throw new UnauthorizedException();

      if (cache) {
        request['user'] = cache;
      } else {
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
            providers: true,
            gender: true,
            landmark: true,
            phoneNumber: true,
            role: true,
            state: true,
            employment: true,
            nextofkin: true,
            notification: true,
            photoURL: true,
            document: true,
            twoFactorAuthentication: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (!user) throw new UnauthorizedException();

        await this.cacheManager.set(cacheKey, user);

        request['user'] = user;
      }
    } catch (e: any) {
      throw new UnauthorizedException(e.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers['x-access-token'] as string)?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async isTokenValid(token: string, accessTokens = []) {
    const isTokenAvaliable = accessTokens.findIndex((t) => t === token);

    if (isTokenAvaliable === -1) return false;

    return true;
  }
}
