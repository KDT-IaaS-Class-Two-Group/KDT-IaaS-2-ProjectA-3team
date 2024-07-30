import express, { Express, Request, Response } from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
const router = express.Router();

/**
 * * Router : get
 * 작성자 : @naviadev / 2024-07-19
 * 편집자 : @naviadev / 2024-07-19
 * Issue :
 * @description : / 최하단에 포함되는 라우터. index.html을 서빙하는 역할.
 * @param app: Express
 */
router.get("/", (req: Request, res: Response) => {
  const filePath =
    `${process.env.PUBLIC_DIR}/index.html` ||
    path.resolve(__dirname, "../../client/public/index.html");
  console.log(filePath);
  res.sendFile(filePath);
});

export default router;
