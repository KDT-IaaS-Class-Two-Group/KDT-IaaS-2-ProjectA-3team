import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserCommand } from '../createUser.command';
import { DeleteUserCommand } from '../deleteUser.command';

@Injectable()
export class UserCommandHandler {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Pool) {}

  async handleCreateUser(command: CreateUserCommand): Promise<void> {
    const client = await this.db.connect();
    try {
      await client.query(
        'INSERT INTO users (user_name, birth_date, address, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          command.user_name,
          command.birth_date,
          command.address,
          command.phone,
          command.email,
          command.password,
        ],
      );
    } finally {
      client.release();
    }
  }

  async handleDeleteUser(command: DeleteUserCommand): Promise<void> {
    const client = await this.db.connect();
    try {
      await client.query('DELETE FROM users WHERE user_id = $1', [
        command.user_id,
      ]);
    } finally {
      client.release();
    }
  }
}
