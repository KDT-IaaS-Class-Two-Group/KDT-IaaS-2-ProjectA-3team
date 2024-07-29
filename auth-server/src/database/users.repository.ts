import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';
@Injectable()
class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    const result = await this.dbService.query('SELECT * FROM users');
    return result.rows;
  }

  async findOneByEmail(email: string) {
    const result = await this.dbService.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0];
  }
  async InsertNewUser(userData: RegisterDataDTO) {
    const {
      email,
      id,
      password,
      name,
      phone_number,
      address,
      birth,
      position,
      join_date,
    } = userData;
    const params = [
      email,
      id,
      password,
      name,
      phone_number,
      address,
      birth,
      position,
      join_date,
    ];
    const text = `
    INSERT INTO users (
        email, 
        id, 
        password, 
        name, 
        phone_number, 
        address, 
        birth, 
        position, 
        join_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;
    try {
      await this.dbService.query(text, params);
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Database error');
    }
  }
}

export default UserRepository;
