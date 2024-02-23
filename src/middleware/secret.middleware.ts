import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecretMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const key = process.env.SERVER_ACCESS_KEY;

    const secret = req.headers[key];

    const json = { message: 'Access Denied' };

    if (!secret) res.status(401).json(json);

    const envSecret = process.env.SERVER_ACCESS_SECRET;

    if (envSecret !== secret) res.status(401).json(json);

    next();
  }
}
