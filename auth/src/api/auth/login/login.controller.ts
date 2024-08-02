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

import { UserDTO, SessionDTO } from '@shared/DTO/SharedDTO';
import { LoginService } from './login.service';
/**
 * * Class : LoginController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @param private readonly loginService: LoginService
 * @description : /login 요청을 처리하는 컨트롤러. 기본적인 유효성 검사와 Database 검사 후, 세션 키 발급 로직을 수행함.
 */
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: UserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { user_id, password } = data;

    const userData = await this.loginService.validateUser(user_id, password);

    if (userData) {
      const session: SessionDTO = await this.loginService.createSession(data);
      req.session.user = await session;

      if (session.role_name === 'admin') {
        return res.json({
          status: 'success',
          redirect: '/admin/dashBoard',
          role: 'admin',
        });
      }

      return res.json({
        status: 'success',
        redirect: '/user/home',
        role: 'user',
      });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
