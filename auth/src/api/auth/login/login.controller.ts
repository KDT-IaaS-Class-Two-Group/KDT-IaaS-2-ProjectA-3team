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
/**
 * * Class : LoginController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @param private readonly loginService: LoginService
 * @description : /login 요청을 처리하는 컨트롤러. 기본적인 유효성 검사와 Database 검사 후, 세션 키 발급 로직을 수행함.
 */
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
