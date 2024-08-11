import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import columns from 'ts/type/querybuilder/columns.type';

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
      console.log('Executing query:', this.queryString);
      console.log('With params:', this.params);
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

  INSERT(tableName: string, data: { [key: string]: any }) {
    this.RESET();
    const columns = Object.keys(data);
    const values = Object.values(data).map((value) =>
      value instanceof Date ? value.toISOString() : value,
    );
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    this.queryString = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    this.params = values;
    return this;
  }

  UPDATE(
    tableName: string,
    data: { [key: string]: any },
    condition: string,
    conditionParams: any[],
  ) {
    this.RESET();
    const columns = Object.keys(data);
    const placeholders = columns
      .map((col, index) => {
        if (col === 'endTime') {
          return `${col} = $${index + 1}::timestamp`;
        }
        return `${col} = $${index + 1}`;
      })
      .join(', ');

    this.queryString = `UPDATE ${tableName} SET ${placeholders} WHERE ${condition}`;
    this.params = [...Object.values(data), ...conditionParams];
    return this;
  }

  DELETE(tableName: string, condition: string, value: any) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = [value];
    return this;
  }

  JOIN(tableName: string, condition: string) {
    this.queryString += ` JOIN ${tableName} ON ${condition}`;
    return this;
  }
}
