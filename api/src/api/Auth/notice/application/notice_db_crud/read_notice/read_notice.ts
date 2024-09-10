import { Injectable } from '@nestjs/common';
import { MongoQuery } from 'src/api/Auth/notice/infrastructure/database/db_query/mongo_query';
/**
 * NoticeRead 클래스는 공지사항 읽기 작업을 담당하는 서비스입니다.
 *
 * @class NoticeRead
 * @description MongoDB에서 공지사항 데이터를 페이지네이션하여 읽어오거나,
 * 인증된 공지사항을 제한된 수만큼 읽어옵니다.
 * @param {MongoQuery} mongoQuery - MongoDB 쿼리 작업을 처리하는 클래스
 * @param {PostQuery} postQuery - PostgreSQL 쿼리 작업을 처리하는 클래스
 */
@Injectable()
export class NoticeRead {
  constructor(
    private readonly mongoQuery: MongoQuery, // MongoDB 관련 쿼리 처리 클래스
  ) {}
  /**
   * 공지사항을 페이지네이션하여 읽는 noticeRead 메서드입니다.
   *
   * @param {object} noticeDTO - 공지사항 데이터 객체입니다.
   * @param {string} tableName - MongoDB 테이블 이름입니다.
   * @param {number} page - 현재 페이지 번호입니다.
   * @param {number} limit - 페이지당 표시할 항목 수입니다.
   * @returns {Promise<object>} 페이지네이션된 공지사항과 전체 페이지 수를 포함한 객체를 반환합니다.
   */
  async noticeRead(
    noticeDTO,
    tableName: string,
    page: number,
    limit: number,
    // postId?: string,
  ) {
    const mongoCollection = await this.mongoQuery.mongoConnect(
      'notice', // 'notice'는 컬렉션 이름입니다.
      noticeDTO, // 공지사항 데이터 객체입니다.
      tableName, // 테이블 이름입니다.
    );
    // 공지사항을 페이지네이션하여 최근 항목부터 가져옵니다.
    const notices = await mongoCollection
      .find() // 모든 공지사항 데이터를 조회합니다.
      .sort({ _id: -1 }) // 최신 순으로 정렬합니다.
      .skip((page - 1) * limit) // 페이지 계산하여 해당 페이지로 이동합니다.
      .limit(limit) // 페이지당 항목 수만큼 제한합니다.
      .toArray(); // 데이터를 배열로 변환합니다.

    // 총 항목 수를 가져오기 위해 전체 항목 수 쿼리
    const totalCount = await mongoCollection.countDocuments();
    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / limit);
    return { notices, totalPages }; // notices와 totalPages 반환
  }

  /**
   * 인증된 공지사항을 제한된 수만큼 읽어오는 noticeAuthRead 메서드입니다.
   *
   * @param {object} noticeDTO - 공지사항 데이터 객체입니다.
   * @param {string} tableName - MongoDB 테이블 이름입니다.
   * @param {number} limit - 가져올 항목 수입니다.
   * @returns {Promise<object[]>} 제한된 수만큼의 공지사항 데이터를 배열로 반환합니다.
   */
  async noticeAuthRead(noticeDTO, tableName: string, limit: number) {
    // MongoDB의 'notice' 컬렉션에 연결합니다.
    const mongoCollection = await this.mongoQuery.mongoConnect(
      'notice', // 'notice'는 컬렉션 이름입니다.
      noticeDTO, // 공지사항 데이터 객체입니다.
      tableName, // 테이블 이름입니다.
    );

    // 인증된 공지사항을 최신순으로 제한된 수만큼 가져옵니다.
    return await mongoCollection
      .find() // 모든 공지사항 데이터를 조회합니다.
      .sort({ _id: -1 }) // 최신 순으로 정렬합니다.
      .limit(limit) // 가져올 공지사항의 수를 제한합니다.
      .toArray(); // 데이터를 배열로 변환합니다.
  }
}
