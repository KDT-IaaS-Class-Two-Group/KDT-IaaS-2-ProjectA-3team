import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { UsersDTO } from '../DTO/users';
import { TABLE_NAME } from '../../enum/table/table.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async migrationUserData(data: UsersDTO) {
    try {
      await this.qb
        .INSERT(TABLE_NAME.__USERS, {
          user_id: data.user_id,
          username: data.username,
          birth_date: data.birth_date,
          address: data.address,
          phone: data.phone,
          email: data.email,
          password: data.password,
        })
        .execution();
    } catch (error) {
      throw error;
    }
  }
}
