import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
/**
 * * Class : DatabaseService
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @zoeznm / 2024-08-02
 * Issue :
 * @class DatabaseService
 * @implements OnModuleDestroy
 * @description : 데이터베이스 관리 모듈. 인스턴스부터 쿼리문 실행까지 수행할 수 있다.
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

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL');
    } catch (err) {
      console.error('Error connecting to PostgreSQL', err);
    }
  }

  async disconnect() {
    await this.client.end();
    console.log('Disconnected from PostgreSQL');
  }

  async query(text: string, params?: any[]) {
    try {
      return await this.client.query(text, params);
    } catch (err) {
      console.error(`Error executing query: ${text}`, err);
      throw err;
    }
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
