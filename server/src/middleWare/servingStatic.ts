import path from 'path';
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * * Function : servingStatic
 * 작성자 : @naviadev / 2024-07-19
 * 편집자 : @naviadev / 2024-07-19
 * Issue : 
 * @function servingStatic 
 * @description : 정적 파일을 서빙하는 미들웨어 모듈. 매개변수로 express app이 들어오면 middle ware를 추가해주는 역할
 * @param app: Express
 */

/**
 * * Function : servingStatic
 * 작성자 : @naviadev / 2024-07-19
 * 편집자 : @naviadev / 2024-07-19
 * Issue : 
 * @function servingStatic
 * @description : 정적 파일을 서빙하는 미들웨어 모듈
 * @param app: Express
 */
const servingStatic = (app: Express) => {
  const DIST_DIR = process.env.DIST_DIR || path.resolve(__dirname, '../../client/dist');
  const PUBLIC_DIR = process.env.PUBLIC_DIR || path.resolve(__dirname, '../../client/public');
  app.use(express.static(DIST_DIR));
  app.use(express.static(PUBLIC_DIR));
}

export default servingStatic;