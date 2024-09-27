import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CheckPendingUsers } from '../application/services/checkPendingUser';
import { SetDefaultRole } from '../application/services/setDefaultRole';
import { MigrationUserData } from '../application/services/migrationUserData';
import { DeleteUsers } from '../application/services/deleteUsers';
import { PendingUserDTO } from '../presentation/DTO/pendingUserDTO';
import { DatabaseService } from 'src/database/infrastructure/database.service'; // DB 서비스 추가

import { RES_ERROR_MSG } from '../../../common/enum/message/error/responseErrorMessage.enum';

@Controller('/pending-process')
@ApiTags('Pending-Process API')
export class PendingUsersController {
  constructor(
    private readonly checkPendingUsers: CheckPendingUsers,
    private readonly setDefaultRole: SetDefaultRole,
    private readonly migrationUserData: MigrationUserData,
    private readonly deleteUsers: DeleteUsers,
    private readonly databaseService: DatabaseService, // DatabaseService 주입
  ) {}

  @Post('/approve')
  @HttpCode(200)
  @ApiOperation({
    summary: '대기중인 회원을 승인하는 엔드포인트',
    description:
      'Pending_users 테이블에서 users 테이블로 데이터를 마이그레이션하고 기본 역할을 설정합니다.',
  })
  @ApiBody({ type: PendingUserDTO, description: '승인할 사용자의 데이터' })
  @ApiResponse({
    status: 200,
    description: '사용자가 성공적으로 승인되었습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류가 발생했습니다.',
  })
  async approveUser(@Body() pendingUserData: PendingUserDTO) {
    const { user_id, salary, field_name, role_name } = pendingUserData;

    try {
      const checkUserData = await this.checkPendingUsers.check(user_id);
      await this.deleteUsers.deleteUser(user_id);
      await this.migrationUserData.migrationUserData(checkUserData);

      // 기본 역할 설정 로직
      await this.setDefaultRole.setDefaultRole(user_id);

      // 1. users_salary 테이블에 저장
      if (salary) {
        await this.databaseService.query(
          `INSERT INTO users_salary (user_id, salary) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET salary = $2`,
          [user_id, salary],
        );
      }

      // 2. relation_users_field_name 테이블에 저장
      if (field_name) {
        await this.databaseService.query(
          `INSERT INTO relation_users_field_name (user_id, field_name) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET field_name = $2`,
          [user_id, field_name],
        );
      }

      // 3. 권한 테이블에 저장 (role_name에 따라 다른 테이블에 저장)
      switch (role_name) {
        case 'employee':
          await this.databaseService.query(
            `INSERT INTO employee_role_users (user_id, role_name) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET role_name = $2`,
            [user_id, role_name],
          );
          break;
        case 'admin':
          await this.databaseService.query(
            `INSERT INTO admin_role_users (user_id, role_name) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET role_name = $2`,
            [user_id, role_name],
          );
          break;
        case 'leader':
          await this.databaseService.query(
            `INSERT INTO leader_role_users (user_id, role_name) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET role_name = $2`,
            [user_id, role_name],
          );
          break;
        case 'sub_admin':
          await this.databaseService.query(
            `INSERT INTO sub_admin_role_users (user_id, role_name) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET role_name = $2`,
            [user_id, role_name],
          );
          break;
        default:
          throw new HttpException('Invalid role_name', HttpStatus.BAD_REQUEST);
      }

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
