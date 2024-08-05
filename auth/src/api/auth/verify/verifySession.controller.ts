import { Controller, Get, Req, Res, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * * Class : VerifySessionController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class VerifySessionController
 * @description : 세션 검증 엔드포인트
 */
@Controller("verify-session")
export class VerifySessionController {
  constructor() {}

  @Get()
  async verifySession(@Req() req: Request, @Res() res: Response) {
    if (req.session.user) {
      console.log(req.session.user);
      return res.json({ message: "Login successful" });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "X" });
    }
  }
}
