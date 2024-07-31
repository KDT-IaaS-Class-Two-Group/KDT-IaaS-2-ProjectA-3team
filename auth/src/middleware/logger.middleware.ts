import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
/**
 * * Class : LoggingMiddleware
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class LoggingMiddleware
 * @implements NestMiddleware
 * @description : req, res 로깅용 미들웨어
 */
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      console.log(`Response status: ${res.statusCode}`);
    });

    next();
  }
}
