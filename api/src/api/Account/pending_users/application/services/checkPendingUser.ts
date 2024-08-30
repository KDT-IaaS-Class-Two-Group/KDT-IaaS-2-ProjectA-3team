import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RES_ERROR_MSG } from '../../../../common/enum/message/error/responseErrorMessage.enum';

import { PendingUserDTO } from 'src/api/common/infrastructure/DTO/pendingUsers';
import { PendingUserRepository } from 'src/api/common/infrastructure/Repository/pending_users.repository';

@Injectable()
@ApiTags('PendingUsers') // 'PendingUsers'라는 태그로 이 클래스의 메서드를 그룹화
/**
 * * Class : CheckPendingUsers
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * @class CheckPendingUsers : 대기중인 회원 중, 해당 아이디를 가진 유저를 확인하기 위한 모델.
 * @param private private readonly pendingUsersRepository : 직접 구현한 레포지토리 객체.
 * @description :
 * * Client가 전송하는 데이터는 사용자의 비밀번호를 가지고 있지 않기 때문에, Insert 구문을 통해 body에 포함된 데이터를 users 테이블로 삽입할 수 없다. 여기서 CheckPendingUsers 클래스는 기본 키로 데이터베이스에 저장되어있는 레코드를 가져옴으로써, 이를 해결하는 역할을 수행한다.
 */
export class CheckPendingUsers {
  constructor(private readonly pendingUsersRepository: PendingUserRepository) {}

  @ApiOperation({ summary: '대기중인 유저 확인' }) // 메서드에 대한 요약 설명 추가
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '확인할 유저의 ID',
  }) // 메서드에 필요한 경로 변수에 대한 설명 추가
  @ApiResponse({
    status: 200,
    description: '대기중인 유저 데이터를 성공적으로 반환합니다.',
  }) // 성공 응답에 대한 설명 추가
  @ApiResponse({ status: 404, description: RES_ERROR_MSG.CHECK_DATA_FAILED }) // 실패 응답에 대한 설명 추가
  async check(user_id: string): Promise<PendingUserDTO> {
    const pendingData: PendingUserDTO =
      await this.pendingUsersRepository.findByOnePendingUsers(user_id);
    if (pendingData === null || pendingData === undefined) {
      throw new NotFoundException(RES_ERROR_MSG.CHECK_DATA_FAILED);
    }
    return pendingData[0];
  }
}
