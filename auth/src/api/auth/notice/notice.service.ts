import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';
import { NoticeDTO } from '../../../../../shared/DTO/DbDTO';
import { dateSet } from './utils/dateUtils';

@Injectable()
export class NoticeService {
  private readonly uri = 'mongodb://localhost:27017';
  private readonly client = new MongoClient(this.uri);
  private readonly pgPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  async onModuleInit() {
    // 서비스가 초기화될 때 MongoDB에 연결
    await this.client.connect();
  }
  async onModuleDestroy() {
    // 서비스가 종료될 때 MongoDB 연결 닫기
    await this.client.close();
  }

  async createNotice(noticeDTO: NoticeDTO, user_id: string, role: string) {
    if(role==='employee'){
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
        role,
      };

      const result = await mongoCollection.insertOne(noticeData);
      return `insert완료 ${result.insertedId}`;
    }
    else if(role === 'auth'){
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeAuthTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
        role,
      };

      const result = await mongoCollection.insertOne(noticeData);
      return `insert완료 ${result.insertedId}`;
    }
  }

  // async createAuthNotice(noticeDTO: NoticeDTO, user_id: string, role: string) {
  //     const mongoDatabase = this.client.db('notice');
  //     const mongoCollection =
  //       mongoDatabase.collection<NoticeDTO>('noticeAuthTable');

  //     const currentDate = new Date();
  //     const custom = dateSet(currentDate);
  //     const noticeData = {
  //       ...noticeDTO,
  //       createdAt: custom, // 현재 날짜와 시간 추가
  //       user_id,
  //       role,
  //     };

  //     const result = await mongoCollection.insertOne(noticeData);
  //     return `insert완료 ${result.insertedId}`;
  // }

  async getNotices() {
      const mongoCollection = this.client
        .db('notice')
        .collection<NoticeDTO>('noticeTable');

      // NoticeDTO 타입으로 직접 반환
      return await mongoCollection.find().toArray();
  }

  async getAuthNotices() {
      const mongoCollection = this.client
        .db('notice')
        .collection<NoticeDTO>('noticeAuthTable');

      // NoticeDTO 타입으로 직접 반환
      return await mongoCollection.find().toArray();
  }
}
