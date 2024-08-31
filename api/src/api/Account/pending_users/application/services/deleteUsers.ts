import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PendingUserRepository } from 'src/api/common/infrastructure/Repository/pending_users.repository';

/**
 * @class DeleteUsers
 * @description 대기중인 사용자를 삭제하는 서비스 클래스입니다.
 *
 *  * 작성자 : @naviadev / 2024-08-08
 *  * 편집자 : @zoeznm / 2024-08-30
 *
 * 이 클래스는 `PendingUserRepository`를 사용하여 데이터베이스에서 특정 대기중인 사용자를 삭제합니다.
 *
 * @param {PendingUserRepository} pendingUserRepository - 대기중인 사용자를 조회하고 삭제하는 레포지토리 객체입니다.
 *
 * @example
 * const deleteUsers = new DeleteUsers(pendingUserRepository);
 * await deleteUsers.deleteUser('user_id');
 */
@Injectable()
@ApiTags('PendingUsers') // 'PendingUsers' 태그로 이 클래스의 메서드를 그룹화합니다.
export class DeleteUsers {
  constructor(private readonly pendingUserRepository: PendingUserRepository) {}

  /**
   * @function deleteUser
   * @description 대기중인 사용자를 삭제합니다. 사용자가 존재하지 않으면 404 오류를 발생시킵니다.
   *
   * @param {string} user_id - 삭제할 사용자의 ID입니다.
   *
   * @returns {Promise<void>} 반환 값이 없습니다.
   *
   * @throws {NotFoundException} 삭제할 사용자가 존재하지 않을 때 발생합니다.
   *
   * @example
   * await deleteUsers.deleteUser('user_id');
   */
  @ApiOperation({ summary: '대기중인 사용자 삭제' }) // 메서드에 대한 요약 설명을 추가합니다.
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '삭제할 사용자의 ID입니다.',
  }) // 메서드에 필요한 경로 변수에 대한 설명을 추가합니다.
  @ApiResponse({
    status: 204,
    description: '사용자가 성공적으로 삭제되었습니다.',
  }) // 성공적인 응답에 대한 설명을 추가합니다.
  @ApiResponse({
    status: 404,
    description: '삭제할 사용자를 찾을 수 없습니다.',
  }) // 실패 응답에 대한 설명을 추가합니다.
  async deleteUser(user_id: string): Promise<void> {
    // 사용자 존재 여부 확인
    const exists =
      await this.pendingUserRepository.findByOnePendingUsers(user_id);
    if (!exists) {
      throw new NotFoundException('삭제할 사용자를 찾을 수 없습니다.');
    }

    // 사용자 삭제
    await this.pendingUserRepository.deleteUser(user_id);
  }
}
