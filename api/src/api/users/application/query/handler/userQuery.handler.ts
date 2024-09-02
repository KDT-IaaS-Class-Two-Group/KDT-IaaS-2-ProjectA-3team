import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/infrastructure/database.service'; // DatabaseService 임포트
import { GetUserByIdQuery } from '../getUserById.query';
import { UserDTO } from 'src/api/Auth/login/presentation/DTO/UserDTO';

@Injectable()
export class UserQueryHandler {
  constructor(private readonly databaseService: DatabaseService) {}

  async handleGetAllUsers(): Promise<UserDTO[]> {
    const result = await this.databaseService.query('SELECT * FROM users');
    return result.rows.map((row) => ({
      user_id: row.user_id,
      user_name: row.user_name, // 'username' -> 'user_name'으로 변경
      birth_date: row.birth_date,
      address: row.address,
      phone: row.phone,
      email: row.email,
      password: row.password,
    }));
  }

  async handleGetUserById(query: GetUserByIdQuery): Promise<UserDTO> {
    const result = await this.databaseService.query(
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
  }
}
