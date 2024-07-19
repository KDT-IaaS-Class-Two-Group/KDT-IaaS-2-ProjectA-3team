import express, { Express, Request, Response } from "express";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const filePath = `${process.env.PUBLIC_DIR}/index.html` || path.resolve(__dirname, "../../client/public/index.html")
  console.log(filePath)
  res.sendFile(filePath);
});

export default router;