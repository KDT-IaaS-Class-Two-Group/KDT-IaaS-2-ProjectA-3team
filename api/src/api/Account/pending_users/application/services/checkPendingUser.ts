import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RES_ERROR_MSG } from '../../../../common/enum/message/error/responseErrorMessage.enum';

import { PendingUserDTO } from 'src/api/common/infrastructure/DTO/pendingUsers';
import { PendingUserRepository } from 'src/api/common/infrastructure/Repository/pending_users.repository';

/**
 * @class CheckPendingUsers
 * @description 대기중인 유저 중, 특정 아이디를 가진 유저를 확인하는 서비스 클래스입니다.
 *
 * 이 클래스는 `PendingUserRepository`를 사용하여 데이터베이스에서 대기중인 유저의 정보를 조회합니다.
 *
 * @param {PendingUserRepository} pendingUsersRepository - 대기중인 유저를 조회하는 레포지토리 객체입니다.
 *
 * @example
 * const checkPendingUsers = new CheckPendingUsers(pendingUserRepository);
 * const userData = await checkPendingUsers.check('some_user_id');
 */
@Injectable()
@ApiTags('PendingUsers') // 'PendingUsers' 태그로 이 클래스의 메서드를 그룹화합니다.
export class CheckPendingUsers {
  constructor(private readonly pendingUsersRepository: PendingUserRepository) {}

  /**
   * @function check
   * @description 대기중인 유저의 ID를 통해 해당 유저의 정보를 조회합니다.
   * 조회된 정보가 없으면 404 오류를 발생시킵니다.
   *
   *  * 작성자 : @naviadev / 2024-08-08
   *  * 편집자 : @zoeznm / 2024-08-30
   *
   * @param {string} user_id - 확인할 유저의 ID입니다.
   *
   * @returns {Promise<PendingUserDTO>} 대기중인 유저의 정보가 포함된 DTO 객체입니다.
   *
   * @throws {NotFoundException} 유저 정보를 찾을 수 없을 때 발생합니다.
   *
   * @example
   * const user = await checkPendingUsers.check('user_id');
   */
  @ApiOperation({ summary: '대기중인 유저 확인' }) // 메서드의 요약 설명을 추가합니다.
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '확인할 유저의 ID입니다.',
  }) // 메서드에 필요한 경로 변수에 대한 설명을 추가합니다.
  @ApiResponse({
    status: 200,
    description: '대기중인 유저 데이터를 성공적으로 반환합니다.',
  }) // 성공적인 응답에 대한 설명을 추가합니다.
  @ApiResponse({ status: 404, description: RES_ERROR_MSG.CHECK_DATA_FAILED }) // 실패 응답에 대한 설명을 추가합니다.
  async check(user_id: string): Promise<PendingUserDTO> {
    const pendingData: PendingUserDTO =
      await this.pendingUsersRepository.findByOnePendingUsers(user_id);
    if (pendingData === null || pendingData === undefined) {
      throw new NotFoundException(RES_ERROR_MSG.CHECK_DATA_FAILED);
    }
    return pendingData[0];
  }
}
