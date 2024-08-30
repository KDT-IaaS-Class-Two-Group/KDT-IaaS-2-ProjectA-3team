import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EmployeeRepository } from 'src/api/common/infrastructure/Repository/employee.repository';

@Injectable()
@ApiTags('EmployeeRoles') // 'EmployeeRoles'라는 태그로 이 클래스를 그룹화
export class SetDefaultRole {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  @ApiOperation({ summary: '기본 역할 설정' }) // 메서드에 대한 요약 설명 추가
  @ApiParam({
    name: 'user_id',
    type: 'string',
    description: '기본 역할을 설정할 사용자의 ID',
  }) // 경로 매개변수 설명 추가
  @ApiResponse({
    status: 200,
    description: '기본 역할이 성공적으로 설정되었습니다.',
  }) // 성공 응답 설명 추가
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' }) // 실패 응답 설명 추가
  async setDefaultRole(user_id: string): Promise<void> {
    try {
      await this.employeeRepository.setEmpolyeeUser(user_id);
    } catch (error) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
  }
}
