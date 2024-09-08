import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';

/**
 * @class DbConnect
 * @description 데이터베이스 연결을 관리하는 클래스입니다. MongoDB와 PostgreSQL 데이터베이스 연결을 초기화하고 종료하는 기능을 제공합니다.
 */
export class DbConnect implements OnModuleInit, OnModuleDestroy {
  /**
   * MongoDB 클라이언트 인스턴스입니다.
   * @type {MongoClient}
   */
  public readonly client = new MongoClient('mongodb://localhost:27017');

  /**
   * PostgreSQL 데이터베이스 풀 인스턴스입니다.
   * @type {Pool}
   */
  public readonly pgPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  /**
   * NestJS 라이프사이클 훅으로, 모듈이 초기화될 때 호출됩니다.
   * MongoDB와 PostgreSQL 데이터베이스에 연결을 설정합니다.
   * @returns {Promise<void>}
   */
  async onModuleInit() {
    // nest 라이프사이클 훅으로 서비스 시작 후 자동으로 MongoDB와 pg에 연결
    await this.client.connect();
    await this.pgPool.connect();
  }

  /**
   * NestJS 라이프사이클 훅으로, 모듈이 종료될 때 호출됩니다.
   * MongoDB와 PostgreSQL 데이터베이스 연결을 종료합니다.
   * @returns {Promise<void>}
   */
  async onModuleDestroy() {
    // nest 라이프사이클 훅으로 서비스 종료 후 자동으로 MongoDB와 pg에 연결
    await this.client.close();
    await this.pgPool.end();
  }
}
