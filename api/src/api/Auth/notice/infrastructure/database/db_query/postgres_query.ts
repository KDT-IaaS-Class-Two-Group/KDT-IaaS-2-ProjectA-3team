import { Injectable } from '@nestjs/common';
import { DbConnect } from '../db_connect/db_connect';

@Injectable()
export class PostQuery {
  constructor(private readonly dbConnect: DbConnect) {}
  async postInsert(collectionName, data, insertData) {
    const { pgPool } = this.dbConnect;
    const allData = data.join(', ');
    const num = data.map((_, index) => `$${index + 1}`);
    const insert = `INSERT INTO ${collectionName} (${allData}) VALUES (${num.join(', ')})`;
    return await pgPool.query(insert, insertData);
  }

  async postSelect(result) {
    const { pgPool } = this.dbConnect;
    return await pgPool.query(`SELECT user_id FROM users WHERE user_id = $1`, [
      result,
    ]);
  }
}
