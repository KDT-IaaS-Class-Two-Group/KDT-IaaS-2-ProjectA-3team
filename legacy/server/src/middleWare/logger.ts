// src/middlewares/logger.ts
import { Request, Response, NextFunction } from 'express';

/**
 * * Function : logger
 * 작성자 : @naviadev / 2024-07-19
 * 편집자 : @naviadev / 2024-07-19
 * Issue : 
 * @function logger 
 * @description : 요청, 처리, 시간을 출력하는 log 모듈
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 */

const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  console.log(`request: ${req.method} | ${req.url}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Status Code: ${res.statusCode} | ${res.statusMessage} - ${duration}ms`);
  });

  next();
};

export default logger;
