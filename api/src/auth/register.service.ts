import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { CreateUserInterface } from '@shared/DTO/SharedDTO';
@Injectable()
export class RegisterService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async getUserEmail(
    email: string,
  ): Promise<CreateUserInterface | null> {
    const result = await this.databaseService.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] || null;
  }

  async registerUser(data: CreateUserInterface) {
    const duplicateResult = await this.getUserEmail(data.email);

    if (duplicateResult) {
      return new Error('중복된 사용자');
    }

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
    } = data;
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    try {
      await this.databaseService.query(text, params);
    } catch {
      throw new InternalServerErrorException('사용자 등록 실패');
    }
  }
}
