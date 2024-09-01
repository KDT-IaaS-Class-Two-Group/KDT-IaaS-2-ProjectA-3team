import { Injectable } from '@nestjs/common';
import { MongoQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/mongo_query';
import { PostQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/postgres_query';

@Injectable()
export class NoticeCreate {
  constructor(
    private readonly mongoQuery: MongoQuery,
    private readonly postQuery: PostQuery,
  ) {}
  async noticeCreate(noticeDTO, tableName, dateSet, user_id, role) {
    try {
      const collection = await this.mongoQuery.mongoConnect(
        'notice',
        noticeDTO,
        tableName,
      );
      const currentDate = new Date();
      const custom = dateSet(currentDate);
      const noticeData = {
        ...noticeDTO,
        createdAt: custom, // 현재 날짜와 시간 추가
        user_id,
        role,
      };
      if (tableName === 'noticeTable') {
        const mongo_obj_id = await this.mongoQuery.mongoInsert(
          collection,
          noticeData,
        );
        const rowData = [
          'user_id',
          'title',
          'content',
          'mongodb_doc_id',
          'created_at',
        ];
        await this.postQuery.postInsert('notice_back_log', rowData, [
          user_id,
          noticeDTO.title,
          noticeDTO.content,
          mongo_obj_id,
          custom,
        ]);
        return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
      } else if (tableName === 'noticeAuthTable') {
        await this.mongoQuery.mongoInsert(collection, noticeData);
        return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
      }
    } catch {
      return 'notice create error';
    }
  }
}
