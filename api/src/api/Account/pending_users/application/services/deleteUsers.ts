import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PendingUserRepository } from 'src/api/common/infrastructure/Repository/pending_users.repository';

@Injectable()
@ApiTags('PendingUsers') // 'PendingUsers'라는 태그로 이 클래스의 메서드를 그룹화
export class DeleteUsers {
  constructor(private readonly pendingUserRepository: PendingUserRepository) {}

  @ApiOperation({ summary: '대기중인 사용자 삭제' }) // 메서드에 대한 요약 설명 추가
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '삭제할 사용자의 ID',
  }) // 메서드에 필요한 경로 변수에 대한 설명 추가
  @ApiResponse({
    status: 204,
    description: '사용자가 성공적으로 삭제되었습니다.',
  }) // 성공 응답에 대한 설명 추가
  @ApiResponse({
    status: 404,
    description: '삭제할 사용자를 찾을 수 없습니다.',
  }) // 실패 응답에 대한 설명 추가
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
