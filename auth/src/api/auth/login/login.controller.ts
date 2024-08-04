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

import { UserDTO } from './DTO/UserDTO';
import { LoginService } from './login.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDTO } from './DTO/LoginResponseDTO';
import { REDIRECT_PATH } from './Enum/REDIRECT_PATH.enum';
import { ROLE } from './Enum/ROLE.enum';

/**
 * * Class : LoginController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @param private readonly loginService: LoginService
 * @description : /login 요청을 처리하는 컨트롤러. 기본적인 유효성 검사와 Database 검사 후, 세션 키 발급 로직을 수행함.
 */
@ApiTags('로그인 엔드포인트')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: '로그인 요청을 처리하는 엔드포인트' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공 = 200 반환, 세션 생성',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패 = 401 반환, 유효하지 않은 요청',
  })
  @ApiBody({
    description: '사용자 로그인 데이터',
    type: UserDTO,
  })
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
      const session = await this.loginService.createSession(data);
      req.session.user = session;

      if (session.role_name === ROLE.ADMIN) {
        return res.json({
          status: 'success',
          redirect: REDIRECT_PATH.ADMIN_MAIN,
          role: ROLE.ADMIN,
        });
      }

      return res.json({
        status: 'success',
        redirect: REDIRECT_PATH.USER_MAIN,
        role: ROLE.USER,
      });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: '유효하지 않은 인증' });
    }
  }
}
