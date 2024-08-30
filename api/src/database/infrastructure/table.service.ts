import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database.service';

/**
 * * Class : TableService
 * 작성자 : @dalramjwi / 2024-08-30
 * 편집자 : @dalramjwi / 2024-08-30
 * Issue :
 * @class TableService
 * @param private readonly databaseService: DatabaseService
 * @description TableService 클래스는 데이터베이스 테이블과 상호작용하는 다양한 기능을 제공하는 서비스이다. 이 클래스는 주로 테이블의 데이터 조회, 추가, 업데이트, 삭제 및 테이블 구조 조회 기능을 제공한다.
 */

export class TableService {
  // DatabaseService를 의존성으로 주입받아 이 클래스 내에서 사용합니다.
  /**
   * DatabaseService를 의존성으로 주입받아 이 클래스 내에서 사용합니다.
   * @param {DatabaseService} databaseService - 데이터베이스 서비스 인스턴스
   */
  constructor(private readonly databaseService: DatabaseService) {}
  // 특정 테이블의 모든 행을 조회하는 메서드
  /**
   * 특정 테이블의 모든 행을 조회하는 메서드입니다.
   * @param {string} tableName - 조회할 테이블의 이름
   * @returns {Promise<any[]>} 테이블의 모든 행을 반환합니다.
   * @throws {NotFoundException} 해당 테이블을 찾을 수 없는 경우
   */
  async getAllRows(tableName: string) {
    const table = await this.databaseService.query(
      `SELECT * FROM ${tableName}`,
    );
    if (!table) {
      throw new NotFoundException(
        `해당 ${tableName} 테이블을 찾을 수 없습니다.`,
      );
    }
    return table.rows;
  }

  /**
   * 특정 테이블에 새 행을 추가하는 메서드입니다.
   * @param {string} tableName - 데이터를 추가할 테이블의 이름
   * @param {any} rowData - 추가할 데이터 객체
   * @returns {Promise<any>} 추가된 행 데이터를 반환합니다.
   */
  async addRow(tableName: string, rowData: any) {
    // 행 데이터를 키와 값으로 분리하여 각각 문자열로 만든다.
    const keys = Object.keys(rowData).join(', ');
    const values = Object.values(rowData);
    // 쿼리에 사용할 값의 위치 홀더를 생성한다.
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    console.log(
      `쿼리 실행: INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
      values,
    );
    await this.databaseService.query(
      `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
      values,
    );
    return rowData;
  }
  /**
   * 특정 테이블의 행을 업데이트하는 메서드입니다.
   * @param {string} tableName - 업데이트할 테이블의 이름
   * @param {string} rowId - 업데이트할 행의 ID
   * @param {any} rowData - 업데이트할 데이터 객체
   * @returns {Promise<any>} 업데이트된 행 데이터를 반환합니다.
   * @throws {NotFoundException} 해당 행을 찾을 수 없는 경우
   */
  async updateRow(tableName: string, rowId: string, rowData: any) {
    // 테이블 이름에 따라 행을 식별할 필드 이름을 결정한다.
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    // 수정할 데이터의 키-값 쌍을 쿼리 문자열로 변환힌다.
    const updates = Object.keys(rowData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    // 수정할 데이터와 행 ID를 값 배열로 생성한다.
    const values = [...Object.values(rowData), rowId];

    // 업데이트 쿼리와 값을 콘솔에 출력한다.
    console.log(
      `쿼리 실행: UPDATE ${tableName} SET ${updates} WHERE ${idField} = $${values.length}`,
      values,
    );

    // 테이블의 행을 수정하는 쿼리를 실행한다.
    const result = await this.databaseService.query(
      `UPDATE ${tableName} SET ${updates} WHERE ${idField} = $${values.length}`,
      values,
    );
    // 행이 존재하지 않으면 NotFoundException을 발생시킨다.
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ${idField} ${rowId} not found in table ${tableName}`,
      );
    }
    return rowData;
  }

  /**
   * 특정 테이블의 행을 삭제하는 메서드입니다.
   * @param {string} tableName - 삭제할 행이 포함된 테이블의 이름
   * @param {string} rowId - 삭제할 행의 ID
   * @returns {Promise<{[key: string]: string}>} 삭제된 행의 ID를 반환합니다.
   * @throws {NotFoundException} 해당 행을 찾을 수 없는 경우
   */
  async deleteRow(tableName: string, rowId: string) {
    // 테이블 이름에 따라 행을 식별할 필드 이름을 결정한다.
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    // 해당 행을 삭제하는 쿼리를 실행한다.
    const result = await this.databaseService.query(
      `DELETE FROM ${tableName} WHERE ${idField} = $1`,
      [rowId],
    );
    // 행이 존재하지 않으면 NotFoundException을 발생시킨다.
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ${idField} ${rowId} not found in table ${tableName}`,
      );
    }
    return { [idField]: rowId };
  }

  /**
   * 특정 테이블의 구조를 조회하는 메서드입니다.
   * @param {string} tableName - 구조를 조회할 테이블의 이름
   * @returns {Promise<any[]>} 테이블의 구조를 반환합니다.
   * @throws {NotFoundException} 해당 테이블을 찾을 수 없는 경우
   */
  async getTableStructure(tableName: string) {
    // 테이블의 컬럼 이름과 데이터 타입을 조회하는 쿼리를 실행한다.
    const structure = await this.databaseService.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`,
      [tableName],
    );
    // 테이블이 존재하지 않으면 NotFoundException을 발생시킨다.
    if (!structure) {
      throw new NotFoundException(`Table ${tableName} not found`);
    }
    // 테이블의 구조를 반환한다.
    return structure.rows;
  }

  /**
   * 특정 테이블의 모든 데이터를 조회하는 메서드입니다.
   * @param {string} tableName - 데이터를 조회할 테이블의 이름
   * @returns {Promise<any[]>} 테이블의 모든 데이터를 반환합니다.
   */
  async getTableData(tableName: string) {
    // 테이블의 모든 행을 조회하는 쿼리를 실행한다.
    const data = await this.databaseService.query(`SELECT * FROM ${tableName}`);
    // 조회된 데이터를 반환힌다.
    return data.rows;
  }

  /**
   * 모든 테이블 목록을 조회하는 메서드입니다.
   * @returns {Promise<{table_name: string}[]>} 모든 테이블의 목록을 반환합니다.
   */
  async getTables(): Promise<{ table_name: string }[]> {
    const res = await this.databaseService.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
  `);
    return res.rows;
  }
}
