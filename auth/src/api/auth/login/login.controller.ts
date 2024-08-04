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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDTO } from './DTO/LoginResponseDTO';

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
  @ApiBody({ type: UserDTO, description: '사용자 로그인 데이터' })
  @ApiParam({
    name: 'data',
    type: '@body',
    description: '사용자 요청 객체 (로그인 정보)',
  })
  @ApiParam({
    name: 'req',
    type: 'Request',
    description: '요청 객체. (req.session을 통해 세션키 생성)',
  })
  @ApiParam({
    name: 'res',
    type: 'Response',
    description: '사용자 반환 객체 (세션키 반환)',
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
