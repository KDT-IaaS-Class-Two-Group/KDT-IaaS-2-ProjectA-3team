import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RegisterDataDTO, LoginDTO, SessionDTO } from '@shared/DTO/SharedDTO';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { email, password } = data;
    const userData = await this.loginService.validateUser(email, password);

    if (userData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = userData as RegisterDataDTO;
      req.session.user = userWithoutPassword as SessionDTO;
      return res.json({ message: 'Login successful' });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
