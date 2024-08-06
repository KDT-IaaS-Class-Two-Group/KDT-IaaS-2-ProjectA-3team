import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
/**
 * * Class : LogoutController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class LogoutController
 * @description : express-session 의 destroy 메서드를 활용하여 로그아웃 로직 (세션 삭제) 를 수행한다.
 */
@Controller("logout")
export class LogoutController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  }
}
