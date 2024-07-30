import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('verify-session')
export class VerifySessionController {
  constructor() {}

  @Get()
  async verifySession(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      console.log(req.session.user);
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
