// application/query/handler/userQuery.handler.ts
import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { GetUserByIdQuery } from '../getUserById.query';
import { UserDTO } from 'src/api/Auth/login/DTO/UserDTO';

@Injectable()
export class UserQueryHandler {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Pool) {}

  async handleGetAllUsers(): Promise<UserDTO[]> {
    // query 제거
    const client = await this.db.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      return result.rows.map((row) => ({
        user_id: row.user_id,
        user_name: row.user_name, // 'username' -> 'user_name'으로 변경
        birth_date: row.birth_date,
        address: row.address,
        phone: row.phone,
        email: row.email,
        password: row.password,
      }));
    } finally {
      client.release();
    }
  }

  async handleGetUserById(query: GetUserByIdQuery): Promise<UserDTO> {
    const client = await this.db.connect();
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE user_id = $1',
        [query.user_id],
      );
      const row = result.rows[0];
      return {
        user_id: row.user_id,
        user_name: row.user_name, // 'username' -> 'user_name'으로 변경
        birth_date: row.birth_date,
        address: row.address,
        phone: row.phone,
        email: row.email,
        password: row.password,
      };
    } finally {
      client.release();
    }
  }
}
