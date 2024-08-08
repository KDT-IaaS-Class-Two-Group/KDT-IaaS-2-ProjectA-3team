import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { PendingUserDTO } from '../../../common/interface/DTO/pendingUsers';
import { TABLE_NAME } from '../../../common/enum/table/table.enum';

@Injectable()
export class MigrationUserData {
  constructor(private readonly qb: QueryBuilder) {}

  async migrationUserData(data): Promise<void> {
    return this.insertPendingIntoUsers(data);
  }

  private async insertPendingIntoUsers(data: PendingUserDTO) {
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
