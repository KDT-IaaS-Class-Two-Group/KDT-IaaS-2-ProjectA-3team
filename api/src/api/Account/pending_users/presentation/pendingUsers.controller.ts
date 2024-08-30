import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CheckPendingUsers } from '../application/services/checkPendingUser';
import { SetDefaultRole } from '../application/services/setDefaultRole';
import { MigrationUserData } from '../application/services/migrationUserData';
import { DeleteUsers } from '../application/services/deleteUsers';
import { PendingUserDTO } from '../../../common/infrastructure/DTO/pendingUsers';

import { RES_ERROR_MSG } from '../../../common/enum/message/error/responseErrorMessage.enum';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('/pending-process')
@ApiTags('Pending-Process API')
export class PendingUsersController {
  constructor(
    private readonly checkPendingUsers: CheckPendingUsers,
    private readonly setDefaultRole: SetDefaultRole,
    private readonly migrationUserData: MigrationUserData,
    private readonly deleteUsers: DeleteUsers,
  ) {}

  @Post('/approve')
  @HttpCode(200)
  @ApiOperation({
    summary: '대기중인 회원에 대한 요청을 수락하는 엔드포인트',
    description:
      'Pending_users 테이블에서 users 테이블로 마이그레이션을 진행한다',
  })
  async approveUser(@Body() pendingUserData: PendingUserDTO) {
    const { user_id } = pendingUserData;

    // 데이터베이스에서 해당 유저를 체크하는 작업을 수행함과 동시에, 비밀번호를 가져온다.
    try {
      const checkUserData = await this.checkPendingUsers.check(user_id);
      await this.deleteUsers.deleteUser(user_id);
      await this.migrationUserData.migrationUserData(checkUserData);
      await this.setDefaultRole.setDefaultRole(user_id);
      return true;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/cancel')
  @HttpCode(200)
  @ApiOperation({
    summary: '요청 취소 엔드포인트',
    description: '사용자 회원가입 요청을 취소하는 엔드포인트.',
  })
  async cancleUser(@Body() pendingUserData: PendingUserDTO) {
    await this.deleteUsers.deleteUser(pendingUserData.user_id);
  }
}
