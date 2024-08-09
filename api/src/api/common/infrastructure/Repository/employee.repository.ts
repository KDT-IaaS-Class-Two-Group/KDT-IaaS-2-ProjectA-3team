import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { TABLE_NAME } from '../../enum/table/table.enum';
import { ROLE_COLUMNS } from '../../data/RoleColumns.enum';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async setEmpolyeeUser(user_id: string) {
    try {
      await this.qb
        .INSERT(TABLE_NAME.__LEVEL_1_LIST, {
          user_id: user_id,
          role_name: ROLE_COLUMNS.__LEVEL_1,
        })
        .execution();
    } catch (error) {
      throw error;
    }
  }
}
