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

  async createNotice(noticeDTO: NoticeDTO, user_id: string) {
    try {
      await this.client.connect();
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
      };

      const result = await mongoCollection.insertOne(noticeData);
      return `New document inserted with _id: ${result.insertedId}`;
    } finally {
      await this.client.close();
    }
  }

  async getNotices() {
    try {
      await this.client.connect();
      const mongoCollection = this.client
        .db('notice')
        .collection<NoticeDTO>('noticeTable');

      // NoticeDTO 타입으로 직접 반환
      return await mongoCollection.find().toArray();
    } finally {
      await this.client.close();
    }
  }
}
