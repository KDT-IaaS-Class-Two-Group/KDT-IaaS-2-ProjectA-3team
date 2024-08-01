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
 * 편집자 : @naviadev / 2024-07-31
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
    if (userData.user_id.startsWith('Admin')) {
      // -> role.name -> 보고 만약에 "관리자" 라는 이름으로 되어있으면 그때 Admin TABLE 다시 검증하고
      /**
       * qwe123, qwe123@ -> 확인 검증이되면 한번 그럼 아예 따로 둬도 된다. -> user -> 로그인 되면 
       * 
       * {
          name : "aasdf"
          level : 5 -> 5에 맞는 response -> Client -> Component
          Https Redis 고려 나중에 aws -> Request , Javascript로 쿠키 접근이 불가능하도록 수정. 암호화된 Session 식별자.
          ->
        }
       */
    }

    if (userData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = userData as UserDTO;
      req.session.user = userWithoutPassword as SessionDTO;
      console.log(req.session.user);
      return res.json({ message: 'Login successful' });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
