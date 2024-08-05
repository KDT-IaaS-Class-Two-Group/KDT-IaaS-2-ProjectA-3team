import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * * Class : VerifySessionController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-04
 * Issue :
 * @class VerifySessionController
 * @description : 세션 검증 엔드포인트
 */
@ApiTags('세션 검증')
@Controller('verify-session')
export class VerifySessionController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary:
      '세션 검증 엔드포인트, MiddleWare 혹은 쓰는 작업에 대한 요청을 검사',
  })
  @ApiResponse({
    status: 200,
    description: '세션이 유효한 경우 성공적으로 반환됨',
    schema: {
      example: {
        status: 'success',
        role: 'admin',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '세션이 유효하지 않은 경우 반환됨',
    schema: {
      example: {
        message: 'X',
      },
    },
  })
  async verifySession(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      console.log(req.session.user);
      return res.json({
        status: 'success',
        role: req.session.user.role_name,
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'X' });
    }
  }
}
