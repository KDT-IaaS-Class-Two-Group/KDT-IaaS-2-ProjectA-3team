import { Injectable } from '@nestjs/common';
import { MongoClient, WithId, Document } from 'mongodb';
import { NoticeDTO } from '../../../../../shared/DTO/DbDTO';
import { dateSet } from './utils/dateUtils';

@Injectable()
export class NoticeService {
  private readonly uri = 'mongodb://localhost:27017';
  private readonly client = new MongoClient(this.uri);

  async createNotice(noticeDTO: NoticeDTO) {
    try {
      await this.client.connect();
      const database = this.client.db('notice');
      const collection = database.collection<NoticeDTO>('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
      };

      const result = await collection.insertOne(noticeData);
      return `New document inserted with _id: ${result.insertedId}`;
    } finally {
      await this.client.close();
    }
  }

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
