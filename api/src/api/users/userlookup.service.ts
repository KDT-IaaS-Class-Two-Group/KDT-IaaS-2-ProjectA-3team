import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg'; // PostgreSQL 드라이버
import { UserDTO } from '../../../../shared/DTO/SharedDTO'; // UserDTO 경로

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly db: Pool,
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const client = await this.db.connect();
    try {
      const result = await client.query('SELECT * FROM users'); // 테이블 이름을 실제 이름으로 변경
      return result.rows.map((row) => ({
        user_id: row.user_id,
        username: row.username,
        birth_date: row.birth_date,
        address: row.address,
        phone: row.phone,
        email: row.email,
        password: row.password,
        // role_name: row.role_name,
        // salary: row.salary,
        // field_name: row.field_name,
      }));
    } finally {
      client.release(); // 연결 반환
    }
  }
}
