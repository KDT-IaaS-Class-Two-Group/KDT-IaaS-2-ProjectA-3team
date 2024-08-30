import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { Stack } from '../../domain/entities/stack.entity';
import { TABLE_NAME } from 'src/api/common/enum/table/table.enum';
import { QUERY_PLACEHOLDER } from 'src/api/common/enum/query/query.enum';

/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Injectable
 * @description : Persistence Layer로, Stack과 연관된 데이터를 읽고 쓰는 역할을 수행한다.
 */
@Injectable()
export class StackRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async findByName(name: string): Promise<Stack[]> {
    return this.qb
      .SELECT(TABLE_NAME.__STACK)
      .WHERE('stack_name ILIKE $1', [`%${name}%`])
      .execution();
  }

  async findAll(): Promise<Stack[]> {
    return this.qb.SELECT(TABLE_NAME.__STACK).execution();
  }

  async addStack(stack: Stack): Promise<void> {
    await this.qb.INSERT(TABLE_NAME.__STACK, stack).execution();
  }

  async deleteStack(name: string): Promise<void> {
    await this.qb
      .DELETE(TABLE_NAME.__STACK, QUERY_PLACEHOLDER.__STACK_NAME, [name])
      .execution();
  }
}
