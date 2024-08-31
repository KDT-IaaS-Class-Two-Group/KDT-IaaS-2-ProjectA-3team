import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';

export class DbConnect implements OnModuleInit, OnModuleDestroy {
  public readonly client = new MongoClient('mongodb://localhost:27017');
  public readonly pgPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  async onModuleInit() {
    // nest 라이프사이클 훅으로 서비스 시작 후 자동으로 MongoDB와 pg에 연결
    await this.client.connect();
    await this.pgPool.connect();
  }
  async onModuleDestroy() {
    // nest 라이프사이클 훅으로 서비스 종료 후 자동으로 MongoDB와 pg에 연결
    await this.client.close();
    await this.pgPool.end();
  }
}
