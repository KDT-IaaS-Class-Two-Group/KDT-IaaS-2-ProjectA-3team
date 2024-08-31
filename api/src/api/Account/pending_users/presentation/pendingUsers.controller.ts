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

import { RES_ERROR_MSG } from '../../../common/enum/message/error/responseErrorMessage.enum';

/**
 * @controller PendingUsersController
 * @description 대기중인 회원의 승인 및 취소 요청을 처리하는 컨트롤러입니다.
 *  * 작성자 : @naviadev / 2024-08-08
 *  *편집자 : @zoeznm / 2024-08-30
 *
 * 이 컨트롤러는 대기중인 회원의 승인과 취소를 위한 두 가지 주요 엔드포인트를 제공합니다.
 */
@Controller('/pending-process')
@ApiTags('Pending-Process API') // 'Pending-Process API' 태그로 엔드포인트 그룹화
export class PendingUsersController {
  constructor(
    private readonly checkPendingUsers: CheckPendingUsers,
    private readonly setDefaultRole: SetDefaultRole,
    private readonly migrationUserData: MigrationUserData,
    private readonly deleteUsers: DeleteUsers,
  ) {}

  /**
   * @post /approve
   * @description 대기중인 회원을 승인하는 엔드포인트입니다. `pending_users` 테이블에서 `users` 테이블로 데이터를 마이그레이션하고 기본 역할을 설정합니다.
   * @param {PendingUserDTO} pendingUserData - 승인할 사용자의 데이터.
   * @returns {Object} 성공 여부를 나타내는 객체입니다.
   * @throws {HttpException} 서버 내부 오류가 발생한 경우 500 상태 코드와 함께 예외를 던집니다.
   * @response 200 - 사용자가 성공적으로 승인되었습니다.
   * @response 500 - 서버 내부 오류가 발생했습니다.
   */
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
    const { user_id } = pendingUserData;

    try {
      const checkUserData = await this.checkPendingUsers.check(user_id);
      await this.deleteUsers.deleteUser(user_id);
      await this.migrationUserData.migrationUserData(checkUserData);
      await this.setDefaultRole.setDefaultRole(user_id);
      return { success: true };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @post /cancel
   * @description 대기중인 회원 요청을 취소하는 엔드포인트입니다. 사용자 회원가입 요청을 취소합니다.
   * @param {PendingUserDTO} pendingUserData - 취소할 사용자의 데이터.
   * @returns {Object} 성공 여부를 나타내는 객체입니다.
   * @throws {HttpException} 서버 내부 오류가 발생한 경우 500 상태 코드와 함께 예외를 던집니다.
   * @response 200 - 사용자 요청이 성공적으로 취소되었습니다.
   * @response 500 - 서버 내부 오류가 발생했습니다.
   */
  @Post('/cancel')
  @HttpCode(200)
  @ApiOperation({
    summary: '대기중인 회원 요청을 취소하는 엔드포인트',
    description: '사용자 회원가입 요청을 취소합니다.',
  })
  @ApiBody({ type: PendingUserDTO, description: '취소할 사용자의 데이터' })
  @ApiResponse({
    status: 200,
    description: '사용자 요청이 성공적으로 취소되었습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류가 발생했습니다.',
  })
  async cancelUser(@Body() pendingUserData: PendingUserDTO) {
    await this.deleteUsers.deleteUser(pendingUserData.user_id);
    return { success: true };
  }
}
