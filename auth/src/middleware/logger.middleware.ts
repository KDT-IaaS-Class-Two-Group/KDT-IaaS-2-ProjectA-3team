// src/middleware/logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // 요청 정보 로그
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);

    // 응답 정보 로그 (응답이 완료된 후 로그)
    res.on('finish', () => {
      console.log(`Response status: ${res.statusCode}`);
    });

    next();
  }
}
