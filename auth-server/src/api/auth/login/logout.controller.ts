import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('logout')
export class LogoutController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Logout failed' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  }
}
