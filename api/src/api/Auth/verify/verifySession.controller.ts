import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

/**
 * * Class : VerifySessionController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class VerifySessionController
 * @description : 세션 검증 엔드포인트
 */
@Controller('verify-session')
@ApiTags('Verify-Session API')
export class VerifySessionController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: '회원 인증 엔드포인트 ',
    description:
      '권한이 필요한 작업들을 진행하는 것에 있어 세션을 확인하고 적절한 응답을 반환하는 역할을 수행한다.',
  })
  async verifySession(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      return res.json({ role: req.session.user.role_name });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'X' });
    }
  }
}
