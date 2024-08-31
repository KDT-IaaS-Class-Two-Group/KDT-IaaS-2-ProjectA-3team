import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EmployeeRepository } from 'src/api/common/infrastructure/Repository/employee.repository';

/**
 * @class SetDefaultRole
 * @description 사용자에게 기본 역할을 설정하는 서비스 클래스입니다.
 *
 *  * 작성자 : @naviadev / 2024-08-08
 *  * 편집자 : @zoeznm / 2024-08-30
 *
 * 이 클래스는 `EmployeeRepository`를 통해 사용자의 기본 역할을 설정합니다.
 *
 * @param {EmployeeRepository} employeeRepository - 사용자 역할을 설정하는 레포지토리 객체입니다.
 *
 * @example
 * const setDefaultRole = new SetDefaultRole(employeeRepository);
 * await setDefaultRole.setDefaultRole(user_id);
 */
@Injectable()
@ApiTags('EmployeeRoles') // 'EmployeeRoles'라는 태그로 이 클래스를 그룹화합니다.
export class SetDefaultRole {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  /**
   * @function setDefaultRole
   * @description 사용자의 기본 역할을 설정합니다.
   *
   * @param {string} user_id - 기본 역할을 설정할 사용자의 ID입니다.
   *
   * @returns {Promise<void>} 반환 값이 없습니다.
   *
   * @throws {NotFoundException} 지정된 ID의 사용자가 존재하지 않을 경우 발생합니다.
   *
   * @example
   * await setDefaultRole.setDefaultRole('1234567890');
   */
  @ApiOperation({ summary: '기본 역할 설정' }) // 메서드에 대한 요약 설명을 추가합니다.
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '기본 역할을 설정할 사용자의 ID입니다.',
  }) // 경로 매개변수에 대한 설명을 추가합니다.
  @ApiResponse({
    status: 200,
    description: '기본 역할이 성공적으로 설정되었습니다.',
  }) // 성공 응답에 대한 설명을 추가합니다.
  @ApiResponse({
    status: 404,
    description: '지정된 ID의 사용자를 찾을 수 없습니다.',
  }) // 실패 응답에 대한 설명을 추가합니다.
  async setDefaultRole(user_id: string): Promise<void> {
    try {
      await this.employeeRepository.setEmpolyeeUser(user_id);
    } catch (error) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
  }
}
