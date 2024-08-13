import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import columns from 'ts/type/querybuilder/columns.type';
import { QUERY_BUILDER_MESSAGE } from 'src/api/common/enum/message/log/QuerybuilderMessage.enum';

@Injectable()
export class QueryBuilder {
  private queryString: string = '';
  private params: any[] = [];

  ADD_PARAM(value: any) {
    this.params.push(value);
    return this;
  }

  constructor(private readonly databaseService: DatabaseService) {}

  RESET() {
    this.queryString = '';
    this.params = [];
  }

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

  AND(condition: string, values: any[] = []) {
    if (values.length > 0) {
      this.queryString += ` AND ${condition}`;
      this.params.push(...values);
    } else {
      this.queryString += ` AND ${condition}`;
    }
    return this;
  }

  WHERE(condition: string, values: any[] = []) {
    if (values.length > 0) {
      this.queryString += ` WHERE ${condition}`;
      this.params.push(...values);
    } else {
      this.queryString += ` WHERE ${condition}`;
    }
    return this;
  }

  // INSERT(tableName: string, data: { [key: string]: any }) {
  //   this.RESET();
  //   const columns = Object.keys(data);
  //   const values = Object.values(data).map((value) =>
  //     value instanceof Date ? value.toISOString() : value,
  //   );
  //   const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

  //   this.queryString = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
  //   this.params = values;
  //   return this;
  // }
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

  DELETE(tableName: string, condition: string, values: any[]) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = values; // 여러 매개변수를 처리
    return this;
  }

  JOIN(tableName: string, condition: string) {
    this.queryString += ` JOIN ${tableName} ON ${condition}`;
    return this;
  }
  ORDER_BY(column: string) {
    this.queryString += ` ORDER BY ${column}`;
    return this;
  }

  LIMIT(limit: number) {
    this.queryString += ` LIMIT ${limit}`;
    return this;
  }
}
