import { Injectable } from '@nestjs/common';
import { MongoQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/mongo_query';
import { PostQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/postgres_query';

@Injectable()
export class NoticeRead {
  constructor(
    private readonly mongoQuery: MongoQuery,
    private readonly postQuery: PostQuery,
  ) {}
  async noticeRead(noticeDTO, tableName, page, limit) {
    const mongoCollection = await this.mongoQuery.mongoConnect(
      'notice',
      noticeDTO,
      tableName,
    );
    const notices = await mongoCollection
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit) // 페이지 계산
      .limit(limit) // 페이지당 항목 수
      .toArray();
    // 총 항목 수를 가져오기 위해 전체 항목 수 쿼리
    const totalCount = await mongoCollection.countDocuments();
    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / limit);
    return { notices, totalPages }; // notices와 totalPages 반환
  }

  async noticeAuthRead(noticeDTO, limit) {
    const mongoCollection = await this.mongoQuery.mongoConnect(
      'notice',
      noticeDTO,
      'noticeAuthTable',
    );
    return await mongoCollection
      .find()
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();
  }
}
