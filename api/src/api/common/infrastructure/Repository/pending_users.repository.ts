import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { TABLE_NAME } from '../../enum/table/table.enum';
import { QUERY_PLACEHOLDER } from '../../enum/query/query.enum';
import { PendingUserDTO } from '../DTO/pendingUsers';

@Injectable()
export class PendingUserRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async findByOnePendingUsers(user_id: string): Promise<PendingUserDTO> {
    const data = await this.qb
      .SELECT(TABLE_NAME.__PENDING_USERS)
      .WHERE(QUERY_PLACEHOLDER.__CHECK_USER_ID, [user_id])
      .execution();
    return data;
  }

  async deleteUser(user_id: string) {
    try {
      await this.qb.DELETE(
        TABLE_NAME.__PENDING_USERS,
        QUERY_PLACEHOLDER.__CHECK_USER_ID,
        user_id,
      ).execution;
    } catch (error) {
      throw error;
    }
  }
}
