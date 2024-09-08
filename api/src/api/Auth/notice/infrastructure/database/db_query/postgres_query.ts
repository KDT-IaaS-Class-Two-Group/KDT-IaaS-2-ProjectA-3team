import { Injectable } from '@nestjs/common';
import { DbConnect } from '../db_connect/db_connect';

/**
 * @class PostQuery
 * @description PostgreSQL 데이터베이스와의 상호작용을 처리하는 서비스 클래스입니다. SQL 쿼리를 실행하여 데이터베이스에 삽입 및 선택 작업을 수행합니다.
 */
@Injectable()
export class PostQuery {
  constructor(private readonly dbConnect: DbConnect) {}

  /**
   * PostgreSQL 데이터베이스에 데이터를 삽입합니다.
   * @param {string} collectionName - 데이터가 삽입될 테이블의 이름.
   * @param {string[]} data - 테이블의 컬럼 이름 배열.
   * @param {any[]} insertData - 삽입할 데이터 값 배열. 컬럼 이름과 순서가 일치해야 합니다.
   * @returns {Promise<any>} - 삽입 작업의 결과를 반환합니다.
   */
  async postInsert(collectionName, data, insertData) {
    const { pgPool } = this.dbConnect;
    // 컬럼 이름들을 쉼표로 구분된 문자열로 변환
    const allData = data.join(', ');
    // 쿼리에서 사용될 자리 표시자를 생성 (예: $1, $2, ...)
    const num = data.map((_, index) => `$${index + 1}`);
    // INSERT 쿼리 문자열 생성
    const insert = `INSERT INTO ${collectionName} (${allData}) VALUES (${num.join(', ')})`;
    // 쿼리 실행 및 결과 반환
    return await pgPool.query(insert, insertData);
  }

  /**
   * PostgreSQL 데이터베이스에서 특정 사용자 ID를 선택합니다.
   * @param {string} result - 검색할 사용자 ID.
   * @returns {Promise<any>} - 검색 결과를 반환합니다.
   */
  async postSelect(result) {
    const { pgPool } = this.dbConnect;
    // 사용자 ID를 검색하는 SELECT 쿼리 실행
    return await pgPool.query(`SELECT user_id FROM users WHERE user_id = $1`, [
      result,
    ]);
  }
}
