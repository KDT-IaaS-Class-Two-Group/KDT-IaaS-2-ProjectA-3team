import { Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PendingUserDTO } from 'src/api/common/infrastructure/DTO/pendingUsers';
import { UserRepository } from 'src/api/common/infrastructure/Repository/Users.repository';

@Injectable()
@ApiTags('UserMigration') // 'UserMigration'이라는 태그로 이 클래스를 그룹화
export class MigrationUserData {
  constructor(private readonly userRepository: UserRepository) {}

  @ApiOperation({ summary: '사용자 데이터 마이그레이션' }) // 메서드에 대한 요약 설명 추가
  @ApiBody({
    type: PendingUserDTO,
    description: '마이그레이션할 사용자 데이터',
  }) // 요청 바디의 데이터 타입 설명 추가
  async migrationUserData(data: PendingUserDTO): Promise<void> {
    await this.userRepository.migrationUserData(data);
  }
}
