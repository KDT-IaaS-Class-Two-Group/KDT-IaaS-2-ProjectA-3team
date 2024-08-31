import { Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PendingUserDTO } from 'src/api/common/infrastructure/DTO/pendingUsers';
import { UserRepository } from 'src/api/common/infrastructure/Repository/Users.repository';

/**
 * @class MigrationUserData
 * @description 사용자의 데이터를 마이그레이션하는 서비스 클래스입니다.
 *
 * 이 클래스는 대기중인 사용자 데이터를 `UserRepository`를 통해 `users` 테이블로 마이그레이션합니다.
 *
 * @param {UserRepository} userRepository - 사용자 데이터를 마이그레이션하는 레포지토리 객체입니다.
 *
 * @example
 * const migrationUserData = new MigrationUserData(userRepository);
 * await migrationUserData.migrationUserData(pendingUserDTO);
 */
@Injectable()
@ApiTags('UserMigration') // 'UserMigration' 태그로 이 클래스를 그룹화합니다.
export class MigrationUserData {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @function migrationUserData
   * @description 대기중인 사용자 데이터를 `users` 테이블로 마이그레이션합니다.
   *
   *  * 작성자 : @naviadev / 2024-08-08
   *  * 편집자 : @zoeznm / 2024-08-30
   *
   * @param {PendingUserDTO} data - 마이그레이션할 사용자 데이터입니다. 이 데이터는 대기중인 사용자 테이블에서 가져온 데이터입니다.
   *
   * @returns {Promise<void>} 반환 값이 없습니다.
   *
   * @example
   * await migrationUserData.migrationUserData(pendingUserDTO);
   */
  @ApiOperation({ summary: '사용자 데이터 마이그레이션' }) // 메서드에 대한 요약 설명을 추가합니다.
  @ApiBody({
    type: PendingUserDTO,
    description: '마이그레이션할 사용자 데이터입니다.',
  }) // 요청 바디의 데이터 타입을 설명합니다.
  async migrationUserData(data: PendingUserDTO): Promise<void> {
    await this.userRepository.migrationUserData(data);
  }
}
