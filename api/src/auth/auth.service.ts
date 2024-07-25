import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { CreateUserInterface } from '@shared/DTO/SharedDTO';

/**
 * * Class : AuthService
 * 작성자 : @naviadev / 2024-07-25
 * 편집자 : @naviadev / 2024-07-25
 * Issue :
 * @class AuthService
 * @param private readonly databaseService: DatabaseService
 * @description : Database에 접근, 사용자 확인 서비스
 */

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserEmailInDatabase(
    email: string,
  ): Promise<CreateUserInterface | null> {
    const result = await this.databaseService.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    return result.rows[0] || null;
  }
}
