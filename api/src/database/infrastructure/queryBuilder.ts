import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import columns from 'ts/type/querybuilder/columns.type';
import { QUERY_BUILDER_MESSAGE } from 'src/api/common/enum/message/log/QuerybuilderMessage.enum';

@Injectable()
/**
 * * Class : QueryBuilder
 * 작성자 : @dalramjwi / 2024-08-30
 * 편집자 : @dalramjwi / 2024-08-30
 * Issue : 
 * @class QueryBuilder


 * @param private readonly databaseService: DatabaseService
 * @description SQL 쿼리를 동적으로 생성하고, 이를 실행하는 기능을 제공한다.
 */
export class QueryBuilder {
  private queryString: string = '';
  private params: any[] = [];
  /**
   * @method ADD_PARAM
   * @description 쿼리에 사용할 매개변수를 추가합니다.
   * @param value - 쿼리에 추가할 매개변수 값
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  ADD_PARAM(value: any) {
    this.params.push(value);
    return this;
  }

  constructor(private readonly databaseService: DatabaseService) {}
  /**
   * @method RESET
   * @description 현재 쿼리 문자열과 매개변수를 초기화합니다.
   */
  RESET() {
    this.queryString = '';
    this.params = [];
  }
  /**
   * @method execution
   * @description 생성된 SQL 쿼리를 실행하고 결과를 반환합니다.
   * @returns {Promise<any[]>} - 쿼리 실행 결과를 반환
   * @throws {Error} - 쿼리 실행 중 오류가 발생하면 예외를 던집니다.
   */
  async execution() {
    try {
      console.log(QUERY_BUILDER_MESSAGE.__EXEQUTION, this.queryString);
      console.log(QUERY_BUILDER_MESSAGE.__PARAMS, this.params);
      const result = await this.databaseService.query(
        this.queryString,
        this.params,
      );
      return result.rows;
    } catch (error) {
      console.error(QUERY_BUILDER_MESSAGE.__EXEQUTION_ERROR, error);
      throw new Error(QUERY_BUILDER_MESSAGE.__EXEQUTION_ERROR);
    }
  }
  /**
   * @method SELECT
   * @description SELECT 쿼리를 생성합니다.
   * @param tableName - 조회할 테이블 이름
   * @param columns - 조회할 열 이름 또는 '*' (기본값: '*')
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  SELECT(tableName: string, columns: columns = '*') {
    this.RESET();
    if (Array.isArray(columns)) {
      this.queryString = `SELECT ${columns.join(', ')} FROM ${tableName}`;
    } else if (columns === '*') {
      this.queryString = `SELECT * FROM ${tableName}`;
    } else {
      this.queryString = `SELECT ${columns} FROM ${tableName}`;
    }
    return this;
  }

  /**
   * @method AND
   * @description WHERE 조건문에 AND 절을 추가합니다.
   * @param condition - AND 절에 사용할 조건문
   * @param values - 조건문에 바인딩할 값들 (옵션)
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  AND(condition: string, values: any[] = []) {
    if (values.length > 0) {
      this.queryString += ` AND ${condition}`;
      this.params.push(...values);
    } else {
      this.queryString += ` AND ${condition}`;
    }
    return this;
  }
  /**
   * @method WHERE
   * @description WHERE 절을 추가합니다.
   * @param condition - WHERE 절에 사용할 조건문
   * @param values - 조건문에 바인딩할 값들 (옵션)
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  WHERE(condition: string, values: any[] = []) {
    if (values.length > 0) {
      this.queryString += ` WHERE ${condition}`;
      this.params.push(...values);
    } else {
      this.queryString += ` WHERE ${condition}`;
    }
    return this;
  }
  /**
   * @method INSERT
   * @description INSERT 쿼리를 생성합니다.
   * @param tableName - 삽입할 테이블 이름
   * @param data - 삽입할 데이터 객체
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  INSERT(tableName: string, data: { [key: string]: any }) {
    this.RESET();
    const columns = Object.keys(data);

    // Date 객체는 그대로 전달, 문자열로 변환하지 않음
    const values = Object.values(data).map((value) =>
      value instanceof Date ? value : value,
    );

    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    this.queryString = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    this.params = values;
    return this;
  }
  /**
   * @method UPDATE
   * @description UPDATE 쿼리를 생성합니다.
   * @param tableName - 업데이트할 테이블 이름
   * @param data - 업데이트할 데이터 객체
   * @param condition - WHERE 조건문
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  UPDATE(tableName: string, data: { [key: string]: any }, condition: string) {
    this.RESET();
    const columns = Object.keys(data);

    const placeholders = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data);

    this.queryString = `UPDATE ${tableName} SET ${placeholders} WHERE ${condition}`;
    this.params = [...values];
    return this;
  }
  /**
   * @method DELETE
   * @description DELETE 쿼리를 생성합니다.
   * @param tableName - 삭제할 테이블 이름
   * @param condition - WHERE 조건문
   * @param values - 조건문에 바인딩할 값들
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  DELETE(tableName: string, condition: string, values: any[]) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = values; // 여러 매개변수를 처리
    return this;
  }

  /**
   * @method JOIN
   * @description JOIN 절을 추가합니다.
   * @param tableName - 조인할 테이블 이름
   * @param condition - 조인 조건문
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  JOIN(tableName: string, condition: string) {
    this.queryString += ` JOIN ${tableName} ON ${condition}`;
    return this;
  }
  /**
   * @method ORDER_BY
   * @description ORDER BY 절을 추가합니다.
   * @param column - 정렬할 열 이름
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  ORDER_BY(column: string) {
    this.queryString += ` ORDER BY ${column}`;
    return this;
  }
  /**
   * @method LIMIT
   * @description LIMIT 절을 추가합니다.
   * @param limit - 제한할 행의 수
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  LIMIT(limit: number) {
    this.queryString += ` LIMIT ${limit}`;
    return this;
  }
  /**
   * @method LIstUP
   * @description 특정 조건에 맞는 데이터를 업데이트하는 쿼리를 생성합니다.
   * @param tableName - 업데이트할 테이블 이름
   * @param data - 업데이트할 데이터 객체
   * @param condition - WHERE 조건문
   * @param conditionParams - 조건문에 바인딩할 값들
   * @returns {QueryBuilder} - 체이닝을 위해 현재 QueryBuilder 인스턴스를 반환
   */
  LIstUP(
    tableName: string,
    data: { [key: string]: any },
    condition: string,
    conditionParams: any[],
  ) {
    this.RESET();
    const columns = Object.keys(data);
    const placeholders = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(', ');
    this.queryString = `UPDATE ${tableName} SET ${placeholders} WHERE ${condition}`;
    this.params = [...Object.values(data), ...conditionParams];
    return this;
  }
}
