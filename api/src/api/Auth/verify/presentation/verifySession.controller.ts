import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

/**
 * * Class : VerifySessionController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class VerifySessionController
 * @description : 세션을 검증하는 엔드포인트를 제공하는 컨트롤러입니다. 세션의 유효성을 확인하고 적절한 응답을 반환합니다.
 */
@Controller('verify-session')
@ApiTags('Verify-Session API')
export class VerifySessionController {
  /**
   * @constructor
   * @description 생성자는 특별한 로직을 포함하지 않으며, 기본 생성자입니다.
   */

  constructor() {}
  /**
   * @method verifySession
   * @param {Request} req - Express 요청 객체. 세션 정보를 포함합니다.
   * @param {Response} res - Express 응답 객체. 응답을 클라이언트에 반환합니다.
   * @returns {Promise<void>}
   * @description 세션 검증을 수행하고, 세션이 유효하면 사용자 역할을 포함한 JSON 응답을 반환합니다. 세션이 유효하지 않으면 401 Unauthorized 응답을 반환합니다.
   * @example
   *  성공적인 세션 검증
   * 응답: { role: 'admin' }
   * 실패한 세션 검증
   *  응답: { message: 'X' }
   */
  @Get()
  @ApiOperation({
    summary: '회원 인증 엔드포인트 ',
    description:
      '권한이 필요한 작업들을 진행하는 것에 있어 세션을 확인하고 적절한 응답을 반환하는 역할을 수행한다.',
  })
  async verifySession(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      // 세션에 사용자 정보가 있을 경우, 역할을 포함한 JSON 응답을 반환
      return res.json({ role: req.session.user.role_name });
    } else {
      // 세션에 사용자 정보가 없을 경우, 401 Unauthorized 응답을 반환
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'X' });
    }
  }
}
