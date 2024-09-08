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
import { LoginService } from '../login.service';
import { REDIRECT_PATH } from '../Enum/REDIRECT_PATH.enum';
/**
 * * Class : LoginController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @param private readonly loginService: LoginService
 * @description : /login 요청을 처리하는 컨트롤러. 기본적인 유효성 검사와 Database 검사 후, 세션 키 발급 로직을 수행함.
 *
 * * ** login
 * @brief 사용자 로그인을 처리하는 메서드.
 * @param data 사용자 로그인 정보를 담고 있는 DTO(UserDTO).
 * @param req 클라이언트로부터의 요청 객체.
 * @param res 서버로의 응답 객체.
 * @returns 로그인 성공 시 리다이렉트 경로를 포함한 JSON 객체 반환.
 * @throws HttpStatus.UNAUTHORIZED 잘못된 인증 정보로 인한 인증 실패.
 *
 * ** getSession
 * @brief 현재 세션 정보를 조회하는 메서드.
 * @param req 클라이언트로부터의 요청 객체.
 * @param res 서버로의 응답 객체.
 * @returns 세션 정보 또는 세션이 없을 때 401 에러.
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
        redirect: REDIRECT_PATH.USER_MAIN, // 사용자 리다이렉트 경로
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
    @Body() data: UserDTO, // 요청 바디로부터 UserDTO 받음
    @Req() req: Request, // 요청 객체
    @Res() res: Response, // 응답 객체
  ) {
    const { user_id, password } = data; // 요청 데이터에서 user_id와 password 추출

    const userData = await this.loginService.validateUser(user_id, password); // 로그인 유효성 검사
    if (userData.user_id.startsWith('Admin')) {
      // 만약 user_id가 'Admin'으로 시작하면 추가 검증 수행
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
      const session = await this.loginService.createSession(data); // 유저 정보를 기반으로 세션 생성
      console.log('session', session);
      req.session.user = session; // 세션 정보를 req 객체에 저장
      // ! 임시 기능 (추가된 역할 테이블에 맞도록 구성할 필요가 있음)
      if (session.role_name == 'admin' || session.role_name === 'sub_admin') {
        // 사용자의 역할이 'admin' 또는 'sub_admin'이면 관리자 페이지로 리다이렉트
        return res.json({ message: 'ok', redirect: REDIRECT_PATH.ADMIN_MAIN });
      } else {
        // 그렇지 않으면 사용자 페이지로 리다이렉트
        return res.json({ message: 'ok', redirect: REDIRECT_PATH.USER_MAIN });
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED) //401 인증 실패
        .json({ message: 'Invalid credentials' }); // 실패 메시지 반환
    }
  }
  @Get('/session') // 세션 정보를 조회하는 GET 엔드포인트
  @ApiOperation({
    summary: '현재 세션 정보를 조회하는 엔드포인트',
    description: '현재 세션 정보를 조회하고 반환하는 엔드포인트이다.',
  })
  @ApiOkResponse({
    description: '현재 세션 정보를 반환하는 응답이다.', // 성공적인 응답 설명
    schema: {
      example: {
        session: {
          user_id: 'exampleUserId', // 예시 세션 정보
          role_name: 'exampleRole',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '세션이 없는 경우 반환되는 응답이다.', // 세션이 없을 때 응답 설명
    schema: {
      example: {
        message: 'No session found', // 세션이 없는 경우의 메시지 예시
      },
    },
  })
  getSession(@Req() req: Request, @Res() res: Response) {
    const session = req.session.user; // 현재 세션 정보 가져옴
    if (session) {
      return res.json({ session }); // 세션이 있으면 반환
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED) // 세션이 없으면 401 응답 반환
        .json({ message: 'No session found' });
    }
  }
}
