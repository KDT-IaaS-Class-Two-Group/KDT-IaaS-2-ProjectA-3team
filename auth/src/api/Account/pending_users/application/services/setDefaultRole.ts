import { Injectable } from '@nestjs/common';
import { ROLE_COLUMNS } from 'src/api/Account/common/data/RoleColumns.enum';
import { TABLE_NAME } from 'src/api/Account/common/enum/table/table.enum';
import { QueryBuilder } from 'src/database/queryBuilder';

@Injectable()
export class SetDefalutRole {
  constructor(private readonly qb: QueryBuilder) {}
  async setDefaultRole(user_id: string): Promise<void> {
    return this.setEmpolyeeUser(user_id);
  }

  private async setEmpolyeeUser(user_id: string) {
    try {
      await this.qb
        .INSERT(TABLE_NAME.__DEFAULT_ROLE, {
          user_id: user_id,
          role_name: ROLE_COLUMNS.__LEVEL_1,
        })
        .execution();
    } catch (error) {
      throw error;
    }
  }
}
