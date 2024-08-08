import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import columns from 'ts/type/querybuilder/columns.type';

@Injectable()
export class QueryBuilder {
  private queryString: string = '';
  private params: any[] = [];

  constructor(private readonly databaseService: DatabaseService) {}

  RESET() {
    this.queryString = '';
    this.params = [];
  }

  async execution() {
    try {
      console.log('Executing query:', this.queryString); // 쿼리 문자열 출력
      console.log('With params:', this.params); // 쿼리 파라미터 출력
      const result = await this.databaseService.query(
        this.queryString,
        this.params,
      );
      return result.rows;
    } catch (error) {
      console.error('Failed execution :', error); // 오류 출력
      throw new Error('database Error');
    }
  }

  SELECT(tableName: string, columns: columns = '*') {
    console.log(columns);
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

  WHERE(condition: string, value: any) {
    this.queryString += ` WHERE ${condition}`;
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        this.params.push(value[i]);
      }
      return this;
    }
    this.params.push(value);
    return this;
  }

  INSERT(tableName: string, data: { [key: string]: any }) {
    this.RESET();
    const columns = Object.keys(data);
    const values = Object.values(data);
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

  DELETE(tableName: string, condition: string, value: any) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = [value];
    return this;
  }
}
