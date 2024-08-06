import { Injectable } from '@nestjs/common';
import { PendingUserDTO } from 'src/api/auth/register/DTO/PendingUserDTO';
import { QueryBuilder } from 'src/database/queryBuilder';
@Injectable()
/**
 * * Class : CancelService
 * 작성자 : @naviadev / 2024-08-06
 * 편집자 : @naviadev / 2024-08-06
 * Issue :
 * @class CancelService
 * @param private readonly queryBuilder: QueryBuilder
 * @description : 쿼리 빌더를 사용하여, 대기중인 회원에 대한 요청을 취소할 수 있도록 데이터베이스에서 삭제하는 기능을 수행.
 */
export class CancelService {
  private PENDING_USER_TABLE_NAME = 'pending_users';

  constructor(private readonly queryBuilder: QueryBuilder) {}

  /**
   *  user_id를 통해 레코드를 조회하고, 해당 데이터를 삭제하는 역할을 수행한다.
   *  @return : promise<boolean>
   */
  private async deletePendingUser(user_id: string) {
    try {
      await this.queryBuilder
        .DELETE(this.PENDING_USER_TABLE_NAME, 'user_id = $1', user_id)
        .execution();
      return true;
    } catch (error) {
      console.error('삭제 실패 : ', error);
      return false;
    }
  }

  async cancel(data: PendingUserDTO): Promise<boolean> {
    try {
      const result = await this.deletePendingUser(data.user_id);
      return result;
    } catch (error) {
      console.error('회원가입 요청 취소 실패 :', error);
      throw new Error('cancel Request Failed');
    }
  }
}
