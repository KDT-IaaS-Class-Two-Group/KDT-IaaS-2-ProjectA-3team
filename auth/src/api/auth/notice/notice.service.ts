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

  //게시물 추가하는 부분
  async createNotice(noticeDTO: NoticeDTO) {
    const pgClient = await this.pgPool.connect();
    try {
      const pgSelect = await pgClient.query(
        `SELECT user_id,role_name FROM delan WHERE id = $1`,
        [noticeDTO.userId],
      );

      if (pgSelect.rows.length === 0) {
        throw new Error('User not found');
      }

      await this.client.connect();
      const mongoDatabase = this.client.db('notice');
      const mongoCollection =
        mongoDatabase.collection<NoticeDTO>('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
      };

      const mongoInsert = await mongoCollection.insertOne(noticeData);
      return `New document inserted with _id: ${mongoInsert.insertedId}`;
    } finally {
      await this.client.close();
    }
  }

  //게시판 띄우는 부분
  async getNotices() {
    try {
      await this.client.connect();
      const collection = this.client
        .db('notice')
        .collection<NoticeDTO>('noticeTable');

      // NoticeDTO 타입으로 직접 반환
      return await collection.find().toArray();
    } finally {
      await this.client.close();
    }
  }
}
