import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class QueryBuilder {
  private queryString: string = '';
  private params: any[] = [];

  constructor(private readonly databaseService: DatabaseService) {}
  // 항상 SQL 구문 시작시 reset 메서드를 통해 모든 쿼리문과 params를 초기화함.
  RESET() {
    this.queryString = '';
    this.params = [];
  }
  async execution() {
    try {
      const result = await this.databaseService.query(
        this.queryString,
        this.params,
      );
      return result.rows;
    } catch (error) {
      console.error('Failed execution :', error);
      throw new Error('database Error');
    }
  }

  SELECT(columns: string[], tableName: string) {
    this.RESET();
    this.queryString = `SELECT ${columns.join(', ')} FROM ${tableName}`;
    return this;
  }

  WHERE(searchColumn: string, value: any) {
    this.queryString += ` WHERE ${searchColumn}`;
    this.params.push(value);
    return this;
  }

  INSERT(tableName: string, data: { [key: string]: any }) {
    this.RESET();
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', '); // $1, $2, $3 ...

    this.queryString = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    this.params = values;
    return this;
  }

  UPDATE(
    tableName: string,
    data: { [key: string]: any },
    condition: string,
    value: any,
  ) {
    this.RESET();
    const columns = Object.keys(data);

    const placeholders = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data);

    this.queryString = `UPDATE ${tableName} SET ${placeholders} WHERE ${condition}`;
    this.params = [...values, value];
    return this;
  }

  DELETE(tableName: string, condition: string, value: any) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = [value];
    return this;
  }
}

// this.db.insert('users', 'user_id', '이재영').exe();
// -> INSERT INTO users (user_id) VALUES ('이재영');

// SELECT FROM WHERE
