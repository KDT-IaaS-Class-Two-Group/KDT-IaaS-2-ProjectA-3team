import { Injectable } from '@nestjs/common';
import { PendingUserDTO } from 'src/api/auth/register/DTO/PendingUserDTO';
import { QueryBuilder } from 'src/database/queryBuilder';
@Injectable()
export class CancleService {
  private pendingTableName = 'pending_users';

  constructor(private readonly queryBuilder: QueryBuilder) {}

  private async deletePendingUser(user_id: string) {
    try {
      await this.queryBuilder
        .DELETE(this.pendingTableName, 'user_id = $1', user_id)
        .execution();
      return true;
    } catch (error) {
      console.error('삭제 실패 : ', error);
      return false;
    }
  }

  async cancle(data: PendingUserDTO) {
    try {
      const result = await this.deletePendingUser(data.user_id);

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('cancle 실패', error);
      throw new Error('cancle Failed');
    }
  }
}
