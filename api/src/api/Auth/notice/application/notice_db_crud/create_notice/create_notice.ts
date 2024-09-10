import { Injectable } from '@nestjs/common';
import { MongoQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/mongo_query';
import { PostQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/postgres_query';
/**
 * NoticeCreate 클래스는 공지사항을 생성하는 서비스입니다.
 * MongoDB와 PostgreSQL을 함께 사용하여 공지사항 데이터를 저장하고, 로그 기록을 남깁니다.
 *
 * @class NoticeCreate
 * @description 주어진 공지사항 데이터를 MongoDB와 PostgreSQL에 저장하는 메서드를 제공합니다.
 * @param {MongoQuery} mongoQuery - MongoDB 쿼리 작업을 처리하는 클래스
 * @param {PostQuery} postQuery - PostgreSQL 쿼리 작업을 처리하는 클래스
 */
@Injectable()
export class NoticeCreate {
  constructor(
    private readonly mongoQuery: MongoQuery, // MongoDB 관련 쿼리 처리 클래스
    private readonly postQuery: PostQuery, // PostgreSQL 관련 쿼리 처리 클래스
  ) {}
  /**
   * 공지사항을 생성하는 noticeCreate 메서드입니다.
   *
   * @param {object} noticeDTO - 공지사항 데이터 객체입니다.
   * @param {string} tableName - 저장할 MongoDB 테이블 이름입니다.
   * @param {function} dateSet - 날짜를 포맷팅하는 함수입니다.
   * @param {string} user_id - 공지사항을 생성하는 사용자의 ID입니다.
   * @param {string} role - 사용자의 역할입니다.
   * @returns {Promise<string>} 성공 시 생성된 공지사항 제목과 함께 메시지를 반환하고,
   * 실패 시 에러 메시지를 반환합니다.
   */
  async noticeCreate(noticeDTO, tableName: string, dateSet, user_id, role) {
    try {
      // MongoDB의 'notice' 컬렉션에 연결합니다.
      const collection = await this.mongoQuery.mongoConnect(
        'notice', // 'notice'는 컬렉션 이름입니다.
        noticeDTO, // 공지사항 데이터 객체입니다.
        tableName, // 저장할 테이블 이름입니다.
      );
      // 현재 날짜와 시간을 가져옵니다.
      const currentDate = new Date();
      // 날짜 포맷팅을 수행합니다.
      const custom = dateSet(currentDate);
      // 공지사항 데이터에 생성 시간, 유저 ID, 역할을 추가합니다.
      const noticeData = {
        ...noticeDTO, // 기존 공지사항 데이터
        createdAt: custom, // 생성일자 추가
        user_id, // 유저 ID 추가
        role, // 역할 추가
      };
      // 만약 저장할 테이블 이름이 'noticeTable'인 경우
      if (tableName === 'noticeTable') {
        // 공지사항 데이터를 MongoDB에 삽입하고, ObjectId를 반환받습니다.
        const mongo_obj_id = await this.mongoQuery.mongoInsert(
          collection, // MongoDB 컬렉션
          noticeData, // 삽입할 공지사항 데이터
        );
        // PostgreSQL에 기록할 공지사항 로그 데이터
        const rowData = [
          'user_id',
          'title',
          'content',
          'mongodb_doc_id',
          'created_at',
        ];
        // PostgreSQL의 'notice_back_log' 테이블에 로그 데이터를 삽입합니다.
        await this.postQuery.postInsert('notice_back_log', rowData, [
          user_id, // 공지사항 작성자 ID
          noticeDTO.title, // 공지사항 제목
          noticeDTO.content, // 공지사항 내용
          mongo_obj_id, // MongoDB에 저장된 문서의 ObjectId
          custom, // 생성일자
        ]);
        // 성공 메시지 반환
        return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
        // 만약 테이블 이름이 'noticeAuthTable'인 경우
      } else if (tableName === 'noticeAuthTable') {
        // 공지사항 데이터를 MongoDB에 삽입합니다.
        await this.mongoQuery.mongoInsert(collection, noticeData);
        // 성공 메시지 반환
        return `${noticeDTO.title} 게시물이 만들어졌습니다.`;
      }
    } catch {
      // 오류 발생 시 에러 메시지 반환
      return 'notice create error';
    }
  }
}
