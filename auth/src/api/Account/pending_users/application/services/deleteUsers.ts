import { Injectable } from '@nestjs/common';
import { QUERY_PLACEHOLDER } from 'src/api/Account/common/enum/query/query.enum';
import { QueryBuilder } from 'src/database/queryBuilder';

@Injectable()
export class DeleteUsers {
  constructor(private readonly qb: QueryBuilder) {}
  async deleteUser(user_id: string, tableName: string) {
    return this.delete(user_id, tableName);
  }

  private async delete(user_id: string, tableName: string) {
    try {
      await this.qb
        .DELETE(tableName, QUERY_PLACEHOLDER.__CHECK_USER_ID, user_id)
        .execution();
    } catch (error) {
      throw error;
    }
  }
}
