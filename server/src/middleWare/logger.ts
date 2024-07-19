// src/middlewares/logger.ts
import { Request, Response, NextFunction } from 'express';

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
