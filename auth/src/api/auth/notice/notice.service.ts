import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { NoticeDTO } from '../../../../../shared/DTO/DbDTO';
import { dateSet } from './utils/dateUtils';

@Injectable()
export class NoticeService {
  private readonly uri = 'mongodb://localhost:27017';
  private readonly client = new MongoClient(this.uri);
  async createNotice(NoticeDTO: NoticeDTO) {
    try {
      await this.client.connect();
      const database = this.client.db('notice');
      const collection = database.collection('noticeTable');

      const currentDate = new Date();
      const custom = dateSet(currentDate)
      const noticeData = {
        ...NoticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
      };

      const result = await collection.insertOne(noticeData);
      return `New document inserted with _id: ${result.insertedId}`;
    } finally {
      await this.client.close();
    }
  }
}
