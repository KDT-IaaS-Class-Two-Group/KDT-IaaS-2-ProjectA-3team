import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/infrastructure/database.service'; // DatabaseService 임포트
import { CreateUserCommand } from '../createUser.command';
import { DeleteUserCommand } from '../deleteUser.command';

@Injectable()
export class UserCommandHandler {
  constructor(private readonly databaseService: DatabaseService) {} // DatabaseService 주입

  async handleCreateUser(command: CreateUserCommand): Promise<void> {
    const queryText = `
      INSERT INTO users (user_name, birth_date, address, phone, email, password) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const queryParams = [
      command.user_name,
      command.birth_date,
      command.address,
      command.phone,
      command.email,
      command.password,
    ];

    await this.databaseService.query(queryText, queryParams);
  }

  async handleDeleteUser(command: DeleteUserCommand): Promise<void> {
    const queryText = 'DELETE FROM users WHERE user_id = $1';
    const queryParams = [command.user_id];

    await this.databaseService.query(queryText, queryParams);
  }
}
