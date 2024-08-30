import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
/**
 * * Class : DatabaseService
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @dalramjwi / 2024-08-30
 * Issue :
 * @class DatabaseService
 * @implements OnModuleDestroy
 * @description : 데이터베이스 관리 모듈. 데이터베이스와의 연결을 설정하고, 쿼리를 실행하며, 애플리케이션이 종료될 때 연결을 종료하는 기능을 제공
 */
export class DatabaseService implements OnModuleDestroy {
  private client: Pool;

  constructor() {
    this.client = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    });

    this.connect();
  }

  /**
   * @method connect
   * @description 데이터베이스에 연결하는 메서드. 연결 성공 시 콘솔에 메시지를 출력하고, 실패 시 에러를 출력함.
   */
  async connect() {
    try {
      await this.client.connect();
      console.log('PostgreSQL 연결');
    } catch (err) {
      console.error('PostgreSQL 연결 오류', err);
    }
  }
  /**
   * @method disconnect
   * @description 데이터베이스 연결을 종료하는 메서드. 종료 시 콘솔에 메시지를 출력함.
   */
  async disconnect() {
    await this.client.end();
    console.log('PostgreSQL 연결 종료');
  }

  /**
   * @method query
   * @description 주어진 SQL 쿼리문과 매개변수로 데이터베이스에 쿼리를 실행하는 메서드.
   * @param text - 실행할 SQL 쿼리문
   * @param params - 쿼리문에 바인딩할 매개변수들 (선택적)
   * @returns 쿼리 실행 결과를 반환
   * @throws 쿼리 실행 중 오류가 발생할 경우 예외를 던짐
   */
  async query(text: string, params?: any[]) {
    try {
      return await this.client.query(text, params);
    } catch (err) {
      console.error(`Error executing query: ${text}`, err);
      throw err;
    }
  }
  /**
   * @method onModuleDestroy
   * @description 모듈이 종료될 때 호출되어 데이터베이스 연결을 종료하는 메서드.
   */
  onModuleDestroy() {
    this.disconnect();
  }
}
