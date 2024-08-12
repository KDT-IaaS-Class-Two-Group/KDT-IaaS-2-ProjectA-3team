import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserDTO } from '@shared/DTO/SharedDTO';
import { LoginService } from './login.service';
import { REDIRECT_PATH } from './Enum/REDIRECT_PATH.enum';
/**
 * * Class : LoginController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @param private readonly loginService: LoginService
 * @description : /login 요청을 처리하는 컨트롤러. 기본적인 유효성 검사와 Database 검사 후, 세션 키 발급 로직을 수행함.
 */
@Controller('login')
@ApiTags('Login API')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '사용자 로그인을 처리하는 엔드포인트',
    description:
      '사용자의 ID와 비밀번호를 검증하고 세션을 생성하여 로그인하는 엔드포인트이다.',
  })
  @ApiBody({
    description: '로그인 요청에 필요한 사용자 정보를 담고 있는 DTO이다.',
  })
  @ApiOkResponse({
    description: '성공적으로 로그인한 후 세션 정보를 반환하는 응답이다.',
    schema: {
      example: {
        message: 'ok',
        redirect: REDIRECT_PATH.USER_MAIN,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패 시 반환되는 응답이다.',
    schema: {
      example: {
        message: 'Invalid credentials',
      },
    },
  })
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
      const session = await this.loginService.createSession(data);
      console.log('session', session);
      req.session.user = session;
      // ! 임시 기능 (추가된 역할 테이블에 맞도록 구성할 필요가 있음)
      if (session.role_name == 'admin') {
        return res.json({ message: 'ok', redirect: REDIRECT_PATH.ADMIN_MAIN });
      } else {
        return res.json({ message: 'ok', redirect: REDIRECT_PATH.USER_MAIN });
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED) //401 인증 실패
        .json({ message: 'Invalid credentials' });
    }
  }
  @Get('/session') // <-- 새로운 엔드포인트 추가
  @ApiOperation({
    summary: '현재 세션 정보를 조회하는 엔드포인트',
    description: '현재 세션 정보를 조회하고 반환하는 엔드포인트이다.',
  })
  @ApiOkResponse({
    description: '현재 세션 정보를 반환하는 응답이다.',
    schema: {
      example: {
        session: {
          user_id: 'exampleUserId',
          role_name: 'exampleRole',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '세션이 없는 경우 반환되는 응답이다.',
    schema: {
      example: {
        message: 'No session found',
      },
    },
  })
  getSession(@Req() req: Request, @Res() res: Response) {
    const session = req.session.user;
    if (session) {
      return res.json({ session });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No session found' });
    }
  }
}
