import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { TABLE_NAME } from '../../../common/enum/table/table.enum';
import { RES_ERROR_MSG } from '../../../common/enum/message/error/responseErrorMessage.enum';
import { QUERY_PLACEHOLDER } from '../../../common/enum/query/query.enum';
@Injectable()
/**
 * * Class : CheckPendingUsers
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * @class CheckPendingUsers : 대기중인 회원 중, 해당 아이디를 가진 유저를 확인하기 위한 모델.
 * @param private readonly qb: QueryBuilder
 * @description :
 * * Client가 전송하는 데이터는 사용자의 비밀번호를 가지고 있지 않기 때문에, Insert 구문을 통해 body에 포함된 데이터를 users 테이블로 삽입할 수 없다. 여기서 CheckPendingUsers 클래스는 기본 키로 데이터베이스에 저장되어있는 레코드를 가져옴으로써, 이를 해결하는 역할을 수행한다.
 */
export class CheckPendingUsers {
  constructor(private readonly qb: QueryBuilder) {}
  async check(user_id: string) {
    const pendingData = await this.qb
      .SELECT(TABLE_NAME.__PENDING_USERS)
      .WHERE(QUERY_PLACEHOLDER.__CHECK_USER_ID, user_id)
      .execution();
    if (pendingData === null || pendingData === undefined) {
      throw new NotFoundException(RES_ERROR_MSG.CHECK_DATA_FAILED);
    }

    return pendingData[0];
  }
}
