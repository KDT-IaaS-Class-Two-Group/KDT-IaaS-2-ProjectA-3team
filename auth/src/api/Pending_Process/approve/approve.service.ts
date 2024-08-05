import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';

@Injectable()
export class ApproveService {
  private pendingTableName = 'pending_users';
  constructor(private readonly queryBuilder: QueryBuilder) {}

  approve() {
    // this.queryBuilder.SELECT(this.pendingTableName).WHERE();
  }
}
