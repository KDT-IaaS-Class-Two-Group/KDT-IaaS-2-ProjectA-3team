import express, { Express, Request, Response } from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
const router = express.Router();

/**
 * * Router : post
 * 작성자 : @naviadev / 2024-07-19
 * 편집자 : @naviadev / 2024-07-19
 * Issue :
 * @description : / 로그인 요청을 처리하는 라우터 모듈. /login 요청을 app.use로 받고 해당 router로 도달할 수 있도록 한다.
 * @param req : Request
 * @param res : Response
 */
router.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

export default router;
