import express, { Express, Request, Response } from "express";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  console.log(req.body);
});

export default router;