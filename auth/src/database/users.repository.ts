import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PendingUserDTO } from '../../../shared/DTO/SharedDTO';

@Injectable()
class UsersRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    const result = await this.dbService.query('SELECT * FROM pending_users'); // 'users' -> 'pending_users'
    return result.rows;
  }

  async findOneByUser(username: string) {
    const result = await this.dbService.query(
      'SELECT * FROM pending_users WHERE username = $1', // 'users' -> 'pending_users'
      [username],
    );
    return result.rows[0];
  }

  async InsertNewUser(userData: PendingUserDTO) {
    const { email, user_id, password, username, phone, address, birth_date } =
      userData;

    const params = [
      user_id,
      username,
      birth_date,
      address,
      phone,
      email,
      password,
    ];

    const text = `
      INSERT INTO pending_users (
          user_id,
          username,
          birth_date,
          address,
          phone,
          email,
          password
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    try {
      await this.dbService.query(text, params);
    } catch (error) {
      console.error('executing Query Error - 쿼리문 실행 불가 . :', error);
      throw new Error('Database error');
    }
  }
}

export default UsersRepository;
