import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
/**
 * * Class : LogoutController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class LogoutController
 * @description : express-session 의 destroy 메서드를 활용하여 로그아웃 로직 (세션 삭제) 를 수행한다.
 */
@Controller('logout') // 'logout' 경로에 대한 요청을 처리하는 컨트롤러 정의
export class LogoutController {
  constructor() {}

  /**
   * @brief 사용자가 로그아웃할 때 호출되는 엔드포인트.
   * @details POST 요청을 받아 express-session 의 destroy 메서드를 통해 세션을 삭제한다.
   * @param req 클라이언트로부터의 요청 객체, 세션 정보를 포함.
   * @param res 서버로의 응답 객체, 성공 또는 실패 메시지 전송.
   * @return 세션 삭제 성공 시 성공 메시지, 실패 시 500 상태 코드를 반환한다.
   */
  @Post()
  @HttpCode(HttpStatus.OK) // 로그아웃 성공 시 200 상태 코드를 반환
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      // express-session의 destroy 메서드를 사용하여 세션 삭제 시도
      if (err) {
        // 에러가 발생한 경우
        res.status(500).json({ message: 'Logout failed' }); // 500 상태 코드와 로그아웃 실패 메시지 반환
      } else {
        // 세션 삭제가 성공한 경우
        res.json({ message: 'Logged out successfully' }); // 로그아웃 성공 메시지 반환
      }
    });
  }
}
